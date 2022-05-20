import React, { useState } from "react";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertOfAccess() {
    const [open, setOpen] = useState(true);
        
    return (
      <Collapse in={open} sx={{ pl: 1, pr: 1 }}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 1, mt: 1 }}
        >
          <AlertTitle>Access Warning</AlertTitle>
          Please login with the user with access to the desired page
        </Alert>
      </Collapse>
    );
}
