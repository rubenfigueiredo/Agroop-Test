import React, { useEffect, useState } from "react";
import { useService } from "rc-service";
import {
  SoilMoistureParams,
  SoilMoistureService
} from "../services/SoilMoistureService";
import Graph from "../components/Graph";
import { sumValues, filterSelectedValues, addSelectedValue, graphLine } from "../utils/graphFilter";
import DateRangePickerSelector from "../components/DateRangePickerSelector";

const SoilMoisture: React.SFC<any> = props => {

  let soilMoistureService = useService(SoilMoistureService);
  
  const initGraphValues: graphLine[] = [
    { key: "S1T", color: "green" },
    { key: "S2T", color: "blue" },
    { key: "S3T", color: "orange" },
    { key: "S4T", color: "pink" }
  ];
  const sumGraphValues: graphLine[] = [{ key: "sum", color: "black" }];

  let [graphSelectedValues, setGraphSelectedValues] = useState(initGraphValues);

  const filterKey = (key: any, filter: any) => {
    filter === "true"
      ? filterSelectedValues(key, graphSelectedValues, setGraphSelectedValues)
      : addSelectedValue(key, initGraphValues, graphSelectedValues, setGraphSelectedValues);
  };


  const selectDates = ({start, end}: any) => {
    
    let beginDate = new Date(start); 
    let endDate = new Date(end);
    
    const { id } = props.match.params;
    let params: SoilMoistureParams = {
      beginDate: beginDate.getTime(),
      deviceID: id,
      endDate: endDate.getTime()
    };
    soilMoistureService.getSoilMoisture(params);
  }

  return (
    <div>
      <div>
        <DateRangePickerSelector selectDates={selectDates} />
      </div>
      <div>
        <Graph
          filterKey={filterKey}
          lines={graphSelectedValues}
          graphValues={soilMoistureService.state.soilMoisture}
          labels={initGraphValues}
        />
      </div>
      <Graph
        lines={sumGraphValues}
        graphValues={sumValues(
          soilMoistureService.state.soilMoisture,
          graphSelectedValues
        )}
        labels={sumGraphValues}
      />
      <div />
    </div>
  );
};

export default SoilMoisture;
