import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function PageTitle({page}) {
  
  const matches = useMediaQuery("(max-width:515px)");

  return (
    <>
      <h2 className={matches ? "f-22" : "page-title-font"}>{page} </h2>
    </>
  );
}
