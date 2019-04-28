import React, { useEffect, useState } from "react";
import { useService } from "rc-service";
import {
  SoilMoistureParams,
  SoilMoistureService
} from "../services/SoilMoistureService";
import Graph from "../components/Graph";
import { sumValues } from "../utils/helpers";
import DateRangePickerSelector from "../components/DateRangePickerSelector";

const SoilMoisture: React.SFC<any> = props => {

  let soilMoistureService = useService(SoilMoistureService);
  const initGraphValues = [
    { key: "S1T", color: "green" },
    { key: "S2T", color: "blue" },
    { key: "S3T", color: "orange" },
    { key: "S4T", color: "pink" }
  ];
  let [graphSelectedValues, setGraphSelectedValues] = useState(initGraphValues);

  const filterSelectedValues = (key: any, array: any[]) => {
    let result = graphSelectedValues.filter(value => {
      return value.key !== key;
    });
    setGraphSelectedValues(result);
  };

  const addSelectedValue = (
    key: any,
    initValues: any[],
    currentValues: any[]
  ) => {
    let currArrayCopy = [...currentValues];
    initValues.forEach((value, index) => {
      if (value.key === key) {
        currArrayCopy.splice(index, 0, value);
      }
    });
    setGraphSelectedValues(currArrayCopy);
  };

  const filterKey = (key: any, filter: any) => {
    filter === "true"
      ? filterSelectedValues(key, graphSelectedValues)
      : addSelectedValue(key, initGraphValues, graphSelectedValues);
  };


  const selectDates = ({start, end}: any) => {
    
    let beginDate = new Date(start); 
    let endDate = new Date(end);
    console.log("beginDate", beginDate);
    
    const { id } = props.match.params;
    let params = {
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
        lines={[{ key: "sum", color: "black" }]}
        graphValues={sumValues(
          soilMoistureService.state.soilMoisture,
          graphSelectedValues
        )}
        labels={[{ key: "sum", color: "black" }]}
      />
      <div />
    </div>
  );
};

export default SoilMoisture;
