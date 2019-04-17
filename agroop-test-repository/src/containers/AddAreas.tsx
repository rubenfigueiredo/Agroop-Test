import React from "react";
import { Link } from 'react-router-dom'
import { useService } from "rc-service";
import { AreaService } from "../services/AreaService";
import { DeviceService } from "../services/DeviceService";
import AreasForm from "../components/AreasForm";


const AddArea: React.SFC<any> = () => {
  const areaService = useService(AreaService);
  const AddAreaAction = (values: any) => (areaService.createArea(values));
  const deviceService = useService(DeviceService);
  const devices = deviceService.devices.read();
  console.log("devices", devices); 
  return (
    <div>
      Add area Component
      <Link to="areas">Go to Area's List</Link>
      <AreasForm devices={devices.value} submitAction={AddAreaAction}/>
    </div>
  )
};

export default AddArea;