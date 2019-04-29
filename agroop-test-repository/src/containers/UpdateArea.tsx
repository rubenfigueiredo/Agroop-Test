import React, { useEffect, useState } from "react";
import { AreaService, Area } from "../services/AreaService";
import { DeviceService } from "../services/DeviceService";
import { useService } from "rc-service";
import AreasForm from "../components/AreasForm";
import styles from "../styles/layout/container.module.scss";

const UpdateArea: React.SFC<any> = props => {
  const { id } = props.match.params;

  const areaService = useService(AreaService);
  const deviceService = useService(DeviceService);
  const updateAreaAction = (values: any) => {
    //console.log("updated values", values);
    areaService.changeArea(values).then(props.history.push("/areas"));
  };
  const devices = deviceService.devices.read();
  let area: any = areaService.area.read(id);
  return (
    <div className={styles.container}>
      <div className={styles.container__title_div}>
        <h3 className={styles.container__title}>Edit an area</h3>
      </div>
      <AreasForm
        area={area.value}
        devices={devices.value}
        submitAction={updateAreaAction}
      />
    </div>
  );
};

export default UpdateArea;
