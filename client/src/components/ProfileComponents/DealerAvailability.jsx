import React from "react";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import EditActivityTimeDialog from "../DialogComponents/EditActivityTimeDialog";
import { getTimeAvailabilityFormat } from "../../utils/functions";

export default function DealerAvailability({ activityDays, activityDaysTime, isCanEdit }) {
  return (
    <>
      <div className="mt-3">
        <div className="opc-8 row">
          <div className="col-8 col-sm-6 col-md-7 col-lg-6 fw-100 ls-2 font-22">Availability</div>
          <Divider className="col m-auto" />
        </div>
        <div className="d-flex justify-content-center"></div>
      </div>
      <div className="opc-8 days-grid mt-2 fw-100">
        <div>Sunday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Sunday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[0])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Monday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Monday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[1])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Tuesday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Tuesday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[2])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Wednesday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Wednesday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[3])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Thursday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Thursday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[4])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Friday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Friday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[5])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
        <div>Saturday</div>
        <div className="text-end">
          {JSON.stringify(activityDays).indexOf("Saturday") !== -1 ? (
            getTimeAvailabilityFormat(activityDaysTime[6])
          ) : (
            <CloseIcon color="error" />
          )}
        </div>
      </div>
      {isCanEdit ? 
      <div className="mt-4">
        <EditActivityTimeDialog
          activityDays={activityDays}
          activityDaysTime={activityDaysTime}
        />
      </div> : null
      }
    </>
  );
}
