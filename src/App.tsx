import { ReactElement, useState, useEffect, useContext, } from "react";
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
  const [auctionObj, setAuctionObj] = useState<any>(data.initial.auctionObj);
  const [finishPosArr, setFinishPosArr] = useState<string[]>(
    data.initial.finishPosArr
  );
  const [slides, setSlides] = useState<ReactElement[]>([]);
  
  useEffect(() => {
    const slidesTmp: ReactElement[] = data.slides.map(
      (slide: any, index: number) => {
        const key = `slide-${index}`;
        const slideInstructions = langCtx.get(`${slide.id}Instructions`) ? langCtx.get(`${slide.id}Instructions`) : '';
        let slideBtn = langCtx.get(`${slide.id}Btn`) ? langCtx.get(`${slide.id}Btn`) : '';

        switch (slide.type) {
          case "auction":
            slideBtn = langCtx.get("letsRace");

            return (
              <SlideAuction
                key={key}
                instructions={slideInstructions}
                cars={data.cars}
                btnText={slideBtn}
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
            slideBtn = langCtx.get("letsRace");

            return (
              <SlideBet
                {...slide}
                key={key}
                instructions={slideInstructions}
                cars={data.cars}
                bettingPrizes={data.bettingPrizes}
                btnText={slideBtn}
              />
            );
          case "finishline":
            return (
              <SlideFinishLine
                {...slide}
                key={key}
                instructions={slideInstructions}
                cars={data.cars}
                btnText={slideBtn}
              />
            );
          // case "totals":
          //   return (
          //     <SlideTotals
          //       {...slide}
          //       key={key}
          //       auctionObj={auctionObj}
          //       betsArr={betsArr}
          //       cars={data.cars}
          //       finishPosArr={finishPosArr}
          //       racingPrizes={data.racingPrizes}
          //       bettingPrizes={data.bettingPrizes}
          //       restart={restart}
          //     />
          //   );
          default:
            return <></>;
        }
      }
    );
    setSlides(slidesTmp);
  }, [auctionObj, finishPosArr, langCtx]);

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
