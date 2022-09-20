import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarTheme } from "../helpers";
import Gauge from "./Gauge";
import styled from "styled-components";
import { auctionObj, updateAuction } from "../Slides/Auction/auctionSlice";
import AppContext from "../../store/app-context";

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
}

export default function AuctionCar({
  id = "",
}: AuctionCarProps) {
  
  const dispatch = useDispatch();
  const appCtx = useContext(AppContext);
  const auction = useSelector(auctionObj);
  const name = appCtx.getTranslation(`car${appCtx.theme}[${id}]`);
  const [price, setPrice] = useState(auction[id]);
  const theme = getCarTheme(id);

  useEffect(() => {
    setPrice(auction[id]);
  }, [auction, id]);

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

  function toggleCar(e:React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.checked ? 1 : 0;
    handlePriceChange(val);
  }

  return (
    <StyledAuctionCar
      key={name}
      className={`${price > 0 && "is-active"} ${theme}`}
    >
      <div className="wrapper">
        <label className="label">
          <input type="checkbox" onChange={(e) => toggleCar(e)} className="radio" checked={price > 0} />
          <div className="name">{name}</div>
        </label>

        <Gauge
          value={price}
          min={1}
          max={6}
          step={1}
          disabled={price === 0}
          callback={handlePriceChange}
        />
      </div>
    </StyledAuctionCar>
  );
}
