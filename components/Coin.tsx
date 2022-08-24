import React from "react";
import { CryptoDataType } from "./layout/interfaces/CryptoData";

import style from "../styles/coinData.module.css";
import Image from "next/image";

const Coin: React.FC<{ coinData: CryptoDataType }> = (props) => {
  const marketValue =
    Math.abs(props.coinData.total_volume) >= 1.0e9
      ? (Math.abs(props.coinData.total_volume) / 1.0e9).toFixed(2) + "B"
      : Math.abs(props.coinData.total_volume) >= 1.0e6
      ? (Math.abs(props.coinData.total_volume) / 1.0e6).toFixed(2) + "M"
      : Math.abs(props.coinData.total_volume) >= 1.0e3
      ? (Math.abs(props.coinData.total_volume) / 1.0e3).toFixed(2) + "K"
      : Math.abs(props.coinData.total_volume);

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.coin}>
          <Image
            loader={() => props.coinData.image}
            src={props.coinData.image}
            alt={props.coinData.name}
            className={style.image}
            width={75}
            height={75}
          />
          <h1 className={style.h1}>{props.coinData.name}</h1>
          <p className={style.symbole}>{props.coinData.symbol}</p>
        </div>
        <div className={style.data}>
          <p className={style.price}>
            <strong>Price :</strong>
            {props.coinData.current_price}
          </p>
          <p className={style.volume}>
            <strong>Volume :</strong>
            {props.coinData.market_cap.toLocaleString()}
          </p>
          {props.coinData.price_change_percentage_24h < 0 ? (
            <p className={`${style.percent} ${style.red}`}>
              {props.coinData.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className={`${style.percent} ${style.green}`}>
              {props.coinData.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
          <p className={style.marketcap}>
            <strong>Market Cap :</strong>
            {marketValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
