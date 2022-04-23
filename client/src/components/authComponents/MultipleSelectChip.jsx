import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const days = [
  "Sunday",
  " Monday",
  "Tuesday",
  "Wednesday", 
  "Thursday",
  "Friday",
  "Saturday"
];

export default function MultipleSelectChip({ dayState, setDayState, status }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDayState(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ width: "100%", maxWidth: 220 }} value={dayState}>
      <InputLabel id="demo-multiple-chip-label">Activity Days</InputLabel>
      <Select
        variant="standard"
        className="mw-220"
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={dayState}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        disabled={status}
      >
        {days.map((day) => (
          <MenuItem key={day} value={day}>
            <Checkbox checked={dayState.indexOf(day) > -1} />
            <ListItemText primary={day} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
