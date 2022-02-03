// Helpers for storage functions to do nothing if they fail

export const checkForStorage = () => {
  if (typeof localStorage === 'undefined') {
    return false;
  }
  try {
    localStorage.setItem('test', 'test');
    const item = localStorage.getItem('test');
    if (item !== 'test') {
      return false;
    }
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

export const storeData = (key: string, data: string) => {
  try {
    localStorage.setItem(key, data);
  } catch (e) {
    // no-op
  }
};

export const getDataFromStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const removeDataFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // no-op
  }
};
