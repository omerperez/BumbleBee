import React, {useState} from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const days = [
  "Sunday",
  " Monday",
  "Tuesday",
  "Wednesday", 
  "Thursday",
  "Friday",
  "Saturday"
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [dayState, setDayState] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDayState(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Activity Days</InputLabel>
        <Select
          variant="standard"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={dayState}
          onChange={handleChange}
          // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          // MenuProps={MenuProps}
        >
          {days.map((day) => (
            <MenuItem
              key={day}
              value={day}
              style={getStyles(day, dayState, theme)}
            >
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
