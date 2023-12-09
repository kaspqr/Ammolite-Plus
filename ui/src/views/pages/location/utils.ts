export const generateNumericId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000);
  const numericId = parseInt(`${timestamp}${randomNum}`);
  return numericId;
};
