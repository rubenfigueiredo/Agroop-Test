import React from "react";
import { Link } from 'react-router-dom'
import { useService } from "rc-service";
import { AreaService } from "../services/AreaService";
import { DeviceService } from "../services/DeviceService";
import AreasForm from "../components/AreasForm";
import styles from "../styles/components/container.module.scss";


const AddArea: React.SFC<any> = () => {
  const areaService = useService(AreaService);
  const AddAreaAction = (values: any) => (areaService.createArea(values));
  const deviceService = useService(DeviceService);
  const devices = deviceService.devices.read();
  console.log("devices", devices); 
  return (
    <div className={styles.container}>
    <div className={styles.container__title_div}><h3 className={styles.container__title}>Add an area</h3></div>
      <AreasForm devices={devices.value} submitAction={AddAreaAction}/>
    </div>
  )
};

export default AddArea;