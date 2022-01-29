import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { App } from 'ui/App';
import { theme } from 'utils/theme';

export const GlobalStyle = createGlobalStyle`
    html {
      font-size: 16px;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    html,
    body {
      padding: 0;
      margin: 0;
      line-height: 1.3;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      background-color: ${theme.colors.black};
      color: ${theme.colors.white};
      font-family: ${theme.fontFamily.body};
      font-weight: normal;
      font-size: 1.125rem;
    }

    a:focus,
    button:focus {
      outline: 2px solid ${theme.colors.highlight};
    }

    a:focus:not(:focus-visible),
    button:focus:not(:focus-visible) {
      outline: none;
    }

    a:focus-visible,
    button:focus-visible {
      outline: 2px solid ${theme.colors.highlight};
    }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
