import React, { useContext } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { ThemeContext } from '../../themeProvider';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const CustomDateTimePicker = ({ placeholder, value, onChange }: any) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Datetime
        inputProps={{ placeholder }}
        className={`datetime-picker ${theme === 'Light' ? 'light-mode' : null}`}
        timeFormat={true}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomDateTimePicker;
