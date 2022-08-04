import { ReactElement, useState, useEffect, useContext, } from "react";
import { useDispatch } from 'react-redux';
import { goToSlide } from './components/UI/Wizard/wizardSlice';
import data from "./data/downforce.json";
import "./App.scss";

import SlideAuction from "./components/Slides/Auction";
import SlideRace from "./components/Slides/Race";
import SlideBet from "./components/Slides/Bet";
import SlideFinishLine from "./components/Slides/FinishLine";
import SlideTotals from "./components/Slides/Totals";
import MainHeader from "./components/UI/MainHeader";
import Wizard from "./components/UI/Wizard/Wizard";
import LangContext from "./store/i18n-context";

function App() {
  const langCtx = useContext(LangContext);
  const dispatch = useDispatch();
  const [auctionObj, setAuctionObj] = useState<any>(data.initial.auctionObj);
  const [betsArr, setBetsArr] = useState<string[]>(data.initial.betsArr);
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
                onAuctionChange={(obj) => setAuctionObj(obj)}
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
                onBetsChange={handleBetChange}
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
                racingPrizes={data.racingPrizes}
                onFinishPosChange={handleFinishPosChange}
                btnText={slideBtn}
              />
            );
          case "totals":
            return (
              <SlideTotals
                {...slide}
                key={key}
                auctionObj={auctionObj}
                betsArr={betsArr}
                cars={data.cars}
                finishPosArr={finishPosArr}
                racingPrizes={data.racingPrizes}
                bettingPrizes={data.bettingPrizes}
                restart={restart}
              />
            );
          default:
            return <></>;
        }
      }
    );
    setSlides(slidesTmp);

    function handleBetChange(betIndex: number, id: string) {
      const tmp = [...betsArr];
      tmp[betIndex] = id;
      setBetsArr(tmp);
    }
  }, [auctionObj, betsArr, finishPosArr, langCtx]);

  function restart() {
    dispatch(goToSlide(0));
    setAuctionObj(data.initial.auctionObj);
    setBetsArr(data.initial.betsArr);
    setFinishPosArr(data.initial.finishPosArr);
  }

  function handleFinishPosChange(carsOrderArr: string[]) {
    setFinishPosArr(carsOrderArr);
  }

  return (
    <div className="App">
      <select onChange={(event) => langCtx.onToggleLang(event.target.value)}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
      <MainHeader slideTitle='allo'/>

      <Wizard slidesTotal={data.slides.length}>
        {slides}
      </Wizard>
    </div>
  );
}

export default App;
