import React from "react";

export default function TotalAlertStatistic({ alerts }) {
  return (
    <>
      <div className="mt-5 d-flex justify-content-center row  mr-2 ml-2">
        <div className="col text-center">
          <span className="font-22 fw-100 ls-1">Total Licernses Request</span>
        </div>
        <div className="col text-center">
          <span className="font-22 fw-100 ls-1">Total Shipping Request</span>
        </div>
        <div className="col text-center">
          <span className="font-22 fw-100 ls-1">Total Cancel Request</span>
        </div>
        <div className="col text-center">
          <span className="font-22 fw-100 ls-1">Total Success Request</span>
        </div>
      </div>
      <div className="mt-2 mr-2 ml-2 p-15 border-1-black">
        <div className="d-flex justify-content-center row">
          <div className="col text-center m-auto br-black">
            <h1 className="f-19 fw-100">
              {alerts.filter((alert) => alert.step == 1).length}
            </h1>
          </div>
          <div className="col text-center m-auto br-black">
            <h1 className="f-19 fw-100">
              {alerts.filter((alert) => alert.step == 3).length}
            </h1>
          </div>
          <div className="col text-center m-auto br-black">
            <h1 className="f-19 fw-100">
              {alerts.filter((alert) => alert.isCancelRequest == true).length}
            </h1>
          </div>
          <div className="col text-center m-auto">
            <h1 className="f-19 fw-100">
              {alerts.filter((alert) => alert.step == 4).length}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}