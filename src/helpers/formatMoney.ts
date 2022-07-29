export default function formatMoney(initialAmount: number) {
  let amount = initialAmount;
  let negativeSign = "";
  if (initialAmount < 0) {
    negativeSign = "-";
    amount = Math.abs(amount);
  }
  return `$${negativeSign}${amount}M`;
}
