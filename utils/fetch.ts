import { LoginData } from './types';

export class FetchError extends Error {
  errorCode: number;

  constructor(errorCode: number, msg: string) {
    super(msg);
    this.errorCode = errorCode;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}

const fetcher = async (url: string, loginData: LoginData) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${loginData}`,
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new FetchError(res.status, res.statusText);
  }
};

export const fetchWordToGuess = async (
  loginData: LoginData
): Promise<string> => {
  const apiUrl = '/api/word/';
  const data = await fetcher(apiUrl, loginData);

  if (typeof data === 'object' && data.word && typeof data.word === 'string') {
    return data.word;
  }
  throw new Error('Unknown response format!');
};
