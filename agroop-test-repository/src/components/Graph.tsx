import React, { useEffect } from "react";
import moment from "moment";
import styles from "../styles/layout/graph.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { graphLine } from "../utils/graphFilter";

interface IGraphProps {
  filterKey?: (key: any, filter: string | boolean) => void,
  lines: graphLine[],
  graphValues: any[],
  labels: graphLine[]
}
const Graph: React.SFC<IGraphProps> = ({ graphValues, lines, labels, filterKey }) => {
  const toggleFilterKey = filterKey ? (e: any) => {
    e.persist();
    const data = e.target.dataset;
    if (data.filter === "false") {
      data.filter = "true";
    } else {
      data.filter = "false";
    }
    filterKey(data.key, data.filter);
  } : null;

  const Labels = labels.map((label: graphLine) => {
    return (
      <div key={label.key} style={{cursor: 'pointer'}}>
        {toggleFilterKey ? (
          <div
            data-key={label.key}
            data-filter={false}
            onClick={toggleFilterKey}
          >
            {label.key}
          </div>
        ) : (
          <div>{label.key}</div>
        )}
      </div>
    );
  });

  const Lines = lines.map((line: any) => {
    return (
      <Line
        key={line.key}
        type="monotone"
        dataKey={line.key}
        stroke={line.color}
        dot={false}
      />
    );
  });

  const TooltipContent = ({active, payload, label}: any) => {
    if(active){
      let result = payload && payload.map((value: any) => {
        return <div key={value.name}><p>{value.name}</p>{value.value}</div>
      });
      return <div><div>{result}</div><div>{moment(label).format("MMMM Do YYYY, h:mm:ss a")}</div></div>;
    }
    return null;
  }

  return (
    <div className={styles.graph__wrapper}>
      <LineChart
        width={800}
        height={400}
        data={graphValues}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="timestamp" hide={true} />
        <YAxis />
        <Tooltip cursor={false} content={TooltipContent}/>
        <CartesianGrid vertical={false} horizontal={true} />
        {Lines}
      </LineChart>
      <div>{Labels}</div>
    </div>
  );
};

export default Graph;
