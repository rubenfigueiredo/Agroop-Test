import React, { useEffect, useState } from "react";
import { useService } from "rc-service";
import {
  SoilMoistureParams,
  SoilMoistureService
} from "../services/SoilMoistureService";
import Graph from "../components/Graph";
import { sumValues } from "../utils/helpers";
import DatePickerSelector from "../components/DatePickerSelector";

const SoilMoisture: React.SFC<any> = props => {
  const { id } = props.match.params;
  let soilMoistureService = useService(SoilMoistureService);
  let params: SoilMoistureParams;
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

  let endDate: any = new Date();
  let beginDate: any = new Date();
  beginDate.setDate(endDate.getDate() - 7);

  params = {
    beginDate: beginDate.getTime(),
    deviceID: id,
    endDate: endDate.getTime()
  };
  console.log("rendered");

  useEffect(() => {
    soilMoistureService.getSoilMoisture(params);
  }, []);

  return (
    <div>
      <div>
        <DatePickerSelector />
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
