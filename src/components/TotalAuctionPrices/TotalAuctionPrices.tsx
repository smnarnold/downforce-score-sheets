import MoneyTag from "../UI/MoneyTag";
import CarSummary from "../UI/CarSummary";
import "./TotalAuctionPrices.scss";

interface TotalAuctionPricesProps {
  title: string;
  desc: string;
  totalArr: any[];
  total: number;
}

function TotalAuctionPrices({
  title = "",
  desc = "",
  totalArr = [],
  total = 0,
}: TotalAuctionPricesProps) {
  const pfx = "total-auction-prices";
  const summaryArr = totalArr.map((car) => {
    return (
      <CarSummary
        key={car.id}
        id={car.id}
        name={car.name}
        money={car.auction}
        active={car.selected}
      />
    );
  });

  return (
    <div className={pfx}>
      <h3 className={`${pfx}__title`}>{title}</h3>
      <div className={`${pfx}__summary`}>{summaryArr}</div>
      <div className={`${pfx}__total`}>
        <span className={`${pfx}__total__label`}>{desc}</span>
        <MoneyTag amount={total} />
      </div>
    </div>
  );
}

export default TotalAuctionPrices
