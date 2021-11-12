import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from 'next/router'
import { magic } from '../magic'
import Styles from "../styles/Components/Header.module.scss"

const Header = ({ props }) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;


  /**
   * Perform logout action via Magic.
  */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);

  let left = (
    <div className={Styles.left}>
      <Link href="/">
        <a className={Styles.boldA} data-active={isActive("/")}>
          <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px"/>
        </a>
      </Link>
    </div>
  );

  let right = (
    <>
      <h2>👋🏼{(typeof window !== 'undefined' && (localStorage || props.username)) ? ', ' + (localStorage.name || props.username) + '!' : ''}</h2>
      <button onClick={logout}>Logout</button>
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
