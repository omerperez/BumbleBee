import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Searching new car",
  "Payment For Car",
  "Waiting For Licenses Docs",
  "Dealer Wait For DHL & GOV IL Docs",
  "Waiting For Shipping Docs",
  "Car Arrived",
];

export default function RequestSteps({step}) {
  return (
    <Box sx={{ width: "85%", textAlign: "center" }}>
      <h3 className="fw-100 d-flex text-start pl-1">
        Request Steps
      </h3>
      <Stepper activeStep={step ? step + 1 : 1} alternativeLabel className="mt-5">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
