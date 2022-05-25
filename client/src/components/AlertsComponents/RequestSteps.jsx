import * as React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";

const steps = [
  "Searching new car",
  "Payment For Car",
  "Waiting For Licenses Docs",
  "Dealer Wait For DHL & GOV IL Docs",
  "Waiting For Shipping Docs",
  "Car Arrived",
];

export default function RequestSteps({ step, matches770 }) {
  return (
    <Box
      sx={
        matches770
          ? { width: "100%", textAlign: "center" }
          : { width: "85%", textAlign: "center" }
      }
    >
      <h3 className="fw-100 d-flex text-start pl-1">Request Steps</h3>
      <Stepper
        activeStep={step && step !== 5 ? step + 1 : 1}
        alternativeLabel={matches770 ? false : true}
        className="mt-5"
        orientation={matches770 ? "vertical" : "horizontal"}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
