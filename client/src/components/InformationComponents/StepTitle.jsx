import React from "react";
import { Typography } from "@mui/material";
import {clapsImage, error403} from "../images/projectImages"

export default function StepTitle({step}) {

  return (
    <div className="d-grid">
      <img src={step !== 5 ? `/${step + 1}.png` : clapsImage} width={55} onError={error403} />
      <div className="step-grid">
        <Typography component={"span"} variant={"h4"}>
          {step === 0
            ? "First Step"
            : step === 1
            ? "Second Step"
            : step === 2
            ? "Third step"
            : step === 3
            ? "Fourth step"
            : step == 4
            ? "Step Five"
            : "Will be renewed!"}
        </Typography>
      </div>
    </div>
  );
}
