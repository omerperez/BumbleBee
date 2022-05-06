import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent } from "@mui/material";
import { Button } from "react-bootstrap";
import HoursInput from "./HoursInput";
import { useAuth } from "../../contexts/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function EditActivityTimeDialog({
  activityDays,
  setActivityDays,
  setActivityDaysTime,
  createAccount,
}) {
  const { currentUser, editUserPropertiesWithoutImage } = useAuth();
  const matches = useMediaQuery("(min-height:570px)");

  const [open, setOpen] = useState(false);
  const [dealerActivityDays, setDealerActivityDays] = useState(
    activityDays.split(",")
  );
  const [startHour1, setStartHour1] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour1, setEndHour1] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour2, setStartHour2] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour2, setEndHour2] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour3, setStartHour3] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour3, setEndHour3] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour4, setStartHour4] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour4, setEndHour4] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour5, setStartHour5] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour5, setEndHour5] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour6, setStartHour6] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour6, setEndHour6] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const [startHour7, setStartHour7] = useState(
    new Date("2018-01-01T06:30:00.000Z").getTime()
  );
  const [endHour7, setEndHour7] = useState(
    new Date("2018-01-01T16:30:00.000Z")
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const activityDaysTimeChange = [
      {
        start: new Date(startHour1).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour1).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour2).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour2).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour3).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour3).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour4).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour4).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour5).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour5).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour6).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour6).toLocaleString("en-US").split(",")[1],
      },
      {
        start: new Date(startHour7).toLocaleString("en-US").split(",")[1],
        end: new Date(endHour7).toLocaleString("en-US").split(",")[1],
      },
    ];
    const stringActivityDays = dealerActivityDays
      .toString()
      .replace("[", "")
      .replace("]", "");
    if (createAccount && createAccount == true) {
      setActivityDaysTime(activityDaysTimeChange);
      setActivityDays(stringActivityDays);
      setOpen(false);
    } else {
      const edit = {
        _id: currentUser._id,
        activityDaysTime: activityDaysTimeChange,
        activityDays: stringActivityDays,
      };
      try {
        const results = await editUserPropertiesWithoutImage(edit);
        if (results._id === edit._id) {
          setOpen(false);
          window.location.reload();
        } else {
          console.log(results);
        }
      } catch (err) {}
    }
  };
  return (
    <div>
      {createAccount && createAccount == true ? (
        <Button
          onClick={handleClickOpen}
          className={"bg-purple no-border pad-purple-btn"}
        >
          Add Availability
        </Button>
      ) : (
        <div className="w-100 text-center mb-3">
          <Button
            onClick={handleClickOpen}
            className={"edit-profile-btn-dealer no-border"}
          >
            Edit Availability
          </Button>
        </div>
      )}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "25px",
            maxWidth: "1000px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          className="responsive-hour-dialog"
          style={{
            border: "none",
            borderRadius: "50px",
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            onClick={handleClose}
            className="d-flex justify-content-end cur-pointer color-red"
          >
            X
          </DialogTitle>
          <DialogContent>
            <h5 className="mb-4">Set Standard Hours</h5>
            <HoursInput
              title={"Sunday"}
              valueStart={startHour1}
              setValueStart={setStartHour1}
              valueEnd={endHour1}
              setValueEnd={setEndHour1}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={" Monday"}
              valueStart={startHour2}
              setValueStart={setStartHour2}
              valueEnd={endHour2}
              setValueEnd={setEndHour2}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={"Tuesday"}
              valueStart={startHour3}
              setValueStart={setStartHour3}
              valueEnd={endHour3}
              setValueEnd={setEndHour3}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={"Wednesday"}
              valueStart={startHour4}
              setValueStart={setStartHour4}
              valueEnd={endHour4}
              setValueEnd={setEndHour4}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={"Thursday"}
              valueStart={startHour5}
              setValueStart={setStartHour5}
              valueEnd={endHour5}
              setValueEnd={setEndHour5}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={"Friday"}
              valueStart={startHour6}
              setValueStart={setStartHour6}
              valueEnd={endHour6}
              setValueEnd={setEndHour6}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
            <HoursInput
              title={"Saturday"}
              valueStart={startHour7}
              setValueStart={setStartHour7}
              valueEnd={endHour7}
              setValueEnd={setEndHour7}
              activityDays={dealerActivityDays}
              setActivityDays={setDealerActivityDays}
            />
          </DialogContent>
          <DialogActions className="d-flex justify-content-center mt-3 mb-3">
            <div className="row">
              <div className="col mr-10px">
                <Button
                  onClick={() => setOpen(false)}
                  className="cancel-back w-100 no-border mw-95 color-white capital-letter ls-2"
                >
                  Cancel
                </Button>
              </div>
              <div className="col">
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className={
                    createAccount && createAccount == true
                      ? "bg-purple no-border w-100 mw-95 color-white capital-letter ls-2"
                      : "green-back no-border w-100 mw-95 color-white capital-letter ls-2"
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
