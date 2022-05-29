import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function PageTitle({page}) {
  
  const matches = useMediaQuery("(max-width:515px)");
  const matches400 = useMediaQuery("(max-width:400px)");

  return matches400 ? (
    <h2 className="f-18" >{page} </h2>
  ) : (
    <h2 className={matches ? "f-22" : "page-title-font"}>{page} </h2>
  );
}
