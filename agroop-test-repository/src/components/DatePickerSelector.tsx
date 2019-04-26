import React, { useState, useEffect } from "react";
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css' // For some basic styling. (OPTIONAL)

const DatePickerSelector: React.SFC<any> = props => {
  //const end: any = new Date();
  //const begin: any = new Date();
  //begin.setDate(end.getDate() - 7);
  let start =  moment().subtract(7, "days");
  let end =  moment();
  const [dates, setDates] = useState();

  const onChangeDate = (values: any) => {
    //setDates(value);
    console.log("values", values);
  };

  return (
    <div>
      <DateRangePicker
        numberOfCalendars={2}
        selectionType='range'
        />
    </div>
  );
};

export default DatePickerSelector;
