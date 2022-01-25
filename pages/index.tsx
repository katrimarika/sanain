import { css } from 'linaria';
import type { NextPage } from 'next';
import { onLandscape } from '../utils/style';

const Home: NextPage = () => {
  return (
    <div
      className={css`
        flex-grow: 1;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3fr 2fr;
        grid-gap: 1.5rem;

        ${onLandscape} {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
        }
      `}
    >
      <div>Pelialue</div>
      <div>{'Näppäimistö'}</div>
    </div>
  );
};

export default Home;
