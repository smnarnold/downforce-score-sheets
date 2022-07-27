import formatMoney from '../../helpers/formatMoney';
import MoneyTag from '../UI/MoneyTag/MoneyTag';
import './TotalAuctionPrices.scss';

export default function TotalAuctionPrices({
  auctionTitle = "",
  auctionDesc = "",
  cars = [],
  auctionObj = {},
  money = 0,
}) {
  const pfx = "total-auction-prices";
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
          {auctionObj[car.id] && formatMoney(auctionObj[car.id])}
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
        <MoneyTag amount={money} />
      </div>
    </div>
  );
}