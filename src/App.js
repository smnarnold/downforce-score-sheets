import {useState} from 'react';
import data from './data/downforce.json';
import './App.scss';

import SlideAuction from './components/Slides/SlideAuction/SlideAuction';
import SlideRace from './components/Slides/SlideRace/SlideRace';
import SlideBet from './components/Slides/SlideBet/SlideBet';
import SlideFinishLine from './components/Slides/SlideFinishLine/SlideFinishLine';
import SlideTotals from './components/Slides/SlideTotals/SlideTotals';
import MainHeader from './components/MainHeader/MainHeader';
import Wizard from './components/Wizard/Wizard';

function App() {
  console.log('App render')
  const [slideIndex, setSlideIndex] = useState(data.initial.slideIndex);
  const [auctionObj, setAuctionObj] = useState(data.initial.auctionObj);
  const [betsArr, setBetsArr] = useState(data.initial.betsArr);
  const [finishPosArr, setFinishPosArr] = useState(data.initial.finishPosArr);

  function restart() {
    setSlideIndex(data.initial.slideIndex);
    setAuctionObj(data.initial.auctionObj);
    setBetsArr(data.initial.betsArr);
    setFinishPosArr(data.initial.finishPosArr);
  }

  function handleBetChange(index, color) {
    const tmp = [...betsArr];
    tmp[index] = color;
    setBetsArr(tmp);
  }

  function handleFinishPosChange(index, color) {
    const tmp = [...finishPosArr];
    tmp[index] = color;
    setFinishPosArr(tmp);
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
                finishPosArr={finishPosArr}
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
