export default function formatMoney(initialAmount) {
  if (typeof initialAmount == "number") {
    let amount = initialAmount;
    let negativeSign = "";
    if (initialAmount < 0) {
      negativeSign = "-";
      amount = Math.abs(amount);
    }
    return `$${negativeSign}${amount}M`;
  } else {
    console.warn(
      `formatMoney was expecting a number, but received a ${typeof initialAmount}: ${initialAmount}`
    );
    return "";
  }
}