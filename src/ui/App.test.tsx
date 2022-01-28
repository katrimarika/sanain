import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from 'ui/App';

test('renders learn react link', () => {
  render(<App />);
  const textElement = screen.getByText(/sanain/i);
  expect(textElement).toBeInTheDocument();
});
