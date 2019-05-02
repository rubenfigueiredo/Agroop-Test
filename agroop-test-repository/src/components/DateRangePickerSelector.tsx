import React, { useState, useEffect } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import styles from "../styles/layout/datePicker.module.scss";

interface IDateRangePickerSelectorProps {
  selectDates: (value: any) => void;
  dates: any;
  today: any;
}
const DateRangePickerSelector: React.SFC<IDateRangePickerSelectorProps> = ({
  selectDates,
  dates,
  today
}) => {
  const [isOpen, setIsOpen] = useState(false);
  //console.log("rendered dates", dates);

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };
  const handleOnSelect = (values: any): void => {
    selectDates(values);
    toggleOpen();
  };

  return (
    <div>
      <div onClick={toggleOpen} className={styles.datePicker__input_box}>
          {dates.start.format("YYYY-MM-DD")}
          {" - "}
          {dates.end.format("YYYY-MM-DD")}
      </div>
      <div className={styles.datePicker__calendar_wrapper}>
        {isOpen && (
          <DateRangePicker
            value={dates}
            minimumDate={
              new Date(
                today
                  .clone()
                  .subtract(3, "years")
                  .format("YYYY-MM-DD")
              )
            }
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
