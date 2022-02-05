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
  grid-gap: 0.25rem;
  width: 100%;
  max-width: 28rem;

  ${onLandscape} {
    padding-right: 1.25rem;

    ${onNotSmall} {
      margin-left: 0;
    }
  }
`;

const Button = styled(ButtonWithHover)`
  margin: 0;
  font-size: 1.25rem;
  padding: 0.75rem 0.125rem;
  font-family: ${theme.fontFamily.body};
  text-transform: uppercase;
  color: ${theme.colors.black};
  background: ${theme.colors.white};
  border: 0;
  border-radius: 0.125rem;
  user-select: none;

  ${onNotSmall} {
    padding: 0.75rem 0.25rem;
    font-size: 1.5rem;
    border-radius: 0.25rem;
    min-width: 2rem;
  }

  &.hit {
    background-color: ${theme.colors.highlight};
  }

  &.place {
    background-color: ${theme.colors.secondaryHighlight};
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
  grid-column: 10 / 12;
`;

export const Keyboard: FC<{
  captureKeyPresses: boolean;
  hitsByLetter: { [key: string]: Hit };
  onPress: (l: string) => void;
  onRemove: () => void;
  onSubmit: () => void;
}> = ({ captureKeyPresses, hitsByLetter, onPress, onRemove, onSubmit }) => {
  useEffect(() => {
    if (captureKeyPresses) {
      const keyPressListener = (e: KeyboardEvent) => {
        if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
          return;
        }
        if (LETTERS.includes(e.key)) {
          onPress(e.key);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          onRemove();
        }
      };
      window.addEventListener('keydown', keyPressListener);
      return () => window.removeEventListener('keydown', keyPressListener);
    }
  }, [captureKeyPresses, onPress, onRemove, onSubmit]);

  return (
    <Container>
      {LETTERS.split('').map((l, i) => (
        <Fragment key={`lttr-${l}`}>
          {i === 21 && <div />}
          <Button className={hitsByLetter[l]} onClick={() => onPress(l)}>
            {l}
          </Button>
          {i === 9 && (
            <BackspaceButton
              arial-label="Poista merkki"
              onClick={() => onRemove()}
            />
          )}
        </Fragment>
      ))}
      <SubmitButton aria-label="Vahvista" onClick={() => onSubmit()} />
    </Container>
  );
};
