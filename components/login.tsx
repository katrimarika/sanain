import { css } from 'linaria';
import { FC, useState } from 'react';
import { theme } from '../utils/theme';

const Login: FC<{ onSubmit: (s: string) => void; error?: string }> = ({
  onSubmit,
  error,
}) => {
  const [password, setPassword] = useState('');
  const fieldId = 'login-password';

  // TODO: store pass and check store on load

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password) {
          onSubmit(password);
        }
      }}
      className={css`
        width: 100%;
        max-width: 25rem;
        margin: 0 auto;
      `}
    >
      <h2
        className={css`
          font-weight: bold;
          font-size: 1.5rem;
        `}
      >
        Kirjaudu sisään
      </h2>
      <label
        htmlFor={fieldId}
        className={css`
          display: block;
          margin-bottom: 0.5rem;
        `}
      >
        Salasana
      </label>
      <input
        id={fieldId}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className={css`
          display: block;
          padding: 0.75rem;
          font-size: 1.125rem;
          font-family: ${theme.fontFamily.body};
          border: 2px solid ${theme.colors.white};
          color: ${theme.colors.white};
          background: ${theme.colors.black};
          border-radius: 0.125rem;
          width: 100%;
          margin-bottom: 1rem;

          @media (hover: hover) {
            &:hover {
              border-color: ${theme.colors.green};
            }
          }
          &:focus {
            outline: none;
            border-color: ${theme.colors.green};
            box-shadow: inset 0px 0px 0px 2px ${theme.colors.green};
          }
        `}
      />
      {!!error && (
        <p
          className={css`
            color: ${theme.colors.red};
            margin: 0 0 0.75rem;
          `}
        >
          {`Virhe: "${error}"`}
        </p>
      )}
      <button
        type="submit"
        className={css`
          cursor: pointer;
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 3rem;
          color: ${theme.colors.black};
          background: ${theme.colors.white};
          box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 2px;
          border: none;
          font-size: 1.125rem;
          line-height: 1.5rem;
          font-family: ${theme.fontFamily.body};

          @media (hover: hover) {
            &:hover {
              opacity: 0.8;
            }
          }
          &:active {
            opacity: 0.8;
          }
        `}
      >
        Kirjaudu
      </button>
    </form>
  );
};

export default Login;
