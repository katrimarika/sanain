import { css } from 'linaria';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import { theme } from '../utils/theme';

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap');

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
      background-color: ${theme.colors.white};
      color: ${theme.colors.black};
      font-family: ${theme.fontFamily.body};
      font-weight: normal;
      font-size: 1.125rem;
    }

    a:focus,
    button:focus {
      outline: 2px solid ${theme.colors.green};
    }

    a:focus:not(:focus-visible),
    button:focus:not(:focus-visible) {
      outline: none;
    }

    a:focus-visible,
    button:focus-visible {
      outline: 2px solid ${theme.colors.green};
    }
  }
`;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sanain</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="/favicon-152.png"
        ></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
