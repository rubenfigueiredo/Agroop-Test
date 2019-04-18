import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/header.module.scss";

const Header: React.SFC<any> = () => {
  return (
    <div>
      <nav className={styles.header}>
        <span className={styles.header__logo}>AGROOP Teste</span>
        <div className={styles.header__links_right}>
          <span>
            <Link to="/areas">Areas</Link>
          </span>
          <span>
            <Link to="/devices">Devices</Link>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
