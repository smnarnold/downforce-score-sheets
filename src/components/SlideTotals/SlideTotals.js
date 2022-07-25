import {useState, useEffect} from 'react';
import Slide from '../Slide/Slide';
import './SlideTotals.scss';
import formatMoney from '../../helpers/formatMoney';
import TotalRacingPayouts from '../TotalRacingPayouts/TotalRacingPayouts';
import TotalBettingPayouts from '../TotalBettingPayouts/TotalBettingPayouts';
import TotalAuctionPrices from '../TotalAuctionPrices/TotalAuctionPrices';

export default function SlideTotals({
  type: slideType = "totals",
  racingTitle = "Racing payouts",
  racingDesc = "Racing total",
  bettingTitle = "Betting payouts",
  bettingDesc = "Betting total",
  auctionTitle = "Auction price",
  auctionDesc = "Auction total",
  totalTitle = "Total winning",
  cars = [],
  auctionObj = {},
  finishPosArr = [],
  betsArr = [],
  racingPrizes=[],
  bettingPrizes=[],
  restart
}) {
  
  const [racingTotal, setRacingTotal] = useState(0);
  const [bettingTotal, setBettingTotal] = useState(0);
  const [auctionTotal, setAuctionTotal] = useState(0);

  return (
    <Slide type={slideType}>
      <div className="slide__body">
        <TotalRacingPayouts
          racingTitle={racingTitle}
          racingDesc={racingDesc}
          cars={cars}
          finishPosArr={finishPosArr}
          racingPrizes={racingPrizes}
          auctionObj={auctionObj}
          onRacingTotalChange={(amount) => {
            setRacingTotal(amount);
          }}
        />
        <TotalBettingPayouts
          bettingTitle={bettingTitle}
          bettingDesc={bettingDesc}
          cars={cars}
          finishPosArr={finishPosArr}
          betsArr={betsArr}
          bettingPrizes={bettingPrizes}
          onBettingTotalChange={(amount) => {
            setBettingTotal(amount);
          }}
        />
        <TotalAuctionPrices
          auctionTitle={auctionTitle}
          auctionDesc={auctionDesc}
          cars={cars}
          auctionObj={auctionObj}
          onAuctionTotalChange={(amount) => {
            setAuctionTotal(amount);
          }}
        />
      </div>

      <footer className="total">
        <h3 className="total__label">{totalTitle}</h3>
        <div className="total__money">
          {formatMoney(racingTotal + bettingTotal + auctionTotal)}
        </div>
        <button className="btn" onClick={restart}>
          restart
        </button>
      </footer>
    </Slide>
  );
}