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
import styles from "../styles/pages/soilMoisture.module.scss";

//As variaveis constantes devem mantidas fora do render do component
//Não esquecer que o render do componente pode correr muitas vezes, quanto menos codigo desnecessario tiver melhor
const moment = extendMoment(originalMoment);
  const initGraphValues: graphLine[] = [
    { key: "S1T", color: "green" , label: "10cm"},
    { key: "S2T", color: "blue" , label: "25cm"},
    { key: "S3T", color: "orange" , label: "40cm"},
    { key: "S4T", color: "pink" , label: "55cm"}
  ];
  const sumGraphValues: graphLine[] = [{ key: "sum", color: "black" , label: "Sum"}];

const SoilMoisture: React.SFC<any> = props => {
  let soilMoistureService = useService(SoilMoistureService);
  const { id } = props.match.params;
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
