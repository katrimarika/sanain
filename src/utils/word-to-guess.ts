import { words5 } from './words';
import { useState } from 'react';

const isValidWord = (wrd: string) => words5.includes(wrd);

const getRandomWord = () => {
  const index = Math.floor(Math.random() * words5.length);
  return words5[index];
};

const getWordToGuess = () => {
  // TODO: store and check from storage, unless forcing new word
  return getRandomWord();
};

export const useWordToGuess = () => {
  const [word, setWord] = useState(getWordToGuess());
  const [guesses, setGuesses] = useState<string[]>([]);

  return {
    word,
    guesses,
    submitGuess,
    changeWord,
  };

  function submitGuess(g: string) {
    if (isValidWord(g)) {
      setGuesses((gs) => [...gs, g]);
      return true;
    }
    return false;
  }

  function changeWord() {
    setWord(getWordToGuess());
    setGuesses([]);
  }
};
