import React from "react";
import Header from "./Header";
import Styles from "../styles/Components/Layout.module.scss"

const Layout = (props) => (
  <div>
    <Header props={props} />
    <div className={Styles.layout}>{props.children}</div>
  </div>
);

export default Layout;
