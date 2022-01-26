import styled from 'styled-components';
import { FC } from 'react';
import { theme } from '../utils/theme';

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
  max-width: 48em;
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const Layout: FC = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Title>Sanain</Title>
      </Header>

      <Main>{children}</Main>
    </Wrapper>
  );
};
