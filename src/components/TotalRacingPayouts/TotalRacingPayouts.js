import './TotalRacingPayouts.scss';
import formatMoney from '../../helpers/formatMoney';
import MoneyTag from '../UI/MoneyTag';

export default function TotalRacingPayouts({
  racingTitle = "",
  racingDesc = "",
  cars = [],
  finishPosArr = [],
  racingPrizes = [],
  auctionObj = {},
  onRacingTotalChange
}) {
  const pfx = "total-racing-payouts";
  const carsSelectedArr = Object.keys(auctionObj);
  let gain = 0;

  const summaryArr = finishPosArr.map((color, index) => {
    let name = "",
      theme = "",
      checked = "";
    let prize = racingPrizes[index];

    if (color !== "") {
      const car = cars.filter((car) => car.id === color)[0];
      theme = `car-theme-${car.id}`;
      name = car.name;

      if (carsSelectedArr.includes(car.id)) {
        checked = `${pfx}__item--checked`;
        gain += prize.value;
      }
    }

    return (
      <div key={color} className={`${pfx}__item ${theme} ${checked}`}>
        <div className={`${pfx}__item__name`}>{name}</div>
        <div className={`${pfx}__item__pos`}>{prize.label}</div>
        <div className={`${pfx}__item__price`}>{formatMoney(prize.value)}</div>
      </div>
    );
  });

  onRacingTotalChange(gain);

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{racingTitle}</h3>
      <div className={`${pfx}__summary`}>{summaryArr}</div>
      <div className={`${pfx}__total`}>
        <span className={`${pfx}__total__label`}>{racingDesc}</span>
        <MoneyTag amount={gain} />
      </div>
    </div>
  );
}