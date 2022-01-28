import React, { FC } from 'react';
import styled from 'styled-components';
import { MAX_GUESSES, WORD_LENGTH } from 'utils/settings';
import { onLandscape, onNotSmall } from 'utils/style';
import { theme } from 'utils/theme';
import { Hit } from 'utils/word-helpers';

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
  line-height: 1.2;
  box-sizing: content-box;
  min-width: 1.75rem;
  min-height: 1.75rem;

  ${onNotSmall} {
    padding: 0.25rem 0.5rem;
    font-size: 2.25rem;
    min-width: 2.25rem;
  }

  &.hit {
    color: ${theme.colors.green};
    box-shadow: inset 0 0 0 3px ${theme.colors.green};
  }

  &.place {
    color: ${theme.colors.yellow};
    box-shadow: inset 0 0 0 3px ${theme.colors.yellow};
  }

  &.miss {
    color: ${theme.colors.gray};
    border-color: ${theme.colors.gray};
  }
`;

export const PlayArea: FC<{
  guesses: string[];
  hits: Hit[][];
  currentGuess: string;
}> = ({ guesses, hits, currentGuess }) => {
  const rows = [...new Array(MAX_GUESSES)];

  return (
    <Grid>
      {rows.map((_, i) => {
        const rowGuess = guesses[i];
        const showCurrent = i === guesses.length;
        const rowHits = hits[i] ?? [];
        return [...new Array(WORD_LENGTH)].map((_, j) => (
          <Box key={`box-${i}-${j}`} className={rowHits[j]}>
            {rowGuess ? rowGuess[j] : showCurrent ? currentGuess[j] || '' : ''}
          </Box>
        ));
      })}
    </Grid>
  );
};
