import React from 'react';
import './TotalBettingPayouts.scss';
import formatMoney from '../../helpers/formatMoney';

export default function TotalBettingPayouts({
  bettingTitle = "",
  bettingDesc = "",
  cars = [],
  finishPosArr = [],
  bettingPrizes = [],
  betsArr = [],
  onBettingTotalChange
}) {
  const pfx = "total-betting-payouts";
  const podiumArr = finishPosArr.slice(0, 3);
  let totalPrice = 0;

  const summaryArr = betsArr.map((color, index) => {
    let car, theme;
    let name = "";
    let value = 0;

    if (color !== "") {
      car = cars.filter((car) => car.id === color)[0];
      theme = `car-theme-${car.id}`;
      name = car.name;
      value = 0;
      let posIndex = podiumArr.indexOf(color);

      if (posIndex !== -1) {
        value = bettingPrizes[index][posIndex].value;
      }
    }

    totalPrice += value;

    return (
      <div className={`${pfx}__item ${pfx}__item--checked ${theme}`}>
        <div className={`${pfx}__item__name`}>{name}</div>
        <div className={`${pfx}__item__name`}>{formatMoney(value)}</div>
      </div>
    );
  });

  onBettingTotalChange(totalPrice);

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{bettingTitle}</h3>
      <div className={`${pfx}__summary`}>{summaryArr}</div>
      <div className={`${pfx}__total`}>
        <span className={`${pfx}__total__label`}>{bettingDesc}</span>
        <strong className={`${pfx}__total__price`}>
          {formatMoney(totalPrice)}
        </strong>
      </div>
    </div>
  );
}