import React from "react";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import EditActivityTimeDialog from "../DialogComponents/EditActivityTimeDialog";

export default function DealerAvailability({ activityDays, activityDaysTime }) {
  return (
    <>
      <div className="mt-3">
        <div className="opc-8 row">
          <div className="col-3 col-sm-4 fw-100 ls-2 font-22">Availability</div>
          <Divider className="col m-auto" />
        </div>
        <div className="d-flex justify-content-center"></div>
      </div>
      <div className="opc-8 days-grid mt-2 fw-100">
        <div>Sunday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Sunday") !== -1 ? (
            `${activityDaysTime[0].start} - ${activityDaysTime[0].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Monday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Monday") !== -1 ? (
            `${activityDaysTime[1].start} - ${activityDaysTime[1].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Tuesday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Tuesday") !== -1 ? (
            `${activityDaysTime[2].start} - ${activityDaysTime[2].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Wednesday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Wednesday") !== -1 ? (
            `${activityDaysTime[3].start} - ${activityDaysTime[3].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Thursday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Thursday") !== -1 ? (
            `${activityDaysTime[4].start} - ${activityDaysTime[4].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Friday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Friday") !== -1 ? (
            `${activityDaysTime[5].start} - ${activityDaysTime[5].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Saturday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Saturday") !== -1 ? (
            `${activityDaysTime[6].start} - ${activityDaysTime[6].end}`
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
      </div>
      <EditActivityTimeDialog
        activityDays={activityDays}
        activityDaysTime={activityDaysTime}
      />
    </>
  );
}
