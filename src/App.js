import {useState} from 'react';
import data from './data/downforce.json';
import './App.scss';

import SlideAuction from './components/Slides/Auction';
import SlideRace from './components/Slides/Race';
import SlideBet from './components/Slides/Bet';
import SlideFinishLine from './components/Slides/FinishLine';
import SlideTotals from './components/Slides/Totals';
import MainHeader from './components/UI/MainHeader';
import Wizard from './components/UI/Wizard';

function App() {
  //const [slideIndex, setSlideIndex] = useState(data.initial.slideIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [auctionObj, setAuctionObj] = useState(data.initial.auctionObj);
  const [betsArr, setBetsArr] = useState(data.initial.betsArr);
  const [finishPosArr, setFinishPosArr] = useState(data.initial.finishPosArr);

  function restart() {
    setSlideIndex(data.initial.slideIndex);
    setAuctionObj(data.initial.auctionObj);
    setBetsArr(data.initial.betsArr);
    setFinishPosArr(data.initial.finishPosArr);
  }

  function handleBetChange(betIndex, id) {
    const tmp = [...betsArr];
    tmp[betIndex] = id;
    setBetsArr(tmp);
  }

  function handleFinishPosChange(carsOrderArr) {
    setFinishPosArr(carsOrderArr);
  }

  const slides = data.slides.map((slide, index) => {
    switch (slide.type) {
      case "auction":
        return (
          <SlideAuction
            {...slide}
            key={`slide-${index}`}
            slideIndex={index}
            cars={data.cars}
            onAuctionChange={(obj) => setAuctionObj(obj)}
            onSlideChange={(index) => setSlideIndex(index)}
          />
        );
        case "race":
          return (
            <SlideRace
              {...slide}
              key={`slide-${index}`}
              slideIndex={index}
              onSlideChange={(index) => setSlideIndex(index)}
            />
          );
        case "bet":
          return (
            <SlideBet
              {...slide}
              key={`slide-${index}`}
              slideIndex={index}
              cars={data.cars}
              bettingTitle={data.slides[8].bettingTitle}
              bettingPrizes={data.bettingPrizes}
              onBetsChange={handleBetChange}
              onSlideChange={(index) => setSlideIndex(index)}
            />
          );
          case "finishline":
            return (
              <SlideFinishLine
                {...slide}
                key={`slide-${index}`}
                slideIndex={index}
                cars={data.cars}
                racingPrizes={data.racingPrizes}
                onFinishPosChange={handleFinishPosChange}
                onSlideChange={(index) => setSlideIndex(index)}
              />
            );
          case "totals":
            return (
              <SlideTotals
                {...slide}
                key={`slide-${index}`}
                slideIndex={index}
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
        return null;
    }
  });

  return (
    <div className="App">
      <MainHeader
        slideIndex={slideIndex}
        slideTitle={data.slides[slideIndex].title}
        onSlideChange={(prev) => setSlideIndex(prev)} />

        <Wizard slideIndex={slideIndex} slidesTotal={data.slides.length}>
          {slides}
        </Wizard>
    </div>
  );
}

export default App;
