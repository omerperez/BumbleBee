import React from "react";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles, withStyles } from "@mui/styles";

const useStylesBase = makeStyles({
  buttonStyle: {
    width: 141,
    textTransform: "none",
    fontSize: 16,
    fontFamily: "Fira Sans Condensed",
    fontWeight: 400,
    letterSpacing: 0.15,
    backgroundColor: "#4679BF",
    height: 32,
    marginTop: 18,
    lineHeight: "24px",
    verticalAlign: "top",
    padding: "4px 16px 4px 16px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
});

export default function TableNoResults({ clearFilters, data, setReset, value }){
  const classesBase = useStylesBase();
  return (
    <Stack
      marginTop="-2px"
      border={"1px solid #CDCDCD"}
      alignItems={"center"}
      justifyContent={"center"}
      height={325}
      backgroundColor="#F5F6F7"
    >
      <text
        style={{
          color: "rgba(0, 0, 0, 0.87)",
          fontFamily: "Fira Sans Condensed",
          fontSize: "24px",
        }}
      >
        There's no Data to Present
      </text>
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

