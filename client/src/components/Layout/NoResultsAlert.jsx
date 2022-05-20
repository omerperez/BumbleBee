import React from "react";
import { Alert, Collapse } from "@mui/material";

export default function NoResultsAlert() {

    return (
      <Collapse in={true} sx={{ pl: 1, pr: 1 }}>
        <Alert sx={{ mb: 2, mt: 2 }} severity="info">
          No Results
        </Alert>
      </Collapse>
    );
}
