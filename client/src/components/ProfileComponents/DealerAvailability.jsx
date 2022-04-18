import React from "react";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import EditActivityTimeDialog from "../DialogComponents/EditActivityTimeDialog";

export default function DealerAvailability({ activityDays, activityDaysTime }) {
  return (
    <>
      <div className="mt-3">
        <div className="opc-8 row">
          <div
            style={{ fontWeight: 300, fontSize: 20, letterSpacing: 2 }}
            className="col-3 col-sm-4"
          >
            Availability
          </div>
          <Divider className="col" style={{ margin: "auto" }} />
        </div>
        <div className="d-flex justify-content-center"></div>
      </div>
      <div className="opc-8 days-grid mt-2" style={{ fontWeight: 100 }}>
        <div>Sunday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Sunday") !== -1 ? (
            `${activityDaysTime[0].start} - ${activityDaysTime[0].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Monday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Monday") !== -1 ? (
            `${activityDaysTime[1].start} - ${activityDaysTime[1].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Tuesday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Tuesday") !== -1 ? (
            `${activityDaysTime[2].start} - ${activityDaysTime[2].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Wednesday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Wednesday") !== -1 ? (
            `${activityDaysTime[3].start} - ${activityDaysTime[3].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Thursday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Thursday") !== -1 ? (
            `${activityDaysTime[4].start} - ${activityDaysTime[4].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Friday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Friday") !== -1 ? (
            `${activityDaysTime[5].start} - ${activityDaysTime[5].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Saturday</div>
        <div style={{ textAlign: "end" }}>
          {JSON.stringify(activityDays).indexOf("Saturday") !== -1 ? (
            `${activityDaysTime[6].start} - ${activityDaysTime[6].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
      </div>
      <EditActivityTimeDialog activityDays={activityDays} activityDaysTime={activityDaysTime} />
    </>
  );
}
