import styled from 'styled-components';
import React, { FC } from 'react';
import { onLandscape } from '../utils/style';
import { Layout } from './Layout';

const Container = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 2fr;
  grid-gap: 1.5rem;

  ${onLandscape} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const App: FC = () => {
  return (
    <Layout>
      <Container>
        <div>Pelialue</div>
        <div>{'Näppäimistö'}</div>
      </Container>
    </Layout>
  );
};
