import { formatMoney, getCarTheme } from "../helpers";
import styled from "styled-components";
import { useContext } from "react";
import AppContext from "../../store/app-context";

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

  .pos {
    display: inline-block;
    margin-right: 0.5em;
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

  &.abandoned {
    text-decoration: line-through 0.25em red;
  }
`;

interface ICarSummary {
  car: string,
  status?: null|string,
  pos?: null|number,
  money?: number
}

function CarSummary({
  pos,
  car,
  status,
  money = 0,
}: ICarSummary) {
  const appCtx = useContext(AppContext);
  const position = pos ? appCtx.getTranslation(`position${pos}`) : null;
  const name = appCtx.getTranslation(`car${appCtx.theme}[${car}]`);
  const theme = getCarTheme(car);
  
  return (
    <StyledCarSummary
      className={`${theme} ${status !== null && status}`}
    >
      <div className="wrapper">
        {name && <div className="title">
          {position && <span className="pos">{position}</span>}
          <span className="name">{name}</span>
        </div>}
        <div className="money">{formatMoney(money)}</div>
      </div>
    </StyledCarSummary>
  );
}

export default CarSummary;
