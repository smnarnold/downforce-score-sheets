import { useState, useCallback } from "react";
import Slide from "../UI/Slide";
import Instructions from "../UI/Instructions";
import AuctionCar from "../AuctionCar/AuctionCar";
import Btn from "../UI/Btn";

export default function SlideAuction({
  slideIndex = 0,
  type: slideType = "auction",
  instructions = "",
  cars = [],
  goToText = "",
  onAuctionChange,
  onSlideChange,
}) {
  const [bidsObj, setBidsObj] = useState({});
  const btnIsDisabled = Boolean(!Object.keys(bidsObj).length);

  const handleBidChange = useCallback(
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
    <Slide
      header={<Instructions text={instructions} />}
      body={<ul className="auctions-list">{carItems}</ul>}
      footer={
        <Btn
          text={goToText}
          disabled={btnIsDisabled}
          callback={() => onSlideChange(slideIndex + 1)}
        />
      }
    />
  );
}
