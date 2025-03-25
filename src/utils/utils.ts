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


export function getInitials(name:string) {
  if (!name) return "";
  
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}