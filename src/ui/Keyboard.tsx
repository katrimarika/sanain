import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import BackspaceIcon from '../icons/backspace.svg';
import WrapIcon from '../icons/wrap.svg';
import { ButtonWithHover } from '../utils/style';
import { onLandscape, onNotSmall } from '../utils/style';
import { theme } from '../utils/theme';

const letters = 'qwertyuiopåasdfghjklöäzxcvbnm';

const Container = styled.div`
  margin: 0 auto auto;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.125rem;
  width: 100%;
  max-width: 24rem;

  ${onNotSmall} {
    max-width: 28rem;
    grid-gap: 0.25rem;

    ${onLandscape} {
      margin-left: 0;
    }
  }
`;

const Button = styled(ButtonWithHover)`
  font-size: 1rem;
  padding: 0.5rem 0.125rem;
  font-family: ${theme.fontFamily.body};
  text-transform: uppercase;
  color: ${theme.colors.black};
  background: ${theme.colors.white};
  border: 0;
  border-radius: 0.125rem;

  ${onNotSmall} {
    padding: 0.75rem 0.25rem;
    font-size: 1.5rem;
    border-radius: 0.25rem;
    min-width: 2rem;
  }
`;

const IconButton = styled(Button)`
  background-size: 2rem;
  background-position: left 50% top 50%;
  background-repeat: no-repeat;

  ${onNotSmall} {
    background-size: 2.25rem;
  }
`;

const BackspaceButton = styled(IconButton)`
  background-image: url(${BackspaceIcon});
`;

const SubmitButton = styled(IconButton)`
  background-image: url(${WrapIcon});
  transform: rotate(180deg);
`;

export const Keyboard: FC<{
  guesses: string[];
  onPress: (l: string) => void;
  onRemove: () => void;
  onSubmit: () => void;
}> = ({ guesses, onPress, onRemove, onSubmit }) => {
  return (
    <Container>
      {letters.split('').map((l, i) => (
        <Fragment key={`lttr-${l}`}>
          {i === 2 * 11 && <div />}
          <Button onClick={() => onPress(l)}>{l}</Button>
        </Fragment>
      ))}
      <div />
      <BackspaceButton arial-label="Poista merkki" onClick={() => onRemove()} />
      <SubmitButton aria-label="Vahvista" onClick={() => onSubmit()} />
    </Container>
  );
};
