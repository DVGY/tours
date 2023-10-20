type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONArray = JSONValue[];
type JSONObject = { [key: string]: JSONValue };

export const localStorageProxy = {
  setItem: (key: string, value: JSONObject | string): void => {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  getItem: (key: string): string | null => {
    const localStorageItem = localStorage.getItem(key);
    if (!localStorageItem) {
      return localStorageItem;
    }
    return localStorageItem;
  },
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
};
