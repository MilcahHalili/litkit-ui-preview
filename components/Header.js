import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Styles from "../styles/Components/Header.module.scss"

const Header = (props) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;

  let left = (
    <div className={Styles.left}>
      <Link href="/">
        <a className={Styles.boldA} data-active={isActive("/")}>
            <img
                src="https://i.imgur.com/NxwZ9x0.png"
                alt=""
                width="100px"
                height="100px"
            />
        </a>
      </Link>
    </div>
  );

  let right = (
    <>
      <h3>👋🏼{localStorage ? ', ' + (props.username || localStorage.name) : ''}!</h3>
    </>
  );

  return (
    <nav className={Styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
