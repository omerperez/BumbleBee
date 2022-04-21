import React from "react";

export default function TotalAlertStatistic({ alerts }) {
  return (
    <>
      <div
        className="mt-5 d-flex justify-content-center row"
        style={{ marginLeft: "1.5%", marginRight: "1.5%" }}
      >
        <div className="col text-center">
          <span
            className="font-22"
            style={{ letterSpacing: 1.5, fontWeight: 100 }}
          >
            Total Licernses Request
          </span>
        </div>
        <div className="col text-center">
          <span
            className="font-22"
            style={{ letterSpacing: 1.5, fontWeight: 100 }}
          >
            Total Shipping Request
          </span>
        </div>
        <div className="col text-center">
          <span
            className="font-22"
            style={{ letterSpacing: 1.5, fontWeight: 100 }}
          >
            Total Cancel Request
          </span>
        </div>
        <div className="col text-center">
          <span
            className="font-22"
            style={{ letterSpacing: 1.5, fontWeight: 100 }}
          >
            Total Success Request
          </span>
        </div>
      </div>
      <div
        style={{
          border: "solid 1px #363636",
          marginLeft: "1.5%",
          marginRight: "1.5%",
          padding: 15,
        }}
        className="mt-2"
      >
        <div className="d-flex justify-content-center row">
          <div
            className="col text-center m-auto"
            style={{ borderRight: "solid 2px #363636" }}
          >
            <h1 className="f-19" style={{ fontWeight: 100 }}>
              {alerts.filter((alert) => alert.step == 1).length}
            </h1>
          </div>
          <div
            className="col text-center m-auto"
            style={{ borderRight: "solid 2px #363636" }}
          >
            <h1 className="f-19" style={{ fontWeight: 100 }}>
              {alerts.filter((alert) => alert.step == 3).length}
            </h1>
          </div>
          <div
            className="col text-center m-auto"
            style={{ borderRight: "solid 2px #363636" }}
          >
            <h1 className="f-19" style={{ fontWeight: 100 }}>
              {alerts.filter((alert) => alert.isCancelRequest == true).length}
            </h1>
          </div>
          <div className="col text-center m-auto">
            <h1 className="f-19" style={{ fontWeight: 100 }}>
              {alerts.filter((alert) => alert.step == 4).length}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}