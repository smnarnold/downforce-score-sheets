import React from 'react';
import Slide from '../Slide/Slide';
import './SlideAuction.scss';
import Instructions from '../Instructions/Instructions';
import AuctionCar from '../AuctionCar/AuctionCar';
import Btn from '../Btn/Btn';

export default function SlideAuction({
  slideIndex = 0,
  type: slideType = "auction",
  instructions = "",
  cars = [],
  goToText = "",
  onAuctionChange,
  onSlideChange
}) {
  const [bidsObj, setBidsObj] = React.useState({});

  const handleBidChange = React.useCallback(
    ({ id, price }) => {
      let obj = { ...bidsObj, [id]: price };
      if (price === 0) delete obj[id];
      setBidsObj(obj);
      onAuctionChange(obj);
    },
    [bidsObj]
  );

  const carItems = cars.map((car) => {
    return <AuctionCar {...car} key={car.id} onBidChange={handleBidChange} />;
  });

  return (
    <Slide type={slideType}>
      <div className="slide__body">
        <Instructions text={instructions} />
        <ul className="auctions-list">{carItems}</ul>
      </div>

      <footer className="slide__footer">
        <Btn
          disabled={Boolean(!Object.keys(bidsObj).length)}
          callback={() => onSlideChange(slideIndex + 1)}
        >
          {goToText}
        </Btn>
      </footer>
    </Slide>
  );
}