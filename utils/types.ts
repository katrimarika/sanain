export type LoginData = string;

export type RemoteData<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; errorCode?: number; errorStr?: string };
