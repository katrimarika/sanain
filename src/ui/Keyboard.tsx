import React, { FC } from 'react';
import styled from 'styled-components';
import { onLandscape, onNotSmall } from '../utils/style';

const letters = 'qwertyuiopåasdfghjklöäzxcvbnm';

const Container = styled.div`
  margin: 0 auto;
  max-height: 30rem;

  ${onNotSmall} {
    ${onLandscape} {
      margin-left: 0;
    }
  }
`;

const Button = styled.button`
  /* TODO */
`;

export const Keyboard: FC<{
  guesses: string[];
  onPress: (l: string) => void;
  onRemove: () => void;
  onSubmit: (g: string) => void;
}> = ({ guesses, onPress, onRemove, onSubmit }) => {
  // TODO: enter & backspace
  return (
    <Container>
      {letters.split('').map((l) => (
        <Button key={`lttr-${l}`} onClick={() => onPress(l)}>
          {l}
        </Button>
      ))}
    </Container>
  );
};
