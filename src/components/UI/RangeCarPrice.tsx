import { useState, useEffect } from "react";
import { getCarTheme } from "../helpers";
import Gauge from "./Gauge";
import styled from "styled-components";

const StyledAuctionCar = styled.div`
  position: relative;
  width: 100%;
  margin: 0;

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--stripe-height);
    padding: 0 calc(var(--fz) * 2) 0 0;
  }

  .checkbox {
    margin-right: var(--fz);
    cursor: pointer;
  }

  .label {
    display: flex;
    align-items: center;
    flex: 0 0 40%;
    cursor: pointer;
    padding-left: calc(var(--fz) * 2);
  }

  .name {
    @extend %styledText;

    flex-grow: 1;
    text-align: center;
    padding: calc(var(--fz) * 0.5);
  }
`;

interface AuctionCarProps {
  id: string;
  name: string;
  initialValue: number;
  onBidChange: any;
}

export default function AuctionCar({
  id = "",
  name = "",
  initialValue = 0,
  onBidChange,
}: AuctionCarProps) {
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState(initialValue);
  const theme = getCarTheme(id);

  useEffect(() => {
    /* Wait half a second without the user chnging the price before calling onBidChange */
    const timer = setTimeout(() => {
      onBidChange({ price, id });
    }, 500);

    return () => clearTimeout(timer);
  }, [price, id, onBidChange]);

  function handlePriceChange(val: number) {
    setPrice(val);
  }

  function toggleCar() {
    setPrice(checked ? 0 : 1);
    setChecked(!checked);
  }

  return (
    <StyledAuctionCar
      key={name}
      className={`${checked && "is-active"} ${theme}`}
    >
      <div className="wrapper">
        <label className="label">
          <input type="checkbox" onChange={toggleCar} className="radio" />
          <div className="name">{name}</div>
        </label>

        <Gauge
          value={price}
          min={1}
          max={6}
          step={1}
          disabled={!checked}
          callback={handlePriceChange}
        />
      </div>
    </StyledAuctionCar>
  );
}
