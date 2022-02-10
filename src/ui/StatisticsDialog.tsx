import RefreshIcon from 'icons/refresh.svg';
import { FC } from 'react';
import styled from 'styled-components';
import { Dialog } from 'ui/Dialog';
import { StatisticsView } from 'ui/StatisticsView';
import { ButtonWithHover } from 'utils/style';
import { theme } from 'utils/theme';
import { Statistics } from 'utils/word-to-guess';

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
  background-image: url(${RefreshIcon});
  background-size: 1.125rem;
  background-position: left 0.375rem top 50%;
  background-repeat: no-repeat;
`;

const Notice = styled.div`
  margin: 0 1rem;
  align-self: center;
  text-align: center;
`;

export const StatisticsDialog: FC<{
  isOpen: boolean;
  close: () => void;
  showNotice: boolean;
  statistics: Statistics;
  newGame: () => void;
}> = ({ isOpen, close, showNotice, statistics, newGame }) => (
  <Dialog isOpen={isOpen} close={close} title="Tilastot">
    <StatisticsView statistics={statistics} />
    <Button onClick={newGame}>Uusi peli</Button>
    {showNotice && (
      <Notice>
        Huom! Keskeneräinen peli merkitään luovutetuksi, jos aloitat uuden
        pelin.
      </Notice>
    )}
  </Dialog>
);
