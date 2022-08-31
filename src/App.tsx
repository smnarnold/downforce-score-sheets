import { ReactElement, useState, useEffect, useContext, useMemo, } from "react";
import { useDispatch } from 'react-redux';
import { goToSlide } from './components/UI/Wizard/wizardSlice';
import data from "./data/downforce.json";
import "./App.scss";

import SlideAuction from "./components/Slides/Auction/Auction";
import SlideRace from "./components/Slides/Race";
import SlideBet from "./components/Slides/Bets/Bets";
import SlideFinishLine from "./components/Slides/FinishLine/FinishLine";
import SlideTotals from "./components/Slides/Totals";
import MainHeader from "./components/UI/MainHeader";
import LangSelect from "./components/UI/LangSelect";
import Wizard from "./components/UI/Wizard/Wizard";
import LangContext from "./store/i18n-context";

function App() {
  // console.log('Render APP')
  const langCtx = useContext(LangContext);
  const dispatch = useDispatch();
  const cars = ['black', 'blue', 'green', 'orange', 'red', 'yellow'];
  const [auctionObj, setAuctionObj] = useState<any>(data.initial.auctionObj);
  const [finishPosArr, setFinishPosArr] = useState<string[]>(
    data.initial.finishPosArr
  );
  const [slides, setSlides] = useState<(ReactElement|null)[]>([]);
  
  useMemo(() => {
    const slidesTmp: (ReactElement|null)[] = data.slides.map(
      (slide: any, index: number) => {
        const key = `slide-${index}`;
        const slideInstructions = langCtx.get(`${slide.id}Instructions`) ? langCtx.get(`${slide.id}Instructions`) : '';
        let slideBtn = langCtx.get(`${slide.id}Btn`) ? langCtx.get(`${slide.id}Btn`) : '';

        switch (slide.type) {
          case "auction":
            return (
              <SlideAuction
                key={key}
                instructions={slideInstructions}
                cars={data.cars}
              />
            );
          case "race":
            return (
              <SlideRace
                key={key}
                instructions={slideInstructions}
                btnText={slideBtn}
              />
            );
          case "bet":
            return (
              <SlideBet
                key={key}
                cars={data.cars}
                bettingPrizes={data.bettingPrizes}
                betIndex={slide.betIndex}
              />
            );
          case "finishline":
            return (
              <SlideFinishLine
                key={key}
                cars={data.cars}
              />
            );
          case "totals":
            return (
              <SlideTotals
                {...slide}
                key={key}
                cars={data.cars}
                racingPrizes={data.racingPrizes}
                bettingPrizes={data.bettingPrizes}
                restart={restart}
              />
            );
          default:
            return null;
        }
      }
    );
    setSlides(slidesTmp);
  }, [langCtx]);

  function restart() {
    dispatch(goToSlide(0));
    setAuctionObj(data.initial.auctionObj);
    setFinishPosArr(data.initial.finishPosArr);
  }

  function handleFinishPosChange(carsOrderArr: string[]) {
    setFinishPosArr(carsOrderArr);
  }

  return (
    <div className="App">
      <LangSelect />

      <MainHeader slideTitle='allo'/>

      <Wizard slidesTotal={data.slides.length}>
        {slides}
      </Wizard>
    </div>
  );
}

export default App;
