import * as Dialog from '@radix-ui/react-dialog';
import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import CrossIcon from '../icons/cross.svg';
import PlusIcon from '../icons/plus.svg';
import RefreshIcon from '../icons/refresh.svg';
import { ButtonWithHover } from '../utils/style';
import { theme } from '../utils/theme';
import { Statistics } from '../utils/word-to-guess';
import { StatisticsView } from './StatisticsView';

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

const ButtonWithIcon: FC<
  { icon: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => <ButtonWithHover {...props} />;

const Button = styled(ButtonWithIcon)`
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
  background-image: url(${(props) => props.icon});
  background-size: 1rem;
  background-position: left 0.5rem top 50%;
  background-repeat: no-repeat;
`;

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

const Notice = styled.div`
  font-size: 80%;
  margin: 0 1rem;
  align-self: center;
  text-align: center;
`;

export const StatisticsDialog: FC<{
  isOpen: boolean;
  close: () => void;
  status: 'win' | 'lose' | 'guess';
  statistics: Statistics;
  newGame: () => void;
}> = ({ isOpen, close, status, statistics, newGame }) => (
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
          <StatisticsView statistics={statistics} />
          <Button
            icon={status === 'guess' ? RefreshIcon : PlusIcon}
            onClick={() => {
              newGame();
              close();
            }}
          >
            Uusi peli
          </Button>
          {status === 'guess' && (
            <Notice>
              Huom! Keskeneräinen peli merkitään luovutetuksi, jos aloitat uuden
              pelin.
            </Notice>
          )}
          <Dialog.Close asChild>
            <CloseButton />
          </Dialog.Close>
        </Content>
      </Wrapper>
    </Dialog.Portal>
  </Dialog.Root>
);
