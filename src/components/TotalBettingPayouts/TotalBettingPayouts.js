import './TotalBettingPayouts.scss';
import formatMoney from '../../helpers/formatMoney';
import MoneyTag from '../UI/MoneyTag';

export default function TotalBettingPayouts({
  bettingTitle = "",
  bettingDesc = "",
  cars = [],
  bettingArr = [],
  total = 0
}) {
  const pfx = "total-betting-payouts";

  const summaryArr = bettingArr.map((bet, index) => {
    let car, theme;
    let name = "";
    let value = 0;

    if (bet.color !== "") {
      car = cars.filter((car) => car.id === bet.color)[0];
      theme = `car-theme-${car.id}`;
      name = car.name;
      value = bet.amount;
    }

    return (
      <div key={`bet-${index}`} className={`${pfx}__item ${pfx}__item--checked ${theme}`}>
        <div className={`${pfx}__item__name`}>{name}</div>
        <div className={`${pfx}__item__name`}>{formatMoney(value)}</div>
      </div>
    );
  });

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{bettingTitle}</h3>
      <div className={`${pfx}__summary`}>{summaryArr}</div>
      <div className={`${pfx}__total`}>
        <span className={`${pfx}__total__label`}>{bettingDesc}</span>
        <MoneyTag amount={total} />
      </div>
    </div>
  );
}