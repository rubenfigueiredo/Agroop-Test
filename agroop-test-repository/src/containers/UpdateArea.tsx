import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { AreaService, Area } from "../services/AreaService";
import { DeviceService } from "../services/DeviceService";
import { useService } from "rc-service";
import AreasForm from "../components/AreasForm";

const UpdateArea: React.SFC<any> = props => {
  const { id } = props.match.params;

  const areaService = useService(AreaService);
  const deviceService = useService(DeviceService);
  const updateAreaAction = (values: any) => {
    console.log("updated values", values);
    areaService.changeArea(values);
  };
  const devices = deviceService.devices.read();
  let area: any = areaService.area.read(id);
  return (
    <div>
      <div>Update Area Component</div>
      <Link to="/areas">go to areas list</Link>
      <div>
        <AreasForm
          area={area.value}
          devices={devices.value}
          submitAction={updateAreaAction}
        />
      </div>
    </div>
  );
};

export default UpdateArea;
