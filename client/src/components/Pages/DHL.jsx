import React from "react";
import PageTitle from "../Layout/PageTitle";
 
export default function DHL() {
  return (
    <div style={{ height: '100%'}}>
      <PageTitle page={"DHL Label Form"} />
      <div className="d-flex justify-content-center h-100">
        <iframe 
          title="dhl"
          frameborder="0"
          style={{overflow: 'hidden', height: '380%', width: '100%' }}
          src="https://mydhl.express.dhl/us/en/shipment.html#/#address-details/webhp?igu=1"
        ></iframe>
      </div>
    </div>
  );
}
