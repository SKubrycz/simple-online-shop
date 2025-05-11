export function getPartialSum(
  main: number,
  fractional: number,
  amount: number
) {
  const fractionalDivided = fractional / 100;
  let sum = main * amount + fractionalDivided * amount;
  return sum;
}
