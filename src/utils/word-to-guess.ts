import { useState } from 'react';
import { LETTERS, MAX_GUESSES, WORD_LENGTH } from 'utils/settings';
import { getDataFromStorage, storeData } from 'utils/storage';
import { words5 } from 'utils/words';

const isValidWord = (wrd: string) => words5.includes(wrd);

const getRandomWordIndex = () => Math.floor(Math.random() * words5.length);

const wordStorageKey = 'sanain-word';
const getWordToGuess = (options: { forceNew?: boolean } = {}) => {
  if (!options?.forceNew) {
    const storedData = getDataFromStorage(wordStorageKey);
    if (storedData) {
      try {
        const decoded = atob(storedData);
        if (
          decoded.length === WORD_LENGTH &&
          decoded.split('').filter((d) => LETTERS.includes(d)).length ===
            WORD_LENGTH
        ) {
          return decoded;
        }
      } catch (e) {
        // no-op
      }
    }
  }
  const newWordIndex = getRandomWordIndex();
  const word = words5[newWordIndex];
  try {
    storeData(wordStorageKey, btoa(word));
  } catch (e) {
    // no-op
  }

  return word;
};

const guessesStorageKey = 'sanain-guesses';
const getGuesses = () => {
  const stored = getDataFromStorage(guessesStorageKey);
  if (stored) {
    return stored.split(',').filter((s) => s.length === WORD_LENGTH);
  }
  return [];
};
const storeGuesses = (gs: string[]) => {
  storeData(guessesStorageKey, gs.join(','));
};

export type Statistics = {
  totalPlayed: number;
  totalWins: number;
  totalLosses: number;
  winDistribution: { [key: number]: number };
};

const statisticsStorageKey = 'sanain-stats';
const getStatistics = (): Statistics => {
  const stored = getDataFromStorage(statisticsStorageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        const { totalPlayed, totalWins, totalLosses, winDistribution } = parsed;
        const toNum = (d: unknown) => (typeof d === 'number' && d >= 0 ? d : 0);
        return {
          totalPlayed: toNum(totalPlayed),
          totalWins: toNum(totalWins),
          totalLosses: toNum(totalLosses),
          winDistribution:
            winDistribution && typeof winDistribution === 'object'
              ? [...new Array(MAX_GUESSES)].reduce((obj, _, i) => {
                  const key = i + 1;
                  const num = toNum(winDistribution[key]);
                  if (num) {
                    obj[key] = num;
                  }
                  return obj;
                }, {})
              : {},
        };
      }
    } catch {
      // no-op
    }
  }
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
  storeData(statisticsStorageKey, JSON.stringify(newStatistics));
  return newStatistics;
};

export const useWordToGuess = () => {
  const [word, setWord] = useState(getWordToGuess());
  const [guesses, setGuesses] = useState<string[]>(word ? getGuesses() : []);
  const [statistics, setStatistics] = useState(getStatistics());

  const status =
    guesses.length && guesses[guesses.length - 1] === word
      ? ('win' as const)
      : guesses.length === MAX_GUESSES
      ? ('lose' as const)
      : ('guess' as const);

  return {
    word,
    statistics,
    status,
    guesses,
    submitGuess,
    newGame,
  };

  function updateGuesses(gs: string[]) {
    setGuesses(gs);
    storeGuesses(gs);
  }

  /**
   * @param g Guess string, must be of length WORD_LENGTH
   * @returns true if the guess is valid, false otherwise
   */
  function submitGuess(g: string) {
    if (status !== 'guess') {
      return false;
    }

    const newGuesses = [...guesses, g];
    const currentGuessCount = newGuesses.length;

    if (g === word) {
      updateGuesses(newGuesses);
      const newStats = handleCompletion('win', currentGuessCount);
      setStatistics(newStats);
      return true;
    }

    if (isValidWord(g)) {
      updateGuesses(newGuesses);
      if (currentGuessCount >= MAX_GUESSES) {
        const newStats = handleCompletion('lose', currentGuessCount);
        setStatistics(newStats);
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
    setWord(getWordToGuess({ forceNew: true }));
    updateGuesses([]);
  }
};
