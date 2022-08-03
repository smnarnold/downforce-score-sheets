import { ReactElement, useState, useEffect, useContext } from "react";
import data from "./data/downforce.json";
import "./App.scss";

import SlideAuction from "./components/Slides/Auction";
import SlideRace from "./components/Slides/Race";
import SlideBet from "./components/Slides/Bet";
import SlideFinishLine from "./components/Slides/FinishLine";
import SlideTotals from "./components/Slides/Totals";
import MainHeader from "./components/UI/MainHeader";
import Wizard from "./components/UI/Wizard";
import AppContext from "./store/app-context";

function App() {
  const ctx = useContext(AppContext);

  const [auctionObj, setAuctionObj] = useState<any>(data.initial.auctionObj);
  const [betsArr, setBetsArr] = useState<string[]>(data.initial.betsArr);
  const [finishPosArr, setFinishPosArr] = useState<string[]>(
    data.initial.finishPosArr
  );
  const [slides, setSlides] = useState<ReactElement[]>([]);

  useEffect(() => {
    const slidesTmp: ReactElement[] = data.slides.map(
      (slide: any, index: number) => {
        switch (slide.type) {
          case "auction":
            return (
              <SlideAuction
                key={`slide-${index}`}
                instructions={slide.instructions}
                cars={data.cars}
                goToText={slide.goToText}
                onAuctionChange={(obj) => setAuctionObj(obj)}
                onSlideChange={ctx.onNextSlide}
              />
            );
          case "race":
            return (
              <SlideRace
                {...slide}
                key={`slide-${index}`}
                onSlideChange={ctx.onNextSlide}
              />
            );
          case "bet":
            return (
              <SlideBet
                {...slide}
                key={`slide-${index}`}
                cars={data.cars}
                bettingTitle={data.slides[8].bettingTitle}
                bettingPrizes={data.bettingPrizes}
                onBetsChange={handleBetChange}
                onSlideChange={ctx.onNextSlide}
              />
            );
          case "finishline":
            return (
              <SlideFinishLine
                {...slide}
                key={`slide-${index}`}
                cars={data.cars}
                racingPrizes={data.racingPrizes}
                onFinishPosChange={handleFinishPosChange}
                onSlideChange={ctx.onNextSlide}
              />
            );
          case "totals":
            return (
              <SlideTotals
                {...slide}
                key={`slide-${index}`}
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
  }, [auctionObj, betsArr, finishPosArr]);

  function restart() {
    ctx.onGoToSlide(0); 
    setAuctionObj(data.initial.auctionObj);
    setBetsArr(data.initial.betsArr);
    setFinishPosArr(data.initial.finishPosArr);
  }

  function handleFinishPosChange(carsOrderArr: string[]) {
    setFinishPosArr(carsOrderArr);
  }

  return (
    <div className="App">
      <MainHeader slideTitle="allo"/>

      <Wizard slidesTotal={data.slides.length}>
        {slides}
      </Wizard>
    </div>
  );
}

export default App;
