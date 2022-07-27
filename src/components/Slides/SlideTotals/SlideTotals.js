import {useState} from 'react';
import Slide from '../Slide/Slide';
import './SlideTotals.scss';
import formatMoney from '../../../helpers/formatMoney';
import TotalRacingPayouts from '../../TotalRacingPayouts/TotalRacingPayouts';
import TotalBettingPayouts from '../../TotalBettingPayouts/TotalBettingPayouts';
import TotalAuctionPrices from '../../TotalAuctionPrices/TotalAuctionPrices';

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

  const podiumArr = finishPosArr.slice(0, 3);
  const auctionArr = Object.values(auctionObj);
  const auctionTotal =
    auctionArr.reduce((total, price) => total + price, 0) * -1;

  const bettingArr = getBettingFormattedArr();
  console.log(bettingArr);
  const bettingTotal = bettingArr.map((bet) => bet.amount).reduce((total, amount) => total + amount, 0);

  function getBettingFormattedArr() {
    let bettingArr = [];
      
    betsArr.forEach((color, index) => {
      let amount = 0;
      let posIndex = podiumArr.indexOf(color);

      if (posIndex !== -1) {
        amount += bettingPrizes[index][posIndex].value;
      }

      bettingArr.push({
        color: color,
        amount: amount
      });
    });
    return bettingArr;
  }

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
          bettingArr={bettingArr}
          total={bettingTotal}
        />
        <TotalAuctionPrices
          auctionTitle={auctionTitle}
          auctionDesc={auctionDesc}
          cars={cars}
          auctionObj={auctionObj}
          money={auctionTotal}
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