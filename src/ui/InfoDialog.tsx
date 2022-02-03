import ReloadIcon from 'icons/reload.svg';
import ResetIcon from 'icons/reset.svg';
import { FC } from 'react';
import styled from 'styled-components';
import { ButtonWithHover } from 'utils/style';
import { theme } from 'utils/theme';
import { Dialog } from './Dialog';

const Text = styled.p`
  margin: 0 0 1rem;
  font-size: 1rem;
`;

const Hit = styled.span`
  color: ${theme.colors.highlight};
`;

const Place = styled.span`
  color: ${theme.colors.secondaryHighlight};
`;

const Dim = styled.span`
  color: ${theme.colors.gray};
`;

const ReloadButton = styled(ButtonWithHover)`
  margin-top: 1rem;
  display: inline-flex;
  padding: 0.25rem 0.125rem 0.25rem 1.25rem;
  color: ${theme.colors.highlight};
  background: transparent;
  border: none;
  font-size: 1rem;
  font-family: ${theme.fontFamily.body};
  background-image: url(${ReloadIcon});
  background-size: 1rem;
  background-position: left 0 top 50%;
  background-repeat: no-repeat;
`;

const ResetButton = styled(ReloadButton)`
  background-image: url(${ResetIcon});
  margin-left: 1.5rem;
`;

const License = styled.div`
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

export const InfoDialog: FC<{
  isOpen: boolean;
  close: () => void;
  resetStatistics: () => void;
}> = ({ resetStatistics, ...rest }) => {
  return (
    <Dialog title="Info" {...rest}>
      <Text>
        Pelin tavoitteena on keksiä valittu viisikirjaiminen suomenkielinen
        sana. Yrityksiä on kuusi ja kirjaimia voi syöttää ruudulla olevilla
        kirjainpainikkeilla tai fyysisellä näppäimistöllä.
      </Text>
      <Text>
        <Hit>Sinisellä</Hit> merkitty kirjain on oikealla paikalla.{' '}
        <Place>Oranssilla</Place> merkitty kirjain löytyy sanasta, mutta eri
        kohdasta. <Dim>Harmaalla</Dim> merkitty kirjain ei löydy sanasta
        ollenkaan.
      </Text>
      <div>
        <ReloadButton onClick={() => window.location.reload()}>
          Päivitä sivu
        </ReloadButton>
        <ResetButton onClick={resetStatistics}>Nollaa tilastot</ResetButton>
      </div>
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
    </Dialog>
  );
};
