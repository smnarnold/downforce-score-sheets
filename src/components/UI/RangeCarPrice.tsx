import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { getCarTheme } from "../helpers";
import Gauge from "./Gauge";
import styled from "styled-components";
import { updateAuction } from "../Slides/Auction/auctionSlice";
import LangContext from "../../store/i18n-context";

const StyledAuctionCar = styled.div`
  flex: 1 1 auto;  
  position: relative;
  width: 100%;
  margin: 0;

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: var(--stripe-height);
    padding: 0 var(--spacer) 0 0;
  }

  .checkbox {
    margin-right: var(--spacer);
    cursor: pointer;
  }

  .label {
    display: flex;
    align-items: center;
    flex: 0 0 40%;
    cursor: pointer;
    padding-left: var(--spacer);
  }

  .name {
    @extend %styledText;

    flex-grow: 1;
    text-align: center;
    padding: 0 var(--spacer);
  }
`;

interface AuctionCarProps {
  id: string;
  initialValue?: number;
}

export default function AuctionCar({
  id = "",
  initialValue = 0,
}: AuctionCarProps) {
  const dispatch = useDispatch();
  const langCtx = useContext(LangContext);
  const name = langCtx.get(`carRegular[${id}]`);
  const [checked, setChecked] = useState(false);
  const [price, setPrice] = useState(initialValue);
  const theme = getCarTheme(id);

  useEffect(() => {
    /* Wait that the user stop changing the price before calling onBidChange */
    const timer = setTimeout(() => {
      dispatch( updateAuction({car: id, price}) );
    }, 500);

    return () => clearTimeout(timer);
  }, [price, id]);

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
