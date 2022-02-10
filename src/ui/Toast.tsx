import { FC } from 'react';
import styled from 'styled-components';
import { onLandscape } from 'utils/style';
import { theme } from 'utils/theme';

const Container = styled.div`
  position: fixed;
  top: 30vh;
  left: 50%;
  margin-left: -8rem;
  width: 16rem;

  ${onLandscape} {
    position: relative;
    top: unset;
    left: unset;
    margin: 0 auto;
    min-height: 4rem;
  }
`;

const Content = styled.div`
  background: ${theme.colors.gray};
  color: ${theme.colors.black};
  padding: 0.75rem 1rem;
  text-align: center;
`;

export const Toast: FC<{ show: boolean }> = ({ show, children }) => (
  <Container aria-live="assertive">
    {show && <Content>{children}</Content>}
  </Container>
);
