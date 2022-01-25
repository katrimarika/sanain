import { css } from 'linaria';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Login from '../components/login';
import { FetchError, fetchWordToGuess } from '../utils/fetch';
import { onLandscape } from '../utils/style';
import { LoginData, RemoteData } from '../utils/types';

const Home: NextPage = () => {
  const [loginData, setLoginData] = useState<LoginData>();
  const [wordData, setWordData] = useState<RemoteData<string>>();

  useEffect(() => {
    if (!wordData && loginData) {
      fetchData(loginData);
    }
  }, [wordData, loginData]);

  if (!loginData) {
    return (
      <Login
        onSubmit={(s) => {
          setWordData(undefined);
          const encodedPass = Buffer.from(s).toString('base64');
          setLoginData(encodedPass);
        }}
        error={(wordData?.status === 'error' && wordData.errorStr) || undefined}
      />
    );
  }

  if (!wordData || wordData.status === 'loading') {
    return null;
  }

  if (wordData.status === 'error') {
    return <p>Virhe alustuksessa!</p>;
  }

  return (
    <div
      className={css`
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3fr 2fr;
        grid-gap: 1.5rem;

        ${onLandscape} {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
        }
      `}
    >
      <div>Pelialue</div>
      <div>{'Näppäimistö'}</div>
    </div>
  );

  async function fetchData(auth: LoginData) {
    try {
      setWordData({ status: 'loading' });
      const wordToGuess = await fetchWordToGuess(auth);
      setWordData({ status: 'success', data: wordToGuess });
    } catch (e) {
      const errorCode = e instanceof FetchError ? e.errorCode : undefined;
      if (errorCode === 401) {
        setLoginData(undefined);
      }
      setWordData({
        status: 'error',
        errorStr: e instanceof Error ? e.message : undefined,
        errorCode,
      });
    }
  }
};

export default Home;
