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
      <Stepper activeStep={step ? step + 1 : 1 } alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}