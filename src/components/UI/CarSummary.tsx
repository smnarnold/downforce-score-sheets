import { formatMoney, getCarTheme } from "../helpers";
import styled from "styled-components";

const StyledCarSummary = styled.div`
  position: relative;
  flex: 1 1 33.33%;
  font-size: 0.75em;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.5;
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: var(--strip-height);
    padding: 0.5em 0;
  }

  .price {
    display: block;
    width: 100%;
    text-align: center;
  }

  &:hover {
    &::before {
      opacity: 0.35;
    }

    &.is-active {
      &::before {
        opacity: 1;
      }
    }
  }

  &.is-active {
    &::after {
      display: none;
    }
  }

  &.didnt-finished {
    text-decoration: line-through 0.25em red;
  }
`;

function CarSummary({
  id = "",
  name = "",
  pos = 0,
  finished = false,
  money = 0,
  active = false,
}) {
  const theme = getCarTheme(id);
  const isActive = active ? "is-active" : "";
  const showDidntFinished = pos > 0 && !finished;
  const showPos = finished && pos;

  return (
    <StyledCarSummary
      className={`${theme} ${isActive} ${
        showDidntFinished ? "didnt-finished" : ""
      }`}
    >
      <div className="wrapper">
        {name.trim().length && <div className="name">{showPos && <span className="pos">#{pos} </span>}{name}</div>}
        <div className="money">{formatMoney(money)}</div>
      </div>
    </StyledCarSummary>
  );
}

export default CarSummary;
