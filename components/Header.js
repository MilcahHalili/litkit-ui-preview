import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from 'next/router'
import { magic } from '../magic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Styles from "../styles/Components/Header.module.scss"

const Header = ({ props }) => {
  const router = useRouter();
  const isActive = (pathname) => router.pathname === pathname;
  const [showMenu, setShowMenu] = useState(false);
  const [fontSize, setFontSize] = useState(parseInt(16));

  const decText = () => {
    console.log('decrease text')
    let newSize = fontSize - 2;
    document.getElementById('accessibleBody').style.fontSize = `${newSize}px`
    setFontSize(newSize);
  };
  
  const incText = () => {
    console.log('increase text')
    let newSize = fontSize + 2;
    document.getElementById('accessibleBody').style.fontSize = `${newSize}px`
    setFontSize(newSize);
  };

  /**
   * Perform logout action via Magic.
  */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);

  useEffect(() => {
    // on load, set the fontSize
    setFontSize(localStorage.fontSize);
  }, []);

  return (
    <nav className={Styles.nav}>
      <Link href="/">
        <a className={Styles.logo} data-active={isActive("/")}>
          <img src="https://i.imgur.com/NxwZ9x0.png" width="100px" height="100px" />
        </a>
      </Link>

      <div className={Styles.dropDownMenuContainer}>
        <h2 onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={faHandSparkles} className={Styles.usernameIcon} />
          {(typeof window !== 'undefined' && (props.username || localStorage.name)) ? ', ' + (props.username || localStorage.name) + '!' : ''}
          <span className={Styles.dropDownIcon}> ▾</span>
        </h2>

        {showMenu
          ? <div className={Styles.menu}>
            <div className={Styles.textControl}>
              <FontAwesomeIcon
                icon={faMinusCircle}
                className={Styles.tcButton}
                onClick={() => decText()}
              />
              Text Size
              <FontAwesomeIcon
                icon={faPlusCircle}
                className={Styles.tcButton}
                onClick={() => incText()}
              />
            </div>
            <button className={Styles.menuButton} onClick={logout}>Logout</button>
          </div>
          : ''
        }
      </div>
    </nav>
  );
};

export default Header;
