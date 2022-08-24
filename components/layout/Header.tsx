import Link from "next/link";
import React, { useRef } from "react";

import style from "../../styles/header.module.css";

const Header = () => {
  const mainNav = useRef<HTMLElement | null>(null);
  const closeMobileNav = useRef<HTMLDivElement | null>(null);

  const mobileNavOpenHandler = () => {
    mainNav.current!.className = `${style.nav} ${style.open}`;
    closeMobileNav.current!.className = `${style.closemobilenav} ${style.open}`;
  };

  const mobileNavCloseHandler = () => {
    mainNav.current!.className = `${style.nav}`;
    closeMobileNav.current!.className = `${style.closemobilenav}`;
  };

  return (
    <header className={style.header}>
      <div className={style.logo}>WEB3</div>
      <nav className={style.nav} ref={mainNav}>
        <ul>
          <li onClick={mobileNavCloseHandler}>
            <Link href="/">
              <a>Wallet</a>
            </Link>
          </li>
          <li onClick={mobileNavCloseHandler}>
            <Link href="/Cryptotable">
              <a>Coins</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.mobilenav} onClick={mobileNavOpenHandler}>
        &#9776;
      </div>
      <div
        className={style.closemobilenav}
        ref={closeMobileNav}
        onClick={mobileNavCloseHandler}
      >
        &#x2715;
      </div>
    </header>
  );
};

export default Header;
