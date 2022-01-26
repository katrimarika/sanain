import React, { FC } from 'react';
import styled from 'styled-components';
import { onLandscape } from '../utils/style';
import { theme } from '../utils/theme';
import { useWordToGuess } from '../utils/word-to-guess';
import RefreshIcon from '../icons/refresh.svg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 0.75rem 1.5rem;
  border-bottom: 2px solid ${theme.colors.green};
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0;
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
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.25rem 0 0 1.25rem;
  color: ${theme.colors.white};
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${theme.colors.green};
  font-size: 1rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${RefreshIcon});
  background-size: 1rem;
  background-position: left 0 top 50%;
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
  const { word, guesses, submitGuess, changeWord } = useWordToGuess();

  return (
    <Wrapper>
      <Header>
        <Title>Sanain</Title>
        <Button onClick={changeWord}>Vaihda</Button>
      </Header>
      <Main>
        <div>Pelialue</div>
        <div>{'Näppäimistö'}</div>
      </Main>
    </Wrapper>
  );
};
