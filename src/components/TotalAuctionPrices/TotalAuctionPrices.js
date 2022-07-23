import React from 'react';
import './TotalAuctionPrices.scss';
import formatMoney from '../../helpers/formatMoney';

export default function TotalAuctionPrices({
  auctionTitle = "",
  auctionDesc = "",
  cars = [],
  auctionObj = {},
  onAuctionTotalChange
}) {
  const pfx = "total-auction-prices";
  const auctionArr = Object.values(auctionObj);
  const auctionTotal =
    auctionArr.reduce((total, price) => total + price, 0) * -1;

  onAuctionTotalChange(auctionTotal);

  const summaryArr = cars.map((car) => {
    const hasBidOn = auctionObj.hasOwnProperty(car.id);

    return (
      <div
        key={car.id}
        className={`${pfx}__item ${
          hasBidOn ? pfx + "__item--checked" : ""
        } car-theme-${car.id}`}
      >
        {car.name}
        <span className={`${pfx}__item__price`}>
          {formatMoney(auctionObj[car.id])}
        </span>
      </div>
    );
  });

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{auctionTitle}</h3>
      <div className={`${pfx}__summary`}>{summaryArr}</div>
      <div className={`${pfx}__total`}>
        <span className={`${pfx}__total__label`}>{auctionDesc}</span>
        <strong className={`${pfx}__total__price`}>
          {formatMoney(auctionTotal)}
        </strong>
      </div>
    </div>
  );
}