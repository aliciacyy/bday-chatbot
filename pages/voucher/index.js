import { useState } from "react";
import Head from "next/head";

const Voucher = (props) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div>
      <Head>
        <title>PigBot2023</title>
      </Head>
      <div className="scene">
        <div className={`card ${flipped ? "flip" : ""}`} onClick={flipCard}>
          <div className="card__face card__face--front">
            <img src="./imgs/voucher-front.jpg" />
          </div>
          <div className="card__face card__face--back">
            <img src="./imgs/voucher-back.jpg" />
            <div className="text">
              <div className="title">This voucher entitles you to:</div>
              <ul>
                <li>Dinner at Northpoint of your choice</li>
                <li>1 slice of Cat and the Fiddle</li>
                <li>1 fancy body wash from The Body Shop</li>
                <li>1 bubble tea</li>
                <li>20 mins back massage</li>
                <li>15 mins facial</li>
                <li>1 movie screening at home + popcorn</li>
                <li>1 night stay at 10 star home</li>
              </ul>
              <div>Only valid on 5th May 2023.</div>
              <div>Present voucher to redeem.</div>
              <div className="barcode">05052023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
