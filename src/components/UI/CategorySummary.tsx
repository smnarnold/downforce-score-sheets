import { ReactElement, useState, useEffect } from "react";
import CarSummary from "./CarSummary";
import MoneyTag from "./MoneyTag";
import styled from "styled-components";

const StyledCategorySummary = styled.div`
  position: relative;
  width: 100%;

  .title {
    @extend %styledText;

    padding: 0.25em var(--spacer);
    margin: 0;
  }

  .table {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.75em;
    font-style: italic;
    text-transform: uppercase;
    padding: 0.25em var(--spacer);
  }
`;

interface CategorySummaryProps {
  title: string;
  desc: string;
  categoryArr: any[];
  total: number;
}

function CategorySummary({
  title = "",
  desc = "",
  categoryArr = [],
  total = 0,
}: CategorySummaryProps) {
  const [summaryArr, setSummaryArr] = useState<ReactElement[]>([]);

  useEffect(() => {
    const arr: ReactElement[] = categoryArr.map((car) => {
      return (
        <CarSummary
          key={car.key}
          id={car.id}
          name={car.name}
          pos={car.pos}
          finished={car.finished}
          money={car.amount}
          active={car.active}
        />
      );
    });

    setSummaryArr(arr);
  }, [categoryArr]);

  return (
    <StyledCategorySummary>
      <h3 className="title">{title}</h3>
      <div className="table">{summaryArr}</div>
      <div className="footer">
        <span className="desc">{desc}</span>
        <MoneyTag amount={total} />
      </div>
    </StyledCategorySummary>
  );
}

export default CategorySummary;
