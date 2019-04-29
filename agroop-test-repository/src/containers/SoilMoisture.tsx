import React, { useEffect, useState } from "react";
import { useService } from "rc-service";
import {
  SoilMoistureParams,
  SoilMoistureService
} from "../services/SoilMoistureService";
import Graph from "../components/Graph";
import {
  sumValues,
  filterSelectedValues,
  addSelectedValue,
  graphLine
} from "../utils/graphFilter";
import DateRangePickerSelector from "../components/DateRangePickerSelector";
import * as originalMoment from "moment";
import { extendMoment, DateRange } from "moment-range";
import styles from "../styles/layout/container.module.scss";

const moment = extendMoment(originalMoment);

const SoilMoisture: React.SFC<any> = props => {
  let soilMoistureService = useService(SoilMoistureService);
  const { id } = props.match.params;

  const initGraphValues: graphLine[] = [
    { key: "S1T", color: "green" },
    { key: "S2T", color: "blue" },
    { key: "S3T", color: "orange" },
    { key: "S4T", color: "pink" }
  ];
  const sumGraphValues: graphLine[] = [{ key: "sum", color: "black" }];

  let [graphSelectedValues, setGraphSelectedValues] = useState(initGraphValues);
  const today = moment();
  const [dates, setDates] = useState(
    moment.range(today.clone().subtract(7, "days"), today.clone())
  );

  const filterKey = (key: any, filter: any) => {
    filter === "true"
      ? filterSelectedValues(key, graphSelectedValues, setGraphSelectedValues)
      : addSelectedValue(
          key,
          initGraphValues,
          graphSelectedValues,
          setGraphSelectedValues
        );
  };

  const selectDates = (values: any) => {
    setDates(values);

    let beginDate = new Date(values.start);
    let endDate = new Date(values.end);

    let params: SoilMoistureParams = {
      beginDate: beginDate.getTime(),
      deviceID: id,
      endDate: endDate.getTime()
    };
    soilMoistureService.getSoilMoisture(params);
  };

  useEffect(() => {
    selectDates(dates);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__title_div}>
        <div className={styles.container__table}>
          <div className={styles.container__table__cell}>
            <h2 className={styles.container__title}>Device - {id}</h2>
          </div>
          <div className={styles.container__table__cell}>
            <DateRangePickerSelector
              dates={dates}
              selectDates={selectDates}
              today={today}
            />
          </div>
        </div>
      </div>
      <div>
          <Graph
            filterKey={filterKey}
            lines={graphSelectedValues}
            graphValues={soilMoistureService.state.soilMoisture}
            labels={initGraphValues}
          />
          <Graph
            lines={sumGraphValues}
            graphValues={sumValues(
              soilMoistureService.state.soilMoisture,
              graphSelectedValues
            )}
            labels={sumGraphValues}
          />
      </div>
    </div>
  );
};

export default SoilMoisture;
