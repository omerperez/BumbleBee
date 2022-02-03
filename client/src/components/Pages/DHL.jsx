import React from "react";
import PageTitle from "../Layout/PageTitle";

export default function DHL() {
  return (
    <>
      <PageTitle page={"DHL Label Form"} />
      <div className="d-flex justify-content-center h-75">
        <iframe
          className="w-75"
          src="https://mydhl.express.dhl/us/en/shipment.html#/#address-details/webhp?igu=1"
        ></iframe>
      </div>
    </>
    //
  );
}
