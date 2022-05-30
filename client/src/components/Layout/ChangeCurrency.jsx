import React from "react";
import { ButtonGroup, Button } from "@mui/material";

export default function ChangeCurrency({flag, setFlag}) {

  const changeFlag = () => setFlag(!flag);
  return (
    <ButtonGroup disableElevation variant="contained" sx={{ height: '100%', width: '100%'}}>
      <Button variant={flag ? "contained" : "outlined"} onClick={changeFlag}>
        USD
      </Button>
      <Button variant={!flag ? "contained" : "outlined"} onClick={changeFlag}>
        EUR
      </Button>
    </ButtonGroup>
  );
}
