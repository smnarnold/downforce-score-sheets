import { useState, useEffect, useContext } from "react";
import Slide from "../UI/Slide";
import MoneyTag from "../UI/MoneyTag";
import CategorySummary from "../UI/CategorySummary";
import Btn from "../UI/Btn";
import { auctionObj } from './Auction/auctionSlice';
import { betsArr } from './Bets/betsSlice';
import { finishLineArr } from "./FinishLine/finishLineSlice";
import { useSelector } from "react-redux";
import LangContext from '../../store/i18n-context';


function getRacingArr(arr: any) {
  let sortedArr = [...arr];

  return sortedArr
    .sort((a, b) => a.pos - b.pos)
    .map((car, index) => {
      return {
        key: car.id,
        id: car.id,
        name: car.name,
        pos: index + 1,
        finished: car.finished,
        amount: car.racing,
        active: car.selected,
      };
    });
}

/*function getAuctionArr(arr: any) {
  let res = [...arr];

  return res.map((car) => {
    return {
      key: car.id,
      id: car.id,
      name: car.name,
      amount: car.auction,
      active: car.selected,
    };
  });
}*/

function getAuctionArr(obj: any) {
  let arr = [];
  for (const property in obj) {
    arr.push({
      key: property,
      id: property,
      name: property,
      amount: obj[property],
      active: true,
    })
  }

  return arr;
}

interface SlideTotalsProps {
  cars: any[];
  racingPrizes: any[];
  bettingPrizes: any[];
  restart: () => void;
}

export default function SlideTotals({
  cars = [],
  racingPrizes = [],
  bettingPrizes = [],
  restart,
}: SlideTotalsProps) {
  const langCtx = useContext(LangContext);
  const auction = useSelector(auctionObj);
  const bets = useSelector(betsArr);
  const finishLine = useSelector(finishLineArr).filter(item => item !== null);

  const podiumArr = finishLine.slice(0, 3);
  // const [racingArr, setRacingArr] = useState<any[]>([]);
  const [racingTotal, setRacingTotal] = useState<number>(0);
  const [bettingTotal, setBettingTotal] = useState<number>(0);
  const [bettingArr, setBettingArr] = useState<any[]>([]);
  // const [auctionArr, setAuctionArr] = useState<any[]>([]);
  const auctionArr = getAuctionArr(auction);
  const [auctionTotal, setAuctionTotal] = useState<number>(0);

  // useEffect(() => {
  //   const getBetMoney = function (betRound: number, carPos: number) {
  //     let money = 0;
  //     if (carPos > -1 && carPos < 3)
  //       money = bettingPrizes[betRound][carPos].value;
  //     return money;
  //   };

  //   const b = bets.map((id, betRound) => {
  //     let carPos = podiumArr.indexOf(id);

  //     return {
  //       key: `bet-${betRound + 1}`,
  //       id: id,
  //       name: id,
  //       amount: getBetMoney(betRound, carPos),
  //       active: true,
  //     };
  //   });

  //   const totalBets = b.reduce((acc, curr) => acc + curr.amount, 0);

  //   setBettingArr(b);
  //   setBettingTotal(totalBets);
  // }, [bettingPrizes, podiumArr]);

  // useEffect(() => {
  //   let total = {
  //     racing: 0,
  //     auction: 0,
  //   };

  //   const arr = cars.map((car) => {
  //     // @ts-ignore
  //     const auction = auctionObj[car.id] ? auctionObj[car.id] : 0;
  //     const selected = auction > 0;
  //     total.auction -= auction;

  //     const pos = finishLine.indexOf(car.id) > -1 ? finishLine.indexOf(car.id) : 6;
  //     const finished = pos < 6;

  //     const racing = pos < 6 ? racingPrizes[pos].value : 0;
  //     total.racing += selected ? racing : 0;

  //     return {
  //       ...car,
  //       auction: auction,
  //       selected: selected,
  //       finished: finished,
  //       pos: pos,
  //       racing: racing,
  //     };
  //   });

  //   setRacingArr(getRacingArr(arr));
  //   setRacingTotal(total.racing);
  //   // setAuctionArr(getAuctionArr(arr));
  //   setAuctionTotal(total.auction);
  // }, [auctionObj, cars, racingPrizes]);

  return (
    <Slide
      body={
        <>
          {/* <CategorySummary
            title={langCtx.get('racingPayouts')}
            categoryArr={racingArr}
            desc={langCtx.get('racingTotal')}
            total={racingTotal}
          />
          <CategorySummary
            title={langCtx.get('bettingPayouts')}
            categoryArr={bettingArr}
            desc={langCtx.get('bettingTotal')}
            total={bettingTotal}
          />
          <CategorySummary
            title={langCtx.get('auctionPrice')}
            categoryArr={auctionArr}
            desc={langCtx.get('auctionTotal')}
            total={auctionTotal}
          /> */}
        </>
      }
      footer={
        <>
          <h3>{langCtx.get('totalWinning')}</h3>
          <MoneyTag amount={racingTotal + bettingTotal + auctionTotal} />
          <Btn text="Restart" callback={restart} />
        </>
      }
    />
  );
}
