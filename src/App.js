import React from 'react';
import data from './data/downforce.json';
import './App.scss';

import SlideAuction from './components/SlideAuction/SlideAuction';
import SlideRace from './components/SlideRace/SlideRace';
import SlideBet from './components/SlideBet/SlideBet';
import SlideFinishLine from './components/SlideFinishLine/SlideFinishLine';
import MainHeader from './components/MainHeader/MainHeader';
import Wizard from './components/Wizard/Wizard';

function App() {
  const [slideIndex, setSlideIndex] = React.useState(data.initial.slideIndex);
  const [auctionObj, setAuctionObj] = React.useState(data.initial.auctionObj);
  const [betsArr, setBetsArr] = React.useState(data.initial.betsArr);
  const [finishPosArr, setFinishPosArr] = React.useState(data.initial.finishPosArr);

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
              slideIndex={index}
              onSlideChange={(index) => setSlideIndex(index)}
            />
          );
        case "bet":
          return (
            <SlideBet
              {...slide}
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
                slideIndex={index}
                cars={data.cars}
                finishPosArr={finishPosArr}
                racingPrizes={data.racingPrizes}
                onFinishPosChange={handleFinishPosChange}
                onSlideChange={(index) => setSlideIndex(index)}
              />
            );
      default:
      // To do: create a default slide
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
