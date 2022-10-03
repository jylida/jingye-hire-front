const NumOnly_REG = /^\d+$/;

const checkIDValid = (input) => {
  const isNumber =
    NumOnly_REG.test(input) ||
    (NumOnly_REG.test(input.slice(0, -1)) && input.slice(-1) === "x");
  const isLengthRight = input.length === 18 || input.length === 15;
  const inputToNum = input
    .split("")
    .map((c) => (c === "x" ? "10" : c))
    .map((c) => parseInt(c));
  const weightSum = inputToNum.reduce(
    (previousValue, currentValue, currentIndex) =>
      previousValue + currentValue * (2 ** (18 - currentIndex - 1) % 11),
    0
  );
  const isValid = input.length === 18 && weightSum % 11 === 1;
  return isNumber && isLengthRight && isValid;
};
export default checkIDValid;
