import React from "react";
import { Link } from 'react-router-dom'
import {Area} from '../services/AreaService';

interface IAreaProps {
  areas?: Area[]
}

const AreaList: React.SFC<IAreaProps> = ({ areas }) => {
  
  const areaList = areas ? (
    areas.map((area: any) => (
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
      </div>
    ))
  ) : (
    <div>No Areas to show</div>
  );
  return <React.Fragment>{areaList}</React.Fragment>;
};

export default AreaList;
