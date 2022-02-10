import GraphIcon from 'icons/graph.svg';
import InfoIcon from 'icons/info.svg';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameEndDialog } from 'ui/GameEndDialog';
import { InfoDialog } from 'ui/InfoDialog';
import { Keyboard } from 'ui/Keyboard';
import { NativeKeyboardSupport } from 'ui/NativeKeyboardSupport';
import { PlayArea } from 'ui/PlayArea';
import { StatisticsDialog } from 'ui/StatisticsDialog';
import { Toast } from 'ui/Toast';
import { LETTERS, useSettings, WORD_LENGTH } from 'utils/settings';
import { checkForStorage } from 'utils/storage';
import { ButtonWithHover, onLandscape, onNotSmall } from 'utils/style';
import { theme } from 'utils/theme';
import { getHitsByLetter, getHitsForGuesses } from 'utils/word-helpers';
import { useWordToGuess } from 'utils/word-to-guess';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${onLandscape} {
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    height: unset;
    max-height: unset;
    min-height: 100vh;
  }
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

const StyledMain = styled.main`
  position: relative;
  flex-grow: 1;
  width: 100%;
  padding: 1rem 0.25rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(auto, 50%);
  grid-gap: 2rem 0.25rem;

  ${onNotSmall} {
    padding-top: 2rem;
    grid-gap: 4rem 0.75rem;
  }
`;

const LandscapeSideBySideMain = styled(StyledMain)`
  ${onLandscape} {
    grid-template-columns: auto minmax(auto, 60%);
    grid-auto-rows: auto;

    ${onNotSmall} {
      grid-template-columns: minmax(auto, 50%) minmax(auto, 60%);
    }
  }
`;

const ControlAreaWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 28rem;

  ${onLandscape} {
    margin-top: 0;
    margin-bottom: auto;
  }
`;

const ControlAreaSideBySide = styled(ControlAreaWrapper)`
  max-width: 28rem;

  ${onLandscape} {
    padding-right: 1.25rem;

    ${onNotSmall} {
      margin-left: 0;
    }
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

  const settings = useSettings();

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

  const Main = settings.onlyNativeKeyboard
    ? StyledMain
    : LandscapeSideBySideMain;
  const ControlArea = settings.onlyNativeKeyboard
    ? ControlAreaWrapper
    : ControlAreaSideBySide;

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
          hitsByLetter={hitsByLetter}
          guesses={guesses}
          currentGuess={currentGuess}
          status={status}
        />
        <ControlArea>
          <Toast show={!!toastMessage}>{toastMessage}</Toast>
          {settings.onlyNativeKeyboard ? (
            <NativeKeyboardSupport
              active={status === 'guess' && !statsDialogOpen && !infoDialogOpen}
              currentGuess={currentGuess}
              onChange={(g) => {
                if (status === 'guess') {
                  const filtered = g
                    .toLowerCase()
                    .split('')
                    .filter((l) => LETTERS.includes(l))
                    .join('');
                  if (filtered.length <= WORD_LENGTH) {
                    setCurrentGuess(filtered);
                  }
                }
              }}
              onSubmit={onSubmit}
            />
          ) : (
            <Keyboard
              captureKeyPresses={
                status === 'guess' && !statsDialogOpen && !infoDialogOpen
              }
              hitsByLetter={hitsByLetter}
              onPress={(l) => {
                if (status === 'guess') {
                  setCurrentGuess((g) =>
                    g.length < WORD_LENGTH ? `${g}${l}` : g
                  );
                }
              }}
              onRemove={() => setCurrentGuess((g) => g.slice(0, g.length - 1))}
              onSubmit={onSubmit}
            />
          )}
        </ControlArea>
      </Main>
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
        settings={settings}
      />
    </Wrapper>
  );

  function onSubmit() {
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
      setTimeout(() => setToastMessage(''), 1000);
    }
  }
};
