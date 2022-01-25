import { css } from 'linaria';
import { FC } from 'react';
import { theme } from '../utils/theme';

const Layout: FC = ({ children }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      `}
    >
      <header
        className={css`
          padding: 0.75rem 1.5rem;
          border-bottom: 2px solid ${theme.colors.green};
          display: flex;
          justify-content: space-between;
        `}
      >
        <h1
          className={css`
            font-weight: bold;
            font-size: 1.25rem;
            margin: 0;
          `}
        >
          Sanain
        </h1>
      </header>

      <main
        className={css`
          margin: 0 auto;
          flex-grow: 1;
          width: 100%;
          max-width: 48em;
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
