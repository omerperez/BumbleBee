import React from "react";
import PageTitle from "../Layout/PageTitle";

export default function GovIL() {
  return (
    <>
      <PageTitle page={"Gov IL"} />
      <div className="d-flex justify-content-center h-75">
        <iframe
          className="w-75"
          src="https://www.gov.il/he/service/application-for-vehicles-personal-import/webhp?igu=1"
        ></iframe>
      </div>
    </>
  );
}
