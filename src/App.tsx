import { ReactElement, useState, useContext, useMemo, } from "react";
import { useDispatch } from 'react-redux';
import { goToSlide } from './components/UI/Wizard/wizardSlice';
import data from "./data/downforce.json";
import "./App.scss";
import styled from "styled-components";

import SlideAuction from "./components/Slides/Auction/Auction";
import SlideRace from "./components/Slides/Race";
import SlideBet from "./components/Slides/Bets/Bets";
import SlideFinishLine from "./components/Slides/FinishLine/FinishLine";
import SlideTotals from "./components/Slides/Totals";
import MainHeader from "./components/UI/MainHeader";
import Wizard from "./components/UI/Wizard/Wizard";
import AppContext from "./store/app-context";
import SettingsPanel from "./components/UI/SettingsPanel";

const StyledMainContent = styled.div`
  flex: 1 1 auto;
  position: relative;
`

function App() {
  const appCtx = useContext(AppContext);
  const dispatch = useDispatch();
  const cars = ['black', 'blue', 'green', 'orange', 'red', 'yellow'];
  const bettingPrizes = [[9,6,3], [6,4,2], [3,2,1]];
  let betIndex = -1;
  const [slides, setSlides] = useState<(ReactElement|null)[]>([]);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);
  
  useMemo(() => {
    const slidesTmp: (ReactElement|null)[] = data.map(
      (slide: any, index: number) => {
        const key = `slide-${index}`;
        const slideInstructions = appCtx.getTranslation(`${slide.id}Instructions`) ? appCtx.getTranslation(`${slide.id}Instructions`) : '';
        let slideBtn = appCtx.getTranslation(`${slide.id}Btn`) ? appCtx.getTranslation(`${slide.id}Btn`) : '';

        switch (slide.type) {
          case "auction":
            return (
              <SlideAuction
                key={key}
                instructions={slideInstructions}
                cars={cars}
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
            betIndex++;
            return (
              <SlideBet
                key={key}
                cars={cars}
                bettingPrizes={bettingPrizes[betIndex]}
                betIndex={betIndex}
              />
            );
          case "finishline":
            return (
              <SlideFinishLine
                key={key}
                cars={cars}
              />
            );
          case "totals":
            return (
              <SlideTotals
                key={key}
                cars={cars}
                bettingPrizes={bettingPrizes}
                restart={restart}
              />
            );
          default:
            return null;
        }
      }
    );
    setSlides(slidesTmp);
  }, [appCtx]);

  function restart() {
    dispatch(goToSlide(0));
  }

  return (
    <div className="App">
      <MainHeader 
        data={data} 
        openSettings={() => setSettingsVisible(true)} />

      <StyledMainContent>
        <Wizard slidesTotal={data.length}>
          {slides}
        </Wizard>

        <SettingsPanel 
          visible={settingsVisible} 
          close={() => setSettingsVisible(false)} />
      </StyledMainContent>
    </div>
  );
}

export default App;
