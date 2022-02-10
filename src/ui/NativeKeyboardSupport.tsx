import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { WORD_LENGTH } from 'utils/settings';

const Form = styled.form`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-height: 100%;
  height: 100vh;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  border: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  word-wrap: normal;
`;

export const NativeKeyboardSupport: FC<{
  active: boolean;
  currentGuess: string;
  onChange: (l: string) => void;
  onSubmit: () => void;
}> = ({ active, currentGuess, onChange, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  return (
    <Form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <Input
        ref={inputRef}
        type="text"
        value={currentGuess}
        onChange={(e) => onChange(e.target.value)}
        maxLength={WORD_LENGTH}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
      />
    </Form>
  );
};
