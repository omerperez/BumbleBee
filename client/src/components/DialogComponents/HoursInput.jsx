import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import {
  TextField,
  Switch,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";

export default function HoursInput({
  title,
  valueStart,
  setValueStart,
  valueEnd,
  setValueEnd,
  activityDays,
  setActivityDays,
}) {
  const matches = useMediaQuery("(max-width:1060px)");
  const [check, setCheck] = useState(
    activityDays && (activityDays).indexOf(title) != -1
  );
  useEffect(() => {
   if (check) {
     setActivityDays([...activityDays, title]);
   } else {
     setActivityDays(
       activityDays ? activityDays.filter((day) => day.indexOf(title) == -1) : []
     );
   }
  }, [check]);

  const changeActivityDays = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <Form.Group
      id="days"
      className={
        matches
          ? "grid-dialog mt-3 input-time-grid m-auto"
          : "grid-dialog mt-4 input-time-grid"
      }
    >
      <div className="ml-5 text-start">
        <span className="f-15 ls-1">{title}</span>
      </div>
      <div>
        <FormControlLabel
          onChange={(e) => changeActivityDays(e)}
          control={<Switch defaultChecked={check} color={"secondary"} />}
          label={check ? "Open" : "Closed"}
        />
      </div>
      <div className={matches ? "m-1" : ""}>
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
      {matches ? null : (
        <div className="m-auto ls-1">{check ? <b>TO</b> : null}</div>
      )}
      <div className={matches ? "m-1" : "" }>
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
