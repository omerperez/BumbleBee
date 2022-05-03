import React, { forwardRef , useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { notificationTitle } from "./AlertFunction";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert({isOpen, step, name}) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} style={{ marginLeft: "auto" }}>
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {notificationTitle(name, step)}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
