import React, { FC } from 'react';
import styled from 'styled-components';
import { MAX_GUESSES, WORD_LENGTH } from '../utils/settings';
import { onLandscape, onNotSmall } from '../utils/style';
import { theme } from '../utils/theme';

const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
  grid-template-rows: repeat(${MAX_GUESSES}, 1fr);
  grid-gap: 0.5rem 0.25rem;
  max-height: 30rem;

  ${onLandscape} {
    margin: 0;
    width: 100%;
    max-width: 24rem;

    ${onNotSmall} {
      max-width: 28rem;
      margin-left: auto;
    }
  }
`;
const Box = styled.div`
  border: 1px solid ${theme.colors.white};
  text-transform: uppercase;
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  line-height: 1;
  box-sizing: content-box;
  min-width: 1.75rem;
  min-height: 1.75rem;

  ${onNotSmall} {
    padding: 0.25rem 0.5rem;
    font-size: 2.25rem;
    min-width: 2.25rem;
  }
`;

export const PlayArea: FC<{
  guesses: string[];
  currentGuess: string;
}> = ({ guesses, currentGuess }) => {
  const rows = [...new Array(MAX_GUESSES)];

  // TODO: show hits

  return (
    <Grid>
      {rows.map((_, i) => {
        const rowGuess = guesses[i];
        const showCurrent = i === guesses.length;
        return [...new Array(WORD_LENGTH)].map((_, j) => (
          <Box key={`box-${i}-${j}`}>
            {rowGuess ? rowGuess[j] : showCurrent ? currentGuess[j] || '' : ''}
          </Box>
        ));
      })}
    </Grid>
  );
};
