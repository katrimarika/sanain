import { css } from 'linaria';
import { FC } from 'react';

const NotFoundPage: FC = () => (
  <div
    className={css`
      text-align: center;
    `}
  >
    <h1>404</h1>
    <p>Sivua ei löytynyt.</p>
  </div>
);

export default NotFoundPage;
