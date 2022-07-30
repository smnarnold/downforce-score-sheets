import formatMoney from "../../helpers/formatMoney";
import styled from "styled-components";

const StyledCarSummary = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: var(--strip-height);
  font-size: 0.6em;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.33;
  padding: 0.5em 0;

  .price {
    display: block;
    width: 100%;
    text-align: center;
  }

  &.is-active {
    opacity: 1;
  }
`;

function CarSummary({ id = "", name = "", money = null, active = false }) {
  const theme = id.trim().length ? `car-theme-${id}` : "";

  return (
    <StyledCarSummary className={`${theme} ${active ? "is-active" : ""}`}>
      {name.trim().length && <div className="name">{name}</div>}
      {money && <div className="money">{formatMoney(money)}</div>}
    </StyledCarSummary>
  );
}

export default CarSummary;
