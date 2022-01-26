import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

const StyledDiv = styled.div`
  position: absolute;
  top: 30vh;
  left: 50%;
  margin-left: -8rem;
  width: 16rem;
  background: ${theme.colors.black};
  border: 1px solid ${theme.colors.white};
  padding: 1rem;
  text-align: center;
`;

export const Toast: FC<{ show: boolean }> = ({ show, children }) => (
  <div aria-live="assertive">{show && <StyledDiv>{children}</StyledDiv>}</div>
);
