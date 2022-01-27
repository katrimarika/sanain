import { words5 } from './words';
import { useState } from 'react';
import { MAX_GUESSES } from './settings';

const isValidWord = (wrd: string) => words5.includes(wrd);

const getRandomWord = () => {
  const index = Math.floor(Math.random() * words5.length);
  return words5[index];
};

const getWordToGuess = () => {
  // TODO: store and check from localStorage, unless forcing new word
  return getRandomWord();
};

export type Statistics = {
  totalPlayed: number;
  totalWins: number;
  totalLosses: number;
  winDistribution: { [key: number]: number };
};
const getStatistics = (): Statistics => {
  // TODO: get from storage
  return {
    totalPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
    winDistribution: {},
  };
};

const handleCompletion = (
  status: 'win' | 'lose' | 'giveup',
  guessCount: number
) => {
  const { totalPlayed, totalWins, totalLosses, winDistribution } =
    getStatistics();
  const newStatistics: Statistics = {
    totalPlayed: totalPlayed + 1,
    totalWins: status === 'win' ? totalWins + 1 : totalWins,
    totalLosses: status === 'lose' ? totalLosses + 1 : totalLosses,
    winDistribution:
      status === 'win'
        ? {
            ...winDistribution,
            [guessCount]: (winDistribution[guessCount] ?? 0) + 1,
          }
        : { ...winDistribution },
  };
  // TODO: store statistics to localStorage

  return newStatistics;
};

export const useWordToGuess = () => {
  const [word, setWord] = useState(getWordToGuess());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<'guess' | 'win' | 'lose'>('guess');
  const [statistics, setStatistics] = useState(getStatistics());

  return {
    word,
    statistics,
    status,
    guesses,
    submitGuess,
    newGame,
  };

  /**
   * @param g Guess string, must be of length WORD_LENGTH
   * @returns true if the guess is valid, false otherwise
   */
  function submitGuess(g: string) {
    if (status !== 'guess') {
      return false;
    }

    const currentGuessCount = guesses.length + 1;

    if (g === word) {
      setGuesses((gs) => [...gs, g]);
      const newStats = handleCompletion('win', currentGuessCount);
      setStatistics(newStats);
      setStatus('win');
      return true;
    }

    if (isValidWord(g)) {
      setGuesses((gs) => [...gs, g]);
      if (currentGuessCount >= MAX_GUESSES) {
        const newStats = handleCompletion('lose', currentGuessCount);
        setStatistics(newStats);
        setStatus('lose');
      }
      return true;
    }

    return false;
  }

  function newGame() {
    if (status === 'guess') {
      // If the game was not over, count starting new as giving up
      const newStats = handleCompletion('giveup', guesses.length);
      setStatistics(newStats);
    }
    setWord(getWordToGuess());
    setGuesses([]);
    setStatus('guess');
  }
};
