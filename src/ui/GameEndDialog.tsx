import PlusIcon from 'icons/plus.svg';
import { FC } from 'react';
import styled from 'styled-components';
import { StatisticsView } from 'ui/StatisticsView';
import { ButtonWithHover } from 'utils/style';
import { theme } from 'utils/theme';
import { Statistics } from 'utils/word-to-guess';
import { Dialog } from './Dialog';

const Button = styled(ButtonWithHover)`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  align-self: center;
  display: inline-flex;
  padding: 0.25rem 0.25rem 0.25rem 1.75rem;
  color: ${theme.colors.highlight};
  background: transparent;
  border: 1px solid ${theme.colors.highlight};
  font-size: 1.25rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${PlusIcon});
  background-size: 1.75rem;
  background-position: left 0 top 50%;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  margin: 0 0 1rem;
`;

export const GameEndDialog: FC<{
  isOpen: boolean;
  close: () => void;
  status: 'win' | 'lose';
  guessCount: number;
  word: string;
  statistics: Statistics;
  newGame: () => void;
}> = ({ isOpen, close, status, guessCount, word, statistics, newGame }) => (
  <Dialog
    isOpen={isOpen}
    close={close}
    title={status === 'lose' ? 'Pahus!' : 'Oikein!'}
  >
    {status === 'lose' && <Text>{`Oikea vastaus olisi ollut "${word}".`}</Text>}
    <StatisticsView
      statistics={statistics}
      currenWinGuessCount={status === 'win' ? guessCount : undefined}
    />
    <Button onClick={newGame}>Uusi peli</Button>
  </Dialog>
);
