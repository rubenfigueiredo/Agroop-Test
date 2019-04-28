import React, { useState, useEffect } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import * as originalMoment from "moment";

import { extendMoment } from "moment-range";
import { log } from "util";
const moment = extendMoment(originalMoment);

const DatePickerSelector: React.SFC<any> = props => {
  const today = moment();
  const [dates, setDates] = useState(
    moment.range(today.clone().subtract(7, "days"), today.clone())
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log("isOpen", isOpen);
  };
  const handleOnSelect = (value: any) => {
    setDates(moment.range(value.start._i, value.end._i));
    toggleOpen()
    console.log("dates", dates);
  };

  return (
    <div>
      <div onClick={toggleOpen}>
        <div>Selection</div>
        {dates.start.format("YYYY-MM-DD")}
        {" - "}
        {dates.end.format("YYYY-MM-DD")}
      </div>
      <div>
        {isOpen && (
          <DateRangePicker
            value={dates}
            onSelect={handleOnSelect}
            singleDateRange={false}
            numberOfCalendars={2}
          />
        )}
      </div>
    </div>
  );
};

export default DatePickerSelector;
