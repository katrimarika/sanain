import { css } from 'linaria';
import { FC } from 'react';

const ErrorPage: FC = () => (
  <div
    className={css`
      text-align: center;
    `}
  >
    <h1>Virhe!</h1>
    <p>Tuntematon virhe.</p>
  </div>
);

export default ErrorPage;
