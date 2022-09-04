import { useState, useEffect, useContext, useMemo } from "react";
import Slide from "../UI/Slide";
import MoneyTag from "../UI/MoneyTag";
import CategorySummary from "../UI/CategorySummary";
import Btn from "../UI/Btn";
import { auctionObj } from './Auction/auctionSlice';
import { betsArr } from './Bets/betsSlice';
import { finishLineArr } from "./FinishLine/finishLineSlice";
import { useSelector } from "react-redux";
import LangContext from '../../store/i18n-context';
import CarSummary from "../UI/CarSummary";
interface SlideTotalsProps {
  cars: string[];
  bettingPrizes: number[][];
  restart: () => void;
}

export default function SlideTotals({
  cars = [],
  bettingPrizes = [],
  restart,
}: SlideTotalsProps) {
  const racingPrizes = [12, 9, 6, 4, 2, 0];

  const langCtx = useContext(LangContext);
  const auction = useSelector(auctionObj);
  const bets = useSelector(betsArr);
  const finishLine = useSelector(finishLineArr);
   // @ts-ignore
  const classifieds:string[] = useMemo(() => finishLine.filter((item) => item !== null), [finishLine]);
  const abandons = useMemo(() => cars.filter(car => !classifieds.includes(car)), [cars, classifieds]);
  const finalRanking = useMemo(() => [...classifieds, ...abandons], [classifieds, abandons]);

  let racingTotal = 0;

  const racingDetails = finalRanking.map((car, index) => {
    const abandoned:boolean = index > classifieds.length - 1;
    let pos:null|number = null;
    let money:number = 0;
    let status:string|null = 'abandoned';

    if (!abandoned) {
      pos = index + 1;
      money = racingPrizes[index];
      status = auction[car] > 0 ? 'is-active' : null;
      racingTotal += auction[car] > 0 ? money : 0;
    }

    return <CarSummary car={car} pos={pos} money={money} status={status} />
  });

  let bettingTotal = 0;

  const bettingDetails = bets.map((car, index) => {
    if (car) {
      const pos = finishLine.indexOf(car);
      const amount = bettingPrizes[index][pos];
      const money = amount ? amount : 0
      bettingTotal += money;

      return <CarSummary car={car} money={money} status="is-active" />
    }
    return null;
  });

  const auctionTotal = Object.values(auction).reduce((acc, curr) => acc - curr, 0);

  const auctionDetails = Object.entries(auction).map((item) => {
    const money = item[1] * -1;
    if ( money < 0) {
      return <CarSummary car={item[0]} money={money} status='is-active' />
    } else {
      return null;
    }
  });

  return (
    <Slide
      body={
        <>
          <CategorySummary
            title={langCtx.get('racingPayouts')}
            label={langCtx.get('racingTotal')}
            details={racingDetails}
            total={racingTotal} />
          
          <CategorySummary
            title={langCtx.get('bettingPayouts')}
            label={langCtx.get('bettingTotal')}
            details={bettingDetails}
            total={bettingTotal} />

          <CategorySummary
            title={langCtx.get('auctionPrice')}
            label={langCtx.get('auctionTotal')}
            details={auctionDetails}
            total={auctionTotal} />
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
