import { useState, useCallback } from "react";
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import AuctionCar from "../UI/RangeCarPrice";
import Btn from "../UI/Btn";

export default function SlideAuction({
  slideIndex = 0,
  instructions = "",
  cars = [],
  goToText = "",
  onAuctionChange,
  onSlideChange,
}) {
  const [auctionObj, setAuctionObj] = useState({});
  const btnIsDisabled = Boolean(!Object.keys(auctionObj).length);

  function handleBidChange({ id, price }) {
    let obj = { ...auctionObj, [id]: price };
    if (price === 0) delete obj[id];

    setAuctionObj(obj);
  };

  function handleCompleted() {
    onAuctionChange(auctionObj);
    onSlideChange(slideIndex + 1);
  }
  
  const carItems = cars.map((car) => {
    return <AuctionCar {...car} key={car.id} onBidChange={handleBidChange} />;
  });

  return (
    <Slide
      header={<Instructions text={instructions} />}
      body={carItems}
      footer={
        <Btn
          text={goToText}
          disabled={btnIsDisabled}
          callback={handleCompleted}
        />
      }
    />
  );
}
