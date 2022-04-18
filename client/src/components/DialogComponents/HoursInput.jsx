import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import EditProfile from "../Pages/EditProfile";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import MultipleSelectChip from "../authComponents/MultipleSelectChip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function HoursInput({
  title,
  valueStart,
  setValueStart,
  valueEnd,
  setValueEnd,
  activityDays,
  setActivityDays,
}) {
  const [check, setCheck] = useState(
    JSON.stringify(activityDays).indexOf(title) !== -1
  );
//   useEffect(() => {
   
//   }, [check]);

  const changeActivityDays = (e) => {
    setCheck(e.target.checked);
     if (check) {
       setActivityDays(activityDays + "," + title);
     } else {
       const days = activityDays.split(",").filter((day) => day !== title);
       setActivityDays(days.toString());
     }
  };

  return (
    <Form.Group id="days" className="mt-4 input-time-grid">
      <div className="ml-5 text-start">
        <span className="f-15" style={{ letterSpacing: 1.5 }}>
          {title}
        </span>
      </div>
      <div>
        <FormControlLabel
          onChange={(e) => changeActivityDays(e)}
          control={
            <Switch
              defaultChecked={check}
              color={"secondary"}
              //   style={check ? null : { color: "red" }}
            />
          }
          label={check ? "Open" : "Closed"}
        />
      </div>
      <div>
        {check ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start"
              value={valueStart}
              onChange={setValueStart}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : null}
      </div>
      <div style={{ margin: "auto", letterSpacing: 1.5 }}>
        {check ? <b>TO</b> : null}
      </div>
      <div>
        {check ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="End"
              value={valueEnd}
              onChange={setValueEnd}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : null}
      </div>
    </Form.Group>
  );
}
