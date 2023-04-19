/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

function GptGenerator({ setHTML, setCSS, setJS }) {
  const [instructions, setInstructions] = useState('');
  const [cost, setCost] = useState(0.72 / 1000);
  const [isLoading, setIsLoading] = useState(false);

  const htmlRegex = /```html\n([\s\S]*?)\n```/;
  const cssRegex = /```css\n([\s\S]*?)\n```/;
  const jsRegex = /```javascript\n([\s\S]*?)\n```/;

  function callAPI() {
    setIsLoading(true);
    const completionRequest = {
      model: 'gpt-4',
      messages: [{ role: 'system', content: 'You are CodeGPT, an AI that translates instructions into code. You will always split the code you return into 3 segments: the html code (body section only), the css, and the javascript.' },
        { role: 'user', content: instructions }],
      max_tokens: 2000,
      temperature: 0.05,
    };
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(completionRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        const codeString = data.choices[0].message.content;
        console.log(`total cost: $${(0.72 + (data.usage.total_tokens * 0.06)) / 1000} USD`);
        setCost((prevCost) => prevCost + ((data.usage.total_tokens * 0.06) / 1000));
        // console.log('complete answer:', data.choices[0].message.content);
        const htmlCode = codeString.match(htmlRegex)[1];
        const cssCode = codeString.match(cssRegex)[1];
        const jsCode = codeString.match(jsRegex)[1];
        // console.log('HTML Code:', htmlCode);
        // console.log('CSS Code:', cssCode);
        // console.log('JavaScript Code:', jsCode);
        setHTML(htmlCode);
        setCSS(cssCode);
        setJS(jsCode);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <button id="api-button" className="api-button" type="button" onClick={callAPI}>
          <span className="api-button-text">Call API</span>
          {' '}
          {isLoading && <span className="loading-spinner" />}
        </button>

        <div style={{ color: 'white', marginTop: 'auto', marginBottom: '0' }}>
          Session Cost: $
          {' '}
          {Math.round(cost * 100) / 100}
          {' '}
          USD
        </div>
      </div>
    </div>
  );
}

export default GptGenerator;
