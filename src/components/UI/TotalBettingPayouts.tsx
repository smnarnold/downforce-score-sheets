import MoneyTag from './MoneyTag';
import CarSummary from "./CarSummary";

interface TotalRacingPayoutsProps {
  title: string;
  desc: string;
  bettingArr: any[];
  total: number;
}

function TotalBettingPayouts({
  title = "",
  desc = "",
  bettingArr = [],
  total = 0
}: TotalRacingPayoutsProps) {
  const pfx = "total-betting-payouts";
  console.log(bettingArr)

  const summaryArr = bettingArr.map((car) => {
    return (
      <CarSummary
        key={car.id}
        id={car.id}
        name={car.name}
        money={car.amount}
        active={true}
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

export default TotalBettingPayouts;