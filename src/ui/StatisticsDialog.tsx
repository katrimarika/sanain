import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import RefreshIcon from '../icons/refresh.svg';
import PlusIcon from '../icons/plus.svg';
import CrossIcon from '../icons/cross.svg';
import { theme } from '../utils/theme';
import * as Dialog from '@radix-ui/react-dialog';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Content = styled(Dialog.Content)`
  position: relative;
  background: ${theme.colors.black};
  border: 1px solid ${theme.colors.white};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled(Dialog.Title)`
  margin: 0 0 1rem;
`;

const ButtonWithIcon: FC<
  { icon: string } & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => <button {...props} />;

const Button = styled(ButtonWithIcon)`
  margin-top: 2rem;
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

  &:active {
    opacity: 0.8;
  }

  @media (hover: hover) {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const CloseButton = styled(Dialog.Trigger)`
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

  &:active {
    opacity: 0.8;
  }

  @media (hover: hover) {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Notice = styled.div`
  font-size: 80%;
  margin-top: 0.5rem;
  align-self: center;
  text-align: center;
`;

export const StatisticsDialog: FC<{
  isOpen: boolean;
  setOpen: (o: boolean) => void;
  status: 'win' | 'lose' | 'guess';
  newGame: () => void;
}> = ({ isOpen, setOpen, status, newGame }) => (
  <Dialog.Root open={isOpen} onOpenChange={setOpen}>
    <Dialog.Portal>
      <Wrapper>
        <Content>
          <Title>
            {status === 'win'
              ? 'Onneksi olkoon!'
              : status === 'lose'
              ? 'Pahus!'
              : 'Tilastot'}
          </Title>
          <div>TBD</div>
          <Button
            icon={status === 'guess' ? RefreshIcon : PlusIcon}
            onClick={newGame}
          >
            Uusi peli
          </Button>
          {status === 'guess' && (
            <Notice>
              Huom! Keskeneräinen peli merkitään luovutetuksi, jos aloitat uuden
              pelin.
            </Notice>
          )}
          <CloseButton />
        </Content>
      </Wrapper>
    </Dialog.Portal>
  </Dialog.Root>
);
