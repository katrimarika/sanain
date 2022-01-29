import React, { FC } from 'react';
import styled from 'styled-components';
import { MAX_GUESSES, WORD_LENGTH } from 'utils/settings';
import { onLandscape, onNotSmall } from 'utils/style';
import { theme } from 'utils/theme';
import { Hit } from 'utils/word-helpers';

const Grid = styled.div`
  margin: 0 auto;
  padding: 0 0.75rem;
  display: grid;
  grid-template-columns: repeat(${WORD_LENGTH}, 1fr);
  grid-template-rows: repeat(${MAX_GUESSES}, 1fr);
  grid-gap: 0.5rem 0.75rem;

  ${onLandscape} {
    margin: 0 0 auto auto;
  }

  ${onNotSmall} {
    grid-gap: 0.75rem 0.875rem;
  }
`;
const Box = styled.div`
  border-bottom: 1px solid ${theme.colors.gray};
  text-transform: uppercase;
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.25rem;
  line-height: 1.2;
  box-sizing: content-box;
  min-width: 1.75rem;
  min-height: 2.1rem;

  ${onNotSmall} {
    padding: 0.1875rem 0.3125rem;
    font-size: 2.25rem;
    min-width: 2.25rem;
    min-height: 2.7rem;
  }

  &.active {
    border-color: ${theme.colors.white};
  }

  &.hit {
    color: ${theme.colors.green};
  }

  &.place {
    color: ${theme.colors.yellow};
  }

  &.miss {
    color: ${theme.colors.gray};
  }
`;

export const PlayArea: FC<{
  guesses: string[];
  hits: Hit[][];
  currentGuess: string;
  status: 'win' | 'lose' | 'guess';
}> = ({ guesses, hits, currentGuess, status }) => {
  const rows = [...new Array(MAX_GUESSES)];

  return (
    <Grid>
      {rows.map((_, i) => {
        const rowGuess = guesses[i];
        const showCurrent = i === guesses.length;
        const rowHits = hits[i] ?? [];
        return [...new Array(WORD_LENGTH)].map((_, j) => (
          <Box
            key={`box-${i}-${j}`}
            className={`${rowHits[j]}${
              (status === 'guess' && showCurrent) ||
              (status === 'win' && i === guesses.length - 1)
                ? ' active'
                : ''
            }`}
          >
            {rowGuess ? rowGuess[j] : showCurrent ? currentGuess[j] || '' : ''}
          </Box>
        ));
      })}
    </Grid>
  );
};
