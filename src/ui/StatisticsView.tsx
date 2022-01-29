import { FC } from 'react';
import styled from 'styled-components';
import { MAX_GUESSES } from 'utils/settings';
import { theme } from 'utils/theme';
import { Statistics } from 'utils/word-to-guess';

const Text = styled.p`
  margin: 0 0 0.75rem;
`;

const Subtitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
`;

const Container = styled.div`
  width: 100%;
  min-height: 10rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  text-align: center;
`;

const BarContainer = styled.div`
  width: 10%;
  margin: 0 0.5rem;
`;

const Bar = styled.div`
  margin: 0.5rem 0;
  width: 100%;
  background-color: ${theme.colors.gray};

  &.latest {
    background-color: ${theme.colors.green};
  }
`;

export const StatisticsView: FC<{
  statistics: Statistics;
  currenWinGuessCount?: number;
}> = ({
  statistics: { totalPlayed, totalWins, totalLosses, winDistribution },
  currenWinGuessCount,
}) => {
  const biggestWinCount =
    Object.values(winDistribution).sort((a, b) => b - a)[0] || 1;

  return (
    <>
      <Text>{`Pelejä aloitettu ${totalPlayed} (voitot ${totalWins}, häviöt ${totalLosses})`}</Text>
      <Subtitle>Voittojen arvausjakauma</Subtitle>
      <Container>
        {[...new Array(MAX_GUESSES)].map((_, i) => (
          <BarContainer key={`distr-${i}`}>
            <div>{winDistribution[i + 1] ?? 0}</div>
            <Bar
              style={{
                height: `${
                  ((winDistribution[i + 1] || 0.01) / biggestWinCount) * 100
                }px`,
              }}
              className={currenWinGuessCount === i + 1 ? 'latest' : undefined}
            />
            <div>{i + 1}</div>
          </BarContainer>
        ))}
      </Container>
    </>
  );
};
