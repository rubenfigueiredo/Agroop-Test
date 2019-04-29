import React from "react";
import { useService } from "rc-service";
import { AreaService } from "../services/AreaService";
import { DeviceService } from "../services/DeviceService";
import AreasForm from "../components/AreasForm";
import styles from "../styles/layout/container.module.scss";


const AddArea: React.SFC<any> = (props) => {
  const areaService = useService(AreaService);
  const AddAreaAction = (values: any) => (areaService.createArea(values).then(props.history.push("/areas")));
  const deviceService = useService(DeviceService);
  const devices = deviceService.devices.read(); 
  return (
    <div className={styles.container}>
    <div className={styles.container__title_div}><h3 className={styles.container__title}>Add an area</h3></div>
      <AreasForm devices={devices.value} submitAction={AddAreaAction}/>
    </div>
  )
};

export default AddArea;