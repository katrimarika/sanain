import React, { FC, useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '../icons/menu.svg';
import { WORD_LENGTH } from '../utils/settings';
import { ButtonWithHover, onLandscape, onNotSmall } from '../utils/style';
import { theme } from '../utils/theme';
import { getHitsByLetter, getHitsForGuesses } from '../utils/word-helpers';
import { useWordToGuess } from '../utils/word-to-guess';
import { Keyboard } from './Keyboard';
import { PlayArea } from './PlayArea';
import { StatisticsDialog } from './StatisticsDialog';
import { Toast } from './Toast';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 0 1.5rem;
  border-bottom: 2px solid ${theme.colors.green};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0.75rem 0;
`;

const Main = styled.main`
  margin: 0 auto;
  flex-grow: 1;
  width: 100%;
  padding: 1rem 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr minmax(auto, 1fr);
  grid-gap: 1.5rem;

  ${onLandscape} {
    grid-template-columns: 1fr minmax(auto, 1fr);
    grid-template-rows: 1fr;

    ${onNotSmall} {
      grid-column-gap: 2rem;
    }
  }
`;

const MenuButton = styled(ButtonWithHover)`
  display: flex;
  padding: 0;
  width: 2rem;
  height: 2rem;
  color: ${theme.colors.green};
  background: transparent;
  border: 0;
  font-size: 1rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${MenuIcon});
  background-size: 2rem;
  background-position: left 50% top 50%;
  background-repeat: no-repeat;
`;

export const App: FC = () => {
  const { word, guesses, submitGuess, newGame, status, statistics } =
    useWordToGuess();
  const [currentGuess, setCurrentGuess] = useState('');
  const [invalidGuess, setInvalidGuess] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const [statisticsClosed, setStatisticsClosed] = useState(false);

  const hits = getHitsForGuesses(word, guesses);
  const hitsByLetter = getHitsByLetter(hits, guesses);

  return (
    <Wrapper>
      <Header>
        <Title>Sanain</Title>
        <MenuButton
          onClick={() => setStatisticsOpen(true)}
          aria-label="Valikko"
        />
      </Header>
      <Main>
        <PlayArea hits={hits} guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          hitsByLetter={hitsByLetter}
          onPress={(l) =>
            setCurrentGuess((g) => (g.length < WORD_LENGTH ? `${g}${l}` : g))
          }
          onRemove={() => setCurrentGuess((g) => g.slice(0, g.length - 1))}
          onSubmit={() => {
            if (currentGuess.length < WORD_LENGTH) {
              return;
            }
            const validGuess = submitGuess(currentGuess);
            if (validGuess) {
              setCurrentGuess('');
            } else {
              setInvalidGuess(true);
              setTimeout(() => setInvalidGuess(false), 2500);
            }
          }}
        />
      </Main>
      <Toast show={invalidGuess}>Sana ei löydy sanalistasta!</Toast>
      <StatisticsDialog
        isOpen={statisticsOpen || (!statisticsClosed && status !== 'guess')}
        close={() => {
          setStatisticsOpen(false);
          setStatisticsClosed(true);
        }}
        status={status}
        statistics={statistics}
        newGame={() => {
          setCurrentGuess('');
          setStatisticsClosed(false);
          newGame();
        }}
      />
    </Wrapper>
  );
};
