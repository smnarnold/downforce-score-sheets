import CarSummary from "./CarSummary";
import MoneyTag from "./MoneyTag";

interface TotalRacingPayoutsProps {
  title: string;
  desc: string;
  totalArr: any[];
  total: number;
}

function TotalRacingPayouts({
  title = "",
  desc = "",
  totalArr = [],
  total = 0,
}: TotalRacingPayoutsProps) {
  const pfx = "total-racing-payouts";
  let sortedArr = [...totalArr]

  const summaryArr = sortedArr.sort((a,b) => a.pos - b.pos).map((car) => {
    return (
      <CarSummary
        key={car.id}
        id={car.id}
        name={car.name}
        money={car.racing}
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

export default TotalRacingPayouts;
