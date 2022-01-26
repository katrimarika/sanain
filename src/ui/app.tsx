import React, { FC, useState } from 'react';
import styled from 'styled-components';
import MenuIcon from '../icons/menu.svg';
import { WORD_LENGTH } from '../utils/settings';
import { onLandscape, onNotSmall } from '../utils/style';
import { theme } from '../utils/theme';
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
  grid-template-rows: 3fr 2fr;
  grid-gap: 1.5rem;

  ${onLandscape} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    ${onNotSmall} {
      grid-column-gap: 3rem;
    }
  }
`;

const MenuButton = styled.button`
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

  &:active {
    opacity: 0.8;
  }

  @media (hover: hover) {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const App: FC = () => {
  const { guesses, submitGuess, newGame, status } = useWordToGuess();
  const [currentGuess, setCurrentGuess] = useState('');
  const [invalidGuess, setInvalidGuess] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);

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
        <PlayArea guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          guesses={guesses}
          onPress={(l) =>
            setCurrentGuess((g) => (g.length < WORD_LENGTH ? `${g}${l}` : g))
          }
          onRemove={() => setCurrentGuess((g) => g.slice(0, g.length - 1))}
          onSubmit={(g) => {
            const validGuess = submitGuess(g);
            if (validGuess) {
              setCurrentGuess('');
            } else {
              setInvalidGuess(true);
              setTimeout(() => setInvalidGuess(false), 3000);
            }
          }}
        />
        <Toast show={invalidGuess}>Sana ei löydy sanakirjasta!</Toast>
        <StatisticsDialog
          isOpen={status !== 'guess' || statisticsOpen}
          setIsOpen={setStatisticsOpen}
          status={status}
          newGame={newGame}
        />
      </Main>
    </Wrapper>
  );
};
