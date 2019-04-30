import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { AreaService } from "../services/AreaService";
import { useService } from "rc-service";
import { Area } from '../services/AreaService';
import styles from '../styles/layout/card.module.scss'

const Areas: React.SFC<Area> = () => {
  const areaService = useService(AreaService);
  // é provavel que aja algum erro com o createCache pois faço refresh e ás vezes não aparece dados
  const areas = areaService.areas.read();
  //não há necessidade de criar 2 closures

  const areaList = areas.value ? (
    areas.value.map((area: Area) => (
      <article className={styles.card} key={area.id}>
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
            <div>
              <Link className={styles.card__button} to={`/update-area/` + area.id}><span >Edit</span></Link>
              <div className={styles.card__button}>
                <span className={styles.card_delete} onClick={() => areaService.deleteArea(area.id)}>Delete</span>
                </div> 
            </div>
          </div>
        </div>
      </article>
    ))
  ) : (
      <div>No Areas to show</div>
    );
  return (
    <div className={styles.card_container}>
      <span className={styles.card_container__title}>Areas</span>
      <div className={styles.card_container__add}><div ><Link className={styles.card__button} to="/add-areas">+ Add Area</Link></div></div>
      <div className={styles.card_wrapper}>{areaList}</div>
    </div>
  );
};

export default Areas;
