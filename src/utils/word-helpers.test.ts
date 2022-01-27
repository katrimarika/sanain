import { getHitsForGuess } from './word-helpers';

test('marks hits for "karhu" guessed against "kissa"', () => {
  expect(getHitsForGuess('kissa', 'karhu')).toStrictEqual([
    'hit',
    'place',
    'miss',
    'miss',
    'miss',
  ]);
});

test('marks hits for "aavat" guessed against "takaa"', () => {
  expect(getHitsForGuess('takaa', 'aavat')).toStrictEqual([
    'place',
    'hit',
    'miss',
    'hit',
    'place',
  ]);
});

test('marks hits for "ottaa" guessed against "taito"', () => {
  expect(getHitsForGuess('taito', 'ottaa')).toStrictEqual([
    'place',
    'place',
    'place',
    'place',
    'miss',
  ]);
});
