import TextField from '@mui/material/TextField';
import React from 'react';

async function fetchApiKey() {
  const response = await fetch('/key.txt');
  const key = await response.text();
  return key.trim();
}

async function callOpenAI(prompt) {
  const key = await fetchApiKey();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`, // Highly sensitive
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "Given a prompt, provide the most likely coordinates in Great Britain for the described item or place, formatted strictly as two numbers (latitude, longitude) separated by a comma, followed by a third number representing an appropriate zoom factor for a map. The zoom factor should range between 10 (appropriate for London) and 20 (appropriate for a single city block), depending on the size of the town/city/region focused on. If the location is not deemed to be in Great Britain, return '0, 0, 10'."},
        {"role": "user", "content": prompt},
      ],      
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }),
  });

  return response.json();
}

function TextFieldComponent({ changeCenter, changeZoom}) {
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const prompt = e.target.value;

      const data = await callOpenAI(prompt);

      const content = data.choices[0].message.content;

      // Extract numbers from the content
      const results = content.match(/-?\d+(\.\d+)?/g).map(Number);

      if (results.length >= 3 && !(results[0] === 0 && results[1] === 0)) {
        const coords = results.slice(0, 2); // First two numbers for coordinates
        const zoom = results[2]; // Third number for zoom

        changeCenter(coords);
        changeZoom(zoom);
      }
    }
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      onKeyDown={handleKeyPress}
      sx={{ width: '450%', bgcolor: 'background.paper' }}
    />
  );
}

export default TextFieldComponent;