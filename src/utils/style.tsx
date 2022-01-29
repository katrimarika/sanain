import styled from 'styled-components';

export const onLandscape = '@media screen and (orientation: landscape)';
export const onNotSmall = '@media screen and (min-width: 48em)';

export const ButtonWithHover = styled.button`
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.8;
    }
  }
`;
