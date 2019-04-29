import React, { useState, useEffect } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import * as originalMoment from "moment";
import { extendMoment, DateRange } from "moment-range";

const moment = extendMoment(originalMoment);
interface IDateRangePickerSelectorProps {
  selectDates: (value : DateRange) => void
}
const DateRangePickerSelector: React.SFC<IDateRangePickerSelectorProps> = ({selectDates}) => {
  const today = moment();
  const [dates, setDates] = useState(moment.range(today.clone().subtract(7, "days"), today.clone()));
  const [isOpen, setIsOpen] = useState(false);
  const updateDates = (values:any) => {
    setDates(values);
  }
  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };
  const handleOnSelect = (value: DateRange): void => {
    updateDates(moment.range(value.start, value.end));
    toggleOpen();
  };
  useEffect(() => {
    selectDates(dates);
  }, [dates]);

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
            minimumDate={new Date(today.clone().subtract(3, "years").format("YYYY-MM-DD"))}
            maximumDate={new Date(today.clone().format("YYYY-MM-DD"))}
            onSelect={handleOnSelect}
            singleDateRange={false}
            numberOfCalendars={2}
          />
        )}
      </div>
    </div>
  );
};

export default DateRangePickerSelector;
