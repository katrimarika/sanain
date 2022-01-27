export type Hit = 'hit' | 'miss' | 'place';

export function getHitsForGuess(word: string, guess: string): Hit[] {
  const guessLetters = guess.split('');
  let usedLetters: string[] = [];
  // First run through the whole word and mark clear hits and misses
  const clearHits = guessLetters.map((g, i) => {
    const ind = word.indexOf(g);
    if (ind === -1) {
      return 'miss';
    }
    if (word[i] === g) {
      usedLetters.push(g);
      return 'hit';
    }
    return 'check';
  });
  // Then check the remaining letters if they appear in the word
  return guessLetters.map((g, i) => {
    const handled = clearHits[i];
    if (handled !== 'check') {
      return handled;
    }
    // Handle possible duplicate occurences of one letter
    const usedCount = usedLetters.filter((l) => l === g).length;
    // If the letter was not yet marked, mark it
    if (usedCount === 0) {
      usedLetters.push(g);
      return 'place';
    }
    const matchCount = (word.match(new RegExp(g, 'g')) ?? []).length;
    // Check if the letter was marked already
    if (usedCount >= matchCount) {
      return 'miss';
    }
    // The letter must occur multiple times in the word
    usedLetters.push(g);
    return 'place';
  });
}

export function getHitsForGuesses(word: string, guesses: string[]): Hit[][] {
  return guesses.map((guess) => getHitsForGuess(word, guess));
}

export function getHitsByLetter(hits: Hit[][], guesses: string[]) {
  return hits.reduce<{ [key: string]: Hit }>((obj, hit, i) => {
    hit.forEach((h, j) => {
      const letter = guesses[i][j];
      if (!(letter in obj) || h === 'hit') {
        obj[letter] = h;
      }
    });

    return obj;
  }, {});
}
