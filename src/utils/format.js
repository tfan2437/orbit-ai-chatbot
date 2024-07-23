export const generateId = () => {
  const largeNumber = 10000000000;
  const currentTime = Math.floor(Date.now() / 1000);
  const id = (largeNumber - currentTime).toString();
  return id;
};
