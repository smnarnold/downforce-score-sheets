export function formatMoney(initialAmount: number) {
  let amount = initialAmount;
  let negativeSign = "";
  if (initialAmount < 0) {
    negativeSign = "-";
    amount = Math.abs(amount);
  }
  return `${negativeSign}$${amount}M`;
}

export function getCarTheme(id: string) {
  return id?.trim().length ? `car-theme car-theme--${id}` : "";
}
