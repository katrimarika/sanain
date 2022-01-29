import * as Dialog from '@radix-ui/react-dialog';
import CrossIcon from 'icons/cross.svg';
import PlusIcon from 'icons/plus.svg';
import RefreshIcon from 'icons/refresh.svg';
import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { StatisticsView } from 'ui/StatisticsView';
import { ButtonWithHover } from 'utils/style';
import { theme } from 'utils/theme';
import { Statistics } from 'utils/word-to-guess';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Overlay = styled(Dialog.Overlay)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.black};
  opacity: 0.67;
`;

const Content = styled(Dialog.Content)`
  position: relative;
  background: ${theme.colors.black};
  border: 1px solid ${theme.colors.white};
  padding: 1rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  width: 100%;
  max-width: 24rem;
  max-height: 100%;
`;

const Title = styled(Dialog.Title)`
  margin: 0 0 1rem;
  padding-right: 3rem;
`;

const Button = styled(ButtonWithHover)`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  align-self: center;
  display: inline-flex;
  padding: 0.25rem 0.5rem 0.25rem 2rem;
  color: ${theme.colors.green};
  background: transparent;
  border: 1px solid ${theme.colors.green};
  font-size: 1.25rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${PlusIcon});
  background-size: 1.5rem;
  background-position: left 0.375rem top 50%;
  background-repeat: no-repeat;
`;

const RefreshButton = styled(Button)`
  background-image: url(${RefreshIcon});
  background-size: 1rem;
  background-position: left 0.5rem top 50%;
`;

const ButtonWithIcon: FC<
  { refreshIcon?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) =>
  props.refreshIcon ? <RefreshButton {...props} /> : <Button {...props} />;

const CloseButton = styled(ButtonWithHover)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  color: ${theme.colors.green};
  background: transparent;
  border: 0;
  font-size: 1rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${CrossIcon});
  background-size: 2rem;
  background-position: left 50% top 50%;
  background-repeat: no-repeat;
`;

const Text = styled.p`
  margin: 0 0 1rem;
`;

const Notice = styled.div`
  font-size: 80%;
  margin: 0 1rem;
  align-self: center;
  text-align: center;
`;

const License = styled(Notice)`
  margin-top: 1rem;
  color: ${theme.colors.gray};
`;

const Link = styled.a`
  text-decoration: underline;

  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const StatisticsDialog: FC<{
  isOpen: boolean;
  close: () => void;
  status: 'win' | 'lose' | 'guess';
  word: string;
  statistics: Statistics;
  newGame: () => void;
}> = ({ isOpen, close, status, word, statistics, newGame }) => (
  <Dialog.Root open={isOpen} onOpenChange={() => close()}>
    <Dialog.Portal>
      <Wrapper>
        <Overlay />
        <Content>
          <Title>
            {status === 'win'
              ? 'Onneksi olkoon!'
              : status === 'lose'
              ? 'Pahus!'
              : 'Tilastot'}
          </Title>
          {status === 'lose' && (
            <Text>{`Oikea vastaus olisi ollut "${word}".`}</Text>
          )}
          <StatisticsView statistics={statistics} />
          <ButtonWithIcon
            refreshIcon={status === 'guess'}
            onClick={() => newGame()}
          >
            Uusi peli
          </ButtonWithIcon>
          {status === 'guess' && (
            <Notice>
              Huom! Keskeneräinen peli merkitään luovutetuksi, jos aloitat uuden
              pelin.
            </Notice>
          )}
          <License>
            Lisenssitiedot{' '}
            <Link
              href="https://github.com/katrimarika/sanain"
              target="_blank"
              rel="noopener noreffer"
            >
              GitHubissa
            </Link>
            .
          </License>
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Content>
      </Wrapper>
    </Dialog.Portal>
  </Dialog.Root>
);
