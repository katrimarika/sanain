import MenuIcon from 'icons/menu.svg';
import ReloadIcon from 'icons/reset.svg';
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
  grid-template-rows: 3fr minmax(auto, 2fr);
  grid-gap: 1.5rem;

  ${onLandscape} {
    grid-template-columns: 1fr minmax(auto, 1fr);
    grid-template-rows: 1fr;

    ${onNotSmall} {
      grid-column-gap: 2rem;
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
  background-image: url(${MenuIcon});
  background-size: 2rem;
  margin: 0;
`;

const ReloadButton = styled(IconButton)`
  background-image: url(${ReloadIcon});
  background-size: 1.25rem;
  margin: 0 0.5rem 0 auto;
`;

export const App: FC = () => {
  const { word, guesses, submitGuess, newGame, status, statistics } =
    useWordToGuess();
  const [currentGuess, setCurrentGuess] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const [statisticsClosed, setStatisticsClosed] = useState(false);

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

  return (
    <Wrapper>
      <Header>
        <Title>Sanain</Title>
        <ReloadButton
          onClick={() => window.location.reload()}
          aria-label="Päivitä"
        />
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
              setToastMessage('Sana ei löydy sanalistasta.');
              setTimeout(() => setToastMessage(''), 2500);
            }
          }}
        />
      </Main>
      <Toast show={!!toastMessage}>{toastMessage}</Toast>
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
