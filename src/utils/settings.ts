import { useState } from 'react';
import { getDataFromStorage, storeData } from 'utils/storage';

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;

export const LETTERS = 'qwertyuiopasdfghjklöäzxcvbnm';

type Settings = {
  onlyNativeKeyboard: boolean;
};
type SettingActions = {
  setOnlyNativeKeyboard: (o: boolean) => void;
};
export type SettingsState = Settings & SettingActions;

const settingsStorageKey = 'sanain-settings';
const getSettings = (): Settings => {
  const stored = getDataFromStorage(settingsStorageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === 'object') {
        const { onlyNativeKeyboard } = parsed;
        return {
          onlyNativeKeyboard: !!onlyNativeKeyboard,
        };
      }
    } catch {
      // no-op
    }
  }
  return {
    onlyNativeKeyboard: false,
  };
};
const storeSettings = (s: Settings) => {
  storeData(settingsStorageKey, JSON.stringify(s));
};

export const useSettings = (): SettingsState => {
  const [settings, setSettings] = useState(getSettings());

  return {
    ...settings,
    setOnlyNativeKeyboard: setNativeKeyboard,
  };

  function setNativeKeyboard(only: boolean) {
    const newSettings = {
      ...settings,
      onlyNativeKeyboard: only,
    };
    setSettings(newSettings);
    storeSettings(newSettings);
  }
};
