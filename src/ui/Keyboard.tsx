import BackspaceIcon from 'icons/backspace.svg';
import WrapIcon from 'icons/wrap.svg';
import React, { FC, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { LETTERS } from 'utils/settings';
import { ButtonWithHover, onLandscape, onNotSmall } from 'utils/style';
import { theme } from 'utils/theme';
import { Hit } from 'utils/word-helpers';

const Container = styled.div`
  margin: 0 auto auto;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.125rem;
  width: 100%;
  max-width: 28rem;

  ${onNotSmall} {
    grid-gap: 0.25rem;

    ${onLandscape} {
      margin-left: 0;
    }
  }
`;

const Button = styled(ButtonWithHover)`
  margin: 0;
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

  &.hit {
    background-color: ${theme.colors.green};
  }

  &.place {
    background-color: ${theme.colors.yellow};
  }

  &.miss {
    background-color: ${theme.colors.gray};
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
  hitsByLetter: { [key: string]: Hit };
  onPress: (l: string) => void;
  onRemove: () => void;
  onSubmit: () => void;
}> = ({ hitsByLetter, onPress, onRemove, onSubmit }) => {
  useEffect(() => {
    const keyPressListener = (e: KeyboardEvent) => {
      e.preventDefault();
      if (LETTERS.includes(e.key)) {
        onPress(e.key);
      } else if (e.key === 'Enter') {
        onSubmit();
      } else if (e.key === 'Backspace') {
        onRemove();
      }
    };
    window.addEventListener('keydown', keyPressListener);
    return () => window.removeEventListener('keydown', keyPressListener);
  }, [onPress, onRemove, onSubmit]);

  return (
    <Container>
      {LETTERS.split('').map((l, i) => (
        <Fragment key={`lttr-${l}`}>
          {i === 2 * 11 && <div />}
          <Button className={hitsByLetter[l]} onClick={() => onPress(l)}>
            {l}
          </Button>
        </Fragment>
      ))}
      <div />
      <BackspaceButton arial-label="Poista merkki" onClick={() => onRemove()} />
      <SubmitButton aria-label="Vahvista" onClick={() => onSubmit()} />
    </Container>
  );
};
