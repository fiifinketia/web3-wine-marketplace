export function generateRandomColor() {
  const maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  const randColor = randomNumber.toString(16).padStart(6, '0');
  return randColor.toUpperCase();
}
