import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';

const dingSound = new Audio('/ding.mp3');

async function fetchApiKey() {
  const response = await fetch('/key.txt');
  const key = await response.text();
  return key.trim();
}

const fadeOutAnimation = {
  animationName: 'fadeout',
  animationDuration: '2s',
  animationFillMode: 'forwards',
};

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

function TextFieldComponent({ changeCenter, changeZoom, setShowAtms, setShowBranches}) {

  const [errorMessage, setErrorMessage] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [listening, setListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);

  const [enableSpeechCommands, setEnableSpeechCommands] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window && enableSpeechCommands) {
      setSpeechRecognitionSupported(true);
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-UK';

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript.trim();
            if (transcript.toLowerCase() === 'computer') {
              setListening(true);
              dingSound.play();
            } else if (listening) {
              setInputValue(transcript);
              setListening(false);
              const ltranscript = transcript.toLowerCase();
              if (ltranscript === 'hide atms' || ltranscript === 'hide the atms') {
                setShowAtms(false);
              } else if (ltranscript === 'show atms' || ltranscript === 'show the atms') {
                setShowAtms(true);
              } else if (ltranscript === 'hide branches' || ltranscript === 'hide the branches') {
                setShowBranches(false);
              } else if (ltranscript === 'show branches' || ltranscript === 'show the branches') {
                setShowBranches(true);
              } else {
                send(transcript);
              }
            }
          }
        }
      };

      recognition.start();
    }
  }, [listening, enableSpeechCommands]);

  const toggleSpeechCommands = () => {
    setEnableSpeechCommands(!enableSpeechCommands);
  };

  const send = async (prompt) => {
    const data = await callOpenAI(prompt);

      const content = data.choices[0].message.content;

      // Extract numbers from the content
      const results = content.match(/-?\d+(\.\d+)?/g).map(Number);

      if (results.length >= 3) {
        if (results[0] === 0 && results[1] === 0) {
          // Show error message
          setErrorMessage('The location is not in the UK');
          setTimeout(() => setErrorMessage(''), 4000);
        } else {
          // Update map
          const coords = results.slice(0, 2);
          const zoom = results[2];
          changeCenter(coords);
          changeZoom(zoom);
        }
      }
  }
  

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const prompt = e.target.value;

      send(prompt);
      
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '270%' }}>
      {errorMessage && (
        <div style={{
          color: 'red',
          ...fadeOutAnimation,
          position: 'absolute',
          top: '-40px',
          left: 0,
          right: 0,
          width: '100%',
        }}>
          {errorMessage}
        </div>
      )}
      <TextField
        label="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        onKeyDown={handleKeyPress}
        sx={{ flex: 1, bgcolor: 'background.paper', marginRight: '8px', width: '80%' }} // Ensure there's a margin if next to another element
      />
      <Button variant="contained" onClick={toggleSpeechCommands} sx={{ width: '200px' }}>
        {enableSpeechCommands ? 'Disable Voice' : 'Enable Voice'}
      </Button>
    </div>
  );
}

export default TextFieldComponent;