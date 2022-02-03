import GraphIcon from 'icons/graph.svg';
import InfoIcon from 'icons/info.svg';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Keyboard } from 'ui/Keyboard';
import { PlayArea } from 'ui/PlayArea';
import { StatisticsDialog } from 'ui/StatisticsDialog';
import { Toast } from 'ui/Toast';
import { WORD_LENGTH } from 'utils/settings';
import { checkForStorage } from 'utils/storage';
import { ButtonWithHover, onLandscape, onNotSmall } from 'utils/style';
import { theme } from 'utils/theme';
import { getHitsByLetter, getHitsForGuesses } from 'utils/word-helpers';
import { useWordToGuess } from 'utils/word-to-guess';
import { GameEndDialog } from './GameEndDialog';
import { InfoDialog } from './InfoDialog';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 0 1.5rem;
  border-bottom: 2px solid ${theme.colors.highlight};
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
  padding: 1rem 0.25rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(auto, 50%);
  grid-gap: 2rem 0.25rem;

  ${onLandscape} {
    grid-template-columns: auto minmax(auto, 60%);
    grid-auto-rows: auto;

    ${onNotSmall} {
      grid-template-columns: minmax(auto, 50%) minmax(auto, 60%);
    }
  }

  ${onNotSmall} {
    padding-top: 2rem;
    grid-gap: 4rem 0.75rem;
  }
`;

const IconButton = styled(ButtonWithHover)`
  display: flex;
  padding: 0;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: 0;
  background-position: left 50% top 50%;
  background-repeat: no-repeat;
`;

const MenuButton = styled(IconButton)`
  background-image: url(${GraphIcon});
  background-size: 2rem;
  margin: 0;
`;

const InfoButton = styled(IconButton)`
  background-image: url(${InfoIcon});
  background-size: 1.75rem;
  margin: 0 0.5rem 0 auto;
`;

export const App: FC = () => {
  const {
    word,
    guesses,
    submitGuess,
    newGame,
    status,
    statistics,
    resetStatistics,
  } = useWordToGuess();
  const [currentGuess, setCurrentGuess] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [endDialogOpen, setEndDialogOpen] = useState(false);

  const hits = getHitsForGuesses(word, guesses);
  const hitsByLetter = getHitsByLetter(hits, guesses);

  useEffect(() => {
    if (!checkForStorage()) {
      setToastMessage(
        'Selaimen tallennus ei käytössä. Pelitilaa tai tilastoja ei pystytä säilyttämään.'
      );
      setTimeout(() => setToastMessage(''), 5000);
    }
  }, []);

  useEffect(() => {
    if (status !== 'guess') {
      setTimeout(() => setEndDialogOpen(true), 500);
    }
  }, [status]);

  return (
    <Wrapper>
      <Header>
        <Title>Sanain</Title>
        <InfoButton onClick={() => setInfoDialogOpen(true)} aria-label="Info" />
        <MenuButton
          onClick={() => setStatsDialogOpen(true)}
          aria-label="Valikko"
        />
      </Header>
      <Main>
        <PlayArea
          hits={hits}
          guesses={guesses}
          currentGuess={currentGuess}
          status={status}
        />
        <Keyboard
          captureKeyPresses={
            status === 'guess' && !statsDialogOpen && !infoDialogOpen
          }
          hitsByLetter={hitsByLetter}
          onPress={(l) => {
            if (status === 'guess') {
              setCurrentGuess((g) => (g.length < WORD_LENGTH ? `${g}${l}` : g));
            }
          }}
          onRemove={() => setCurrentGuess((g) => g.slice(0, g.length - 1))}
          onSubmit={() => {
            if (status !== 'guess' && !endDialogOpen) {
              setEndDialogOpen(true);
            }
            if (currentGuess.length < WORD_LENGTH) {
              return;
            }
            const validGuess = submitGuess(currentGuess);
            if (validGuess) {
              setCurrentGuess('');
            } else {
              setToastMessage('Sana ei löydy sanalistasta.');
              setTimeout(() => setToastMessage(''), 2500);
            }
          }}
        />
      </Main>
      <Toast show={!!toastMessage}>{toastMessage}</Toast>
      {status !== 'guess' && (
        <GameEndDialog
          isOpen={endDialogOpen}
          close={() => setEndDialogOpen(false)}
          status={status}
          guessCount={guesses.length}
          word={word}
          statistics={statistics}
          newGame={() => {
            newGame();
            setEndDialogOpen(false);
          }}
        />
      )}
      <StatisticsDialog
        isOpen={statsDialogOpen}
        close={() => setStatsDialogOpen(false)}
        showNotice={status === 'guess'}
        statistics={statistics}
        newGame={() => {
          newGame();
          setStatsDialogOpen(false);
        }}
      />
      <InfoDialog
        isOpen={infoDialogOpen}
        close={() => setInfoDialogOpen(false)}
        resetStatistics={resetStatistics}
      />
    </Wrapper>
  );
};
