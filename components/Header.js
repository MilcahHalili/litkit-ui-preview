import React, { useCallback, useState } from "react";
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
  const [showMobileLogout, setShowMobileLogout] = useState(false);

  /**
   * Perform logout action via Magic.
  */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);

  return (
    <nav className={Styles.nav}>
      <Link href="/">
        <a className={Styles.logo} data-active={isActive("/")}>
          <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px" />
        </a>
      </Link>

      <div className={Styles.dropDownMenuContainer}>
        <h2 onClick={() => setShowMobileLogout(!showMobileLogout)}>
          <FontAwesomeIcon icon={faHandSparkles} className={Styles.usernameIcon} />
          {(typeof window !== 'undefined' && (props.username || localStorage.name)) ? ', ' + (props.username || localStorage.name) + '!' : ''}
          <span className={Styles.dropDownIcon}> ▾</span>
        </h2>
        {showMobileLogout ? <button className={Styles.logoutButton} onClick={logout}>Logout</button> : ''}
      </div>
    </nav>
  );
};

export default Header;
