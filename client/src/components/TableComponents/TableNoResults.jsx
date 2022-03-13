import React from "react";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { noResultsStyles } from "../../styles/UseStylesMui";

export default function TableNoResults({ clearFilters, data, setReset, value }){
  const classesBase = noResultsStyles();
  return (
    <Stack
      marginTop="-2px"
      border={"1px solid #CDCDCD"}
      alignItems={"center"}
      justifyContent={"center"}
      height={325}
      backgroundColor="#F5F6F7"
    >
      <text className="font-24">There's no Data to Present</text>
      <text
        style={{
          color: "rgba(0, 0, 0, 0.76)",
          fontFamily: "Fira Sans Condensed",
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        Do you want to clear the applied filters?
      </text>
      <Button
        variant="contained"
        disableElevation
        className={classesBase.buttonStyle}
        onClick={() => {
          clearFilters(data);
          setReset(!value);
        }}
      >
        Yes, Clear Filters
      </Button>
    </Stack>
  );
};

