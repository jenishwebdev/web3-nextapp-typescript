import MetaMaskOnboarding from "@metamask/onboarding";
import React, { useEffect, useState } from "react";

import style from "../styles/metamask.module.css";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Index = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);

  const walletRequestHandler = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsLogin(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        alert("something went wrong");
      }
    } else {
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    }
  };

  const cleanerHandler = () => {
    setIsLogin(false);
    setWalletAddress("");
    setBalance(null);
  };

  const walletDisConnectHandler = () => {
    cleanerHandler();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        cleanerHandler();
      });

      window.ethereum.on("accountsChanged", () => {
        cleanerHandler();
      });
    }
  });

  useEffect(() => {
    if (walletAddress) {
      const balance = async (): Promise<void> => {
        const amount = await window.ethereum.request({
          method: "eth_getBalance",
          params: [walletAddress, "latest"],
        });

        setBalance(parseInt(amount) / Math.pow(10, 18));
      };

      balance();
    }
  }, [walletAddress]);

  return (
    <section className={style.metamask}>
      <div className="card">
        <div className={style.actionsection}>
          <h1>connect to Wallet</h1>
          {!isLogin && (
            <button className={style.action} onClick={walletRequestHandler}>
              Connect
            </button>
          )}
          {isLogin && (
            <button className={style.action} onClick={walletDisConnectHandler}>
              Disconnect
            </button>
          )}
        </div>
        <div className={style.datasection}>
          <p>
            Account : <strong>{walletAddress}</strong>
          </p>
          <p>Balance : {balance && <strong>{balance}</strong>}</p>
        </div>
      </div>
    </section>
  );
};

export default Index;
