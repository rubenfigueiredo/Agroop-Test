import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const Graph: React.SFC<any> = ({ graphValues, lines, labels, filterKey }) => {

  const toggleFilterKey = (e: any) => {
    e.persist();
    const data = e.target.dataset;
    if (data.filter === "false") {
      data.filter = "true";
    } else {
      data.filter = "false";
    }
    filterKey(data.key, data.filter);
  };

  const Labels = labels.map((label: any) => {
    return (
      <div key={label.key} style={{cursor: 'pointer'}}>
        {filterKey ? (
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

  return (
    <div>
      <LineChart
        width={700}
        height={300}
        data={graphValues}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="timestamp" hide={true} />
        <YAxis />
        <Tooltip cursor={false} />
        <CartesianGrid vertical={false} horizontal={true} />
        {Lines}
      </LineChart>
      <div>{Labels}</div>
    </div>
  );
};

export default Graph;