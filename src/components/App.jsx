import React, { useState, useEffect } from 'react';
import '../index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import Joyride from 'react-joyride';
import { MdArrowDropDown } from 'react-icons/md';
import CodeMirrorComponent from './CodeMirrorComponent';
import GptGenerator from './Gpt';
import handleDownload from '../helpers/handleDownload';
import { ReactComponent as Svg } from './title.svg';
import allThemes from '../constants/themes';

function App() {
  const [html, setHTML] = useState('');
  const [css, setCSS] = useState('');
  const [js, setJS] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [steps, setSteps] = useState([]);
  const [run, setRun] = useState(false);
  const [theme, setTheme] = useState(allThemes[18]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e) => {
    const selectedTheme = allThemes.find((t) => t.name === e.target.dataset.value);
    setTheme(selectedTheme);
    toggleDropdown();
  };

  const handleJoyrideCallback = (data) => {
    if (data.action === 'close') {
      setRun(false);
    }
    if (data.type === 'tour:end') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const joyrideLocale = {
    last: "That's it! Happy Coding!",
    skip: 'Close',
  };

  const downloadPen = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Your CodePen GPT</title>
    </head>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>
          window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'iframeError', message, source, lineno, colno, error }, '*');
            return true;
          };
          ${js}
        </script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    setSteps([
      {
        target: '[data-tour="gpt-generator"]',
        content: 'Welcome to CodePen: GPT! Enter your prompt here.',
        disableBeacon: true,
      },
      {
        target: '[data-tour="code-mirror"]',
        content: 'This is the code editor section. The result of your prompt will appear here. You can edit HTML, CSS, and JavaScript here and see the changes below!',
        disableBeacon: true,
      },
      {
        target: '[data-tour="iframe"]',
        content: 'This is the output section. You can see the result of your code here.',
        disableBeacon: true,

      },
    ]);
  }, []);

  useEffect(() => {
    const hasSeenJoyride = localStorage.getItem('hasSeenJoyride');
    if (!hasSeenJoyride) {
      setRun(true);
      localStorage.setItem('hasSeenJoyride', 'true');
    }
  }, []);

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ marginTop: 'auto', marginBottom: 'auto' }}><Svg /></h1>
          {js || html || css
            ? (
              <h3
                className="download-link"
                style={{ textDecoration: 'underline' }}
                onKeyPress={() => handleDownload(downloadPen)}
                onClick={() => handleDownload(downloadPen)}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
              >
                download your pen
              </h3>
            ) : null}
          <h3 style={{ color: 'white' }}>Theme</h3>
          <div className="select-container" style={{ color: 'black' }}>
            <div tabIndex={0} role="button" className={`custom-select ${isOpen ? 'open' : ''}`} onKeyPress={toggleDropdown} onClick={toggleDropdown} style={{ color: 'black' }}>
              <div className="selected-option" data-value={theme.name} style={{ color: 'black' }}>
                {theme.name}
                <MdArrowDropDown className={`arrow-icon ${isOpen ? 'rotated' : ''}`} />
              </div>
              <div className="options-container">
                {allThemes.map((t) => (
                  <div
                    tabIndex={0}
                    role="button"
                    key={t.name}
                    className="option"
                    data-value={t.name}
                    onClick={handleOptionClick}
                    onKeyPress={handleOptionClick}
                  >
                    {t.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div data-tour="gpt-generator" style={{ margin: '1rem' }}>
          <GptGenerator setHTML={setHTML} setCSS={setCSS} setJS={setJS} />
        </div>
      </header>
      <div className="pane top-pane" data-tour="code-mirror">
        <CodeMirrorComponent handleChange={setHTML} value={html} language="html" theme={theme} />
        <CodeMirrorComponent handleChange={setCSS} value={css} language="css" theme={theme} />
        <CodeMirrorComponent handleChange={setJS} value={js} language="javascript" theme={theme} />
      </div>
      <div className="pane" data-tour="iframe">
        <iframe
          title="output"
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-modals allow-popups"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        callback={handleJoyrideCallback}
        locale={joyrideLocale}
      />
      <a style={{ color: 'white', textDecoration: 'none', fontSize: '1rem' }} href="https://famous-pastelito-68159c.netlify.app/">Erik Newland 2023</a>
    </>
  );
}

export default App;
