import React , {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import { AreaService } from "../services/AreaService";
import { useService } from "rc-service";
import {Area} from '../services/AreaService';

const Areas: React.SFC<Area> = () => {
  const areaService = useService(AreaService);
  let [areas, setAreas] = useState(areaService.areas.read());
  const deleteAreaAction = (id: any) => (areaService.deleteArea(id));
  useEffect(()=>{
    setAreas(areaService.areas.read());
  }, [areas]);

  const areaList = areas.value ? (
    areas.value.map((area: Area) => (
      <div key={area.id}>
        <div>
          <span>Area: </span>
          <span>{area.area}</span>
        </div>
        <div>
          <span>Crop: </span>
          <span>{area.crop}</span>
        </div>
        <div>
          <span>Device: </span>
          <span>{area.device}</span>
        </div>
        <div>
          <span>Name: </span>
          <span>{area.name}</span>
        </div>
        <div><Link to={`/update-area/` + area.id }>Update Area</Link></div>
        <div><button onClick={() => deleteAreaAction(area.id)}>Delete</button></div>
      </div>
    ))
  ) : (
    <div>No Areas to show</div>
  );
  return (
    <div>
      <span>Area Container</span>
      <div>{areaList}</div>
      <div><button><Link to="/add-areas">Add Area</Link></button></div>
    </div>
  );
};

export default Areas;
