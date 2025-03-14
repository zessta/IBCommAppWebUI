/* eslint-disable @typescript-eslint/no-explicit-any */
export const setItem = ({ key, value }: { key: string; value: any }) => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
