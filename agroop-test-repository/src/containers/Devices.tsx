import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { AreaService } from "../services/AreaService";
import { useService } from "rc-service";
import { Area } from '../services/AreaService';
import styles from '../styles/layout/card.module.scss'

const Devices: React.SFC<Area> = () => {
  const areaService = useService(AreaService);
  let areas = areaService.areas.read();
  console.log('areas', areas);

  const areaList = areas.value ? (
    areas.value.map((area: Area) => (
      <article className={styles.card} key={area.id}>
        <Link to={`/device/` + area.device}>
          <div className={styles.card__body}>
            <div className={styles.card__panel}>
              <div>
                <h3 className={styles.card__title}>{area.name}</h3>
              </div>
              <div className={styles.card__intro}>
                {area.crop}
              </div>
            </div>
            <div className={`${styles.card__right_panel} ${styles.card__panel}`}>
              <p>{area.device}</p>              
            </div>
          </div>
        </Link>
      </article>
    ))
  ) : (
      <div>No Areas to show</div>
    );
  return (
    <div className={styles.card_container}>
      <span className={styles.card_container__title}>Areas</span>
      <div className={styles.card_container__add}></div>
      <div className={styles.card_wrapper}>{areaList}</div>
    </div>
  );
};

export default Devices;
