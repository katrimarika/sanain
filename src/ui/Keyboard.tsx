import { FC } from 'react';

export const Keyboard: FC<{
  guesses: string[];
  onChange: (s: string) => void;
  onSubmit: (g: string) => void;
}> = ({ guesses, onSubmit, onChange }) => {
  return <div>{'Näppäimistö'}</div>;
};
