export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://www.bricn.net'
    : 'http://localhost:3000';
};
