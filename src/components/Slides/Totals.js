import {useState, useEffect} from 'react';
import Slide from '../UI/Slide';
import MoneyTag from '../UI/MoneyTag';
import TotalRacingPayouts from '../UI/TotalRacingPayouts';
import TotalBettingPayouts from '../UI/TotalBettingPayouts';
import TotalAuctionPrices from '../TotalAuctionPrices/TotalAuctionPrices';
import Btn from '../UI/Btn';

export default function SlideTotals({
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
  const [auctionTotal, setAuctionTotal] = useState(0);
  const [bettingTotal, setBettingTotal] = useState(0);
  const [podiumArr, setPodiumArr] = useState([]);
  const [bettingArr, setBettingArr] = useState([]);
  const [totalArr, setTotalArr] = useState([]);

  useEffect(() => {
    setPodiumArr(finishPosArr.slice(0, 3))
  }, [finishPosArr]);

  useEffect(() => {
    const b = betsArr.map((id, betRound) => {
      let carPos = podiumArr.indexOf(id);

      return {
        id: id,
        name: id,
        amount: getBetMoney(betRound, carPos)
      };
    });

    const totalBets = b.reduce((acc, curr) => acc + curr.amount, 0);

    setBettingArr(b);
    setBettingTotal(totalBets);
  }, [betsArr, bettingPrizes, podiumArr]);

  useEffect(() => {
    let total = {
      racing: 0,
      auction: 0
    };

    const obj = cars.map((car) => {
      const auction = auctionObj[car.id] ? auctionObj[car.id] : 0;
      const selected = auction > 0;
      total.auction -= auction;
      
      const pos = finishPosArr.indexOf(car.id) > -1 ? finishPosArr.indexOf(car.id) : 6;
      const finished = pos < 6;
      
      const racing = pos < 6 ? racingPrizes[pos].value : 0;
      total.racing += selected ? racing : 0;
      
      return {...car, auction: auction, selected: selected, finished: finished,  pos: pos, racing: racing }
    });

    setTotalArr(obj)
    setRacingTotal(total.racing)
    setAuctionTotal(total.auction);

  }, [auctionObj, betsArr, finishPosArr, cars, racingPrizes]);

  function getBetMoney(betRound, carPos) {
    let money = 0;
    if (carPos > -1 && carPos < 3) money = bettingPrizes[betRound][carPos].value;
    return money;
  }

  return (
    <Slide
      body={
        <>
          <TotalRacingPayouts
            title={racingTitle}
            desc={racingDesc}
            totalArr={totalArr}
            total={racingTotal}
          />
          <TotalBettingPayouts
            title={bettingTitle}
            desc={bettingDesc}
            bettingArr={bettingArr}
            total={bettingTotal}
          />
          <TotalAuctionPrices
            title={auctionTitle}
            desc={auctionDesc}
            totalArr={totalArr}
            total={auctionTotal}
          />
        </>
      }
      footer={
        <>
          <h3>{totalTitle}</h3>
          <MoneyTag amount={racingTotal + bettingTotal + auctionTotal} />
          <Btn
            text="Restart"
            disabled={false}
            callback={restart}
          />
        </>
      }
    />
  );
}