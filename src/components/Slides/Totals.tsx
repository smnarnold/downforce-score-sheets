import { useState, useEffect } from "react";
import Slide from "../UI/Slide";
import MoneyTag from "../UI/MoneyTag";
import CategorySummary from "../UI/CategorySummary";
import Btn from "../UI/Btn";

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

function getAuctionArr(arr: any) {
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
}

interface SlideTotalsProps {
  racingTitle: string;
  racingDesc: string;
  bettingTitle: string;
  bettingDesc: string;
  auctionTitle: string;
  auctionDesc: string;
  totalTitle: string;
  cars: any[];
  auctionObj: any;
  finishPosArr: string[];
  betsArr: string[];
  racingPrizes: any[];
  bettingPrizes: any[];
  restart: () => void;
}

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
  racingPrizes = [],
  bettingPrizes = [],
  restart,
}: SlideTotalsProps) {
  const [podiumArr, setPodiumArr] = useState<string[]>([]);
  const [racingArr, setRacingArr] = useState<any[]>([]);
  const [racingTotal, setRacingTotal] = useState<number>(0);
  const [bettingTotal, setBettingTotal] = useState<number>(0);
  const [bettingArr, setBettingArr] = useState<any[]>([]);
  const [auctionArr, setAuctionArr] = useState<any[]>([]);
  const [auctionTotal, setAuctionTotal] = useState<number>(0);

  useEffect(() => {
    setPodiumArr(finishPosArr.slice(0, 3));
  }, [finishPosArr]);

  useEffect(() => {
    const getBetMoney = function (betRound: number, carPos: number) {
      let money = 0;
      if (carPos > -1 && carPos < 3)
        money = bettingPrizes[betRound][carPos].value;
      return money;
    };

    const b = betsArr.map((id, betRound) => {
      let carPos = podiumArr.indexOf(id);

      return {
        key: `bet-${betRound + 1}`,
        id: id,
        name: id,
        amount: getBetMoney(betRound, carPos),
        active: true,
      };
    });

    const totalBets = b.reduce((acc, curr) => acc + curr.amount, 0);

    setBettingArr(b);
    setBettingTotal(totalBets);
  }, [betsArr, bettingPrizes, podiumArr]);

  useEffect(() => {
    let total = {
      racing: 0,
      auction: 0,
    };

    const arr = cars.map((car) => {
      const auction = auctionObj[car.id] ? auctionObj[car.id] : 0;
      const selected = auction > 0;
      total.auction -= auction;

      const pos =
        finishPosArr.indexOf(car.id) > -1 ? finishPosArr.indexOf(car.id) : 6;
      const finished = pos < 6;

      const racing = pos < 6 ? racingPrizes[pos].value : 0;
      total.racing += selected ? racing : 0;

      return {
        ...car,
        auction: auction,
        selected: selected,
        finished: finished,
        pos: pos,
        racing: racing,
      };
    });

    setRacingArr(getRacingArr(arr));
    setRacingTotal(total.racing);
    setAuctionArr(getAuctionArr(arr));
    setAuctionTotal(total.auction);
  }, [auctionObj, betsArr, finishPosArr, cars, racingPrizes]);

  return (
    <Slide
      body={
        <>
          <CategorySummary
            title={racingTitle}
            categoryArr={racingArr}
            desc={racingDesc}
            total={racingTotal}
          />
          <CategorySummary
            title={bettingTitle}
            categoryArr={bettingArr}
            desc={bettingDesc}
            total={bettingTotal}
          />
          <CategorySummary
            title={auctionTitle}
            categoryArr={auctionArr}
            desc={auctionDesc}
            total={auctionTotal}
          />
        </>
      }
      footer={
        <>
          <h3>{totalTitle}</h3>
          <MoneyTag amount={racingTotal + bettingTotal + auctionTotal} />
          <Btn text="Restart" disabled={false} callback={restart} />
        </>
      }
    />
  );
}
