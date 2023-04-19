/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { javascript, esLint } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';
import { linter, lintGutter } from '@codemirror/lint';
import Linter from 'eslint4b';
// import * as themes from '@uiw/codemirror-themes-all';
import rainbowBrackets from '../extensions/useRainbowBrackets';

function CodeMirrorComponent({ language, value, handleChange }) {
  function langChoice() {
    if (language === 'html') return html();
    if (language === 'css') return css();
    if (language === 'javascript') {
      return [javascript(), rainbowBrackets()];
    }
  }

  const config = {
    // eslint configuration
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
    },
    env: {
      browser: true,
      node: true,
    },
    rules: {
      semi: ['error', 'never'],
    },
  };

  // function filterDefaultProperties(obj) {
  //   const filteredObj = {};

  //   for (const key in obj) {
  //     if (!key.startsWith('default')) {
  //       filteredObj[key] = obj[key];
  //     }
  //   }

  //   return filteredObj;
  // }
  // const filteredThemes = filterDefaultProperties(themes);

  // eslint-disable-next-line no-unused-vars
  const onChange = React.useCallback((val, viewUpdate) => {
    handleChange(val);
  }, [handleChange]);

  return (
    <div className="editor-container">
      <div className="editor-title">
        {language}
        <button type="button">O/C</button>
      </div>
      <CodeMirror
        className="codemirror-window"
        value={value}
        extensions={[
          langChoice(), EditorView.lineWrapping, lintGutter(), linter(esLint(new Linter(), config)),
        ]}
        onChange={onChange}
        theme={okaidia}
      />
    </div>
  );
}

export default CodeMirrorComponent;
