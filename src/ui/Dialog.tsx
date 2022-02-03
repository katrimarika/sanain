import * as RadixDialog from '@radix-ui/react-dialog';
import CrossIcon from 'icons/cross.svg';
import { FC } from 'react';
import styled from 'styled-components';
import { ButtonWithHover } from 'utils/style';
import { theme } from 'utils/theme';

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

const Overlay = styled(RadixDialog.Overlay)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.black};
  opacity: 0.67;
`;

const Content = styled(RadixDialog.Content)`
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

const Title = styled(RadixDialog.Title)`
  margin: 0 0 1rem;
  padding-right: 3rem;
`;

const CloseButton = styled(ButtonWithHover)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: 0;
  font-size: 1rem;
  background-image: url(${CrossIcon});
  background-size: 2rem;
  background-position: left 50% top 50%;
  background-repeat: no-repeat;
`;

export const Dialog: FC<{
  isOpen: boolean;
  close: () => void;
  title: string;
}> = ({ isOpen, close, title, children }) => (
  <RadixDialog.Root open={isOpen} onOpenChange={() => close()}>
    <RadixDialog.Portal>
      <Wrapper>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          {children}
          <RadixDialog.Close asChild>
            <CloseButton />
          </RadixDialog.Close>
        </Content>
      </Wrapper>
    </RadixDialog.Portal>
  </RadixDialog.Root>
);
