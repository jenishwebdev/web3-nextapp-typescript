import React, { useEffect, useState } from "react";
import Coin from "../components/Coin";
import { CryptoDataType } from "../components/layout/interfaces/CryptoData";
import InfiniteScroll from "react-infinite-scroll-component";
import { coinsEndPoints } from "../common/constant";

import style from "../styles/cryptoTable.module.css";

const CryptoTable = () => {
  const [data, setData] = useState<CryptoDataType[]>([]);
  const [page, setPage] = useState<number>(2);

  const fetchData = async (): Promise<void> => {
    const response = await fetch(
      `${coinsEndPoints}?vs_currency=inr&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
    );
    const newData: CryptoDataType[] = await response.json();
    setData([...data, ...newData]);
    setPage(page + 1);
  };

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await fetch(
        `${coinsEndPoints}?vs_currency=inr&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );
      const data: CryptoDataType[] = await response.json();
      setData([...data]);
    };
    if (page - 1 === 1) {
      getData();
    }
  }, [page]);

  return (
    <section className={style.cointable}>
      <div className={style.coinheader}>
        <div className={style.firstheader}>
          <strong>Coin</strong>
          <strong>Symbole</strong>
        </div>
        <div className={style.secondheader}>
          <strong>Price</strong>
          <strong>Volume</strong>
          <strong>Fluctuation</strong>
          <strong>Market Cap</strong>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={true}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {data.map((item) => {
          return <Coin key={item.id} coinData={item} />;
        })}
      </InfiniteScroll>
    </section>
  );
};

export default CryptoTable;
