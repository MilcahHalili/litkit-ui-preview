import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from 'next/router'
import { magic } from '../magic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'

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
        <a className={Styles.logo} data-active={isActive("/")}>
          <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px"/>
        </a>
      </Link>
    </div>
  );

  let right = (
    <>
      <h2><FontAwesomeIcon icon={faHandSparkles} className={Styles.usernameIcon} />{(typeof window !== 'undefined' && (props.username || localStorage.name)) ? ', ' + (props.username || localStorage.name) + '!' : ''}</h2>
      <button className={Styles.logoutButton} onClick={logout}>Logout</button>
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
