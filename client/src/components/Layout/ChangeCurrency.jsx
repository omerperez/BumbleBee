import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function ChangeCurrency({flag, setFlag}) {

  const changeFlag = () => setFlag(!flag);
  return (
    <ButtonGroup disableElevation variant="contained">
      <Button variant={flag ? "contained" : "outlined"} onClick={changeFlag}>
        USD
      </Button>
      <Button variant={!flag ? "contained" : "outlined"} onClick={changeFlag}>
        EUR
      </Button>
    </ButtonGroup>
  );
}
