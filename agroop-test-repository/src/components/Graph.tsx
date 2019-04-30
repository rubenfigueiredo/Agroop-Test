import React, { useEffect } from "react";
import moment from "moment";
import styles from "../styles/layout/graph.module.scss";
import {
  LineChart,
  ResponsiveContainer,
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
  //console.log("graphValues", graphValues);
  
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
      <div key={label.key} className={styles.graph__label}>
        {toggleFilterKey ? (
          <div
            data-key={label.key}
            data-filter={false}
            onClick={toggleFilterKey}
            style={{"color": label.color}}
          >
            {label.label}
          </div>
        ) : (
          <div>{label.label}</div>
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
    <div className={styles.graph_wrapper}>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
          data={graphValues}
        >
          <XAxis dataKey="timestamp" hide={true} />
          <YAxis />
          <Tooltip cursor={false} content={TooltipContent}/>
          <CartesianGrid vertical={false} horizontal={true} />
          {Lines}
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.graph__label_div}>{Labels}</div>
    </div>
  );
};

export default Graph;
