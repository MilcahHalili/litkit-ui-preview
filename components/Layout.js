import React from "react";
import Header from "./Header";
import Styles from "../styles/Components/Layout.module.scss"

const Layout = (props) => (
  <div className={Styles.layout}>
    <Header props={props} />
    <div>{props.children}</div>
  </div>
);

export default Layout;
