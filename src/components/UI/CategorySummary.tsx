import { ReactElement } from "react";
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
  title?: string;
  label?: string;
  details?: (null|ReactElement)[];
  total?: number;
}

function CategorySummary({
  title,
  label,
  details = [],
  total = 0,
}: CategorySummaryProps) {

  return (
    <StyledCategorySummary>
      <h3 className="title">{title}</h3>
      <div className="table">{details}</div>
      <div className="footer">
        <span className="label">{label}</span>
        <MoneyTag amount={total} />
      </div>
    </StyledCategorySummary>
  );
}

export default CategorySummary;
