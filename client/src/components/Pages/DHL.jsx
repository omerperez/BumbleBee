import React from "react";
import PageTitle from "../Layout/PageTitle";

export default function DHL() {
  return (
    <>
      <PageTitle page={"DHL Label Form"} />
      <div className="d-flex justify-content-center h-100">
        <iframe
          frameborder="0"
          style={{overflow: 'hidden', height: '257%', width: '100%' }}
          // style="overflow:hidden;height:100%;width:100%"
          height="100%"
          width="100%"
          src="https://mydhl.express.dhl/us/en/shipment.html#/#address-details/webhp?igu=1"
        ></iframe>
      </div>
    </>
    //
  );
}
