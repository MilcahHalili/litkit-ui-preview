import React from "react";
import Header from "./Header";
import Styles from "../styles/Components/Layout.module.scss"

const Layout = (props) => (
  <body id="bodyody">
    <div className={Styles.layout}>
      <Header props={props} />
      <div>{props.children}</div>
    </div>
  </body>
);

export default Layout;
