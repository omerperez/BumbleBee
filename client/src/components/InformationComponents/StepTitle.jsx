import { Typography } from "@mui/material";
import React from "react";

export default function StepTitle({step}) {

  return (
    <div style={{ display: "grid" }}>
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 1,
          height: 40,
          lineHeight: 2,
        }}
      >
        <img src={step !== 5 ? `/${step + 1}.png` : "/claps.png"} width={55} />
      </div>
      <div
        style={{
          gridColumnStart: 2,
          gridColumnEnd: 90,
          height: 40,
          lineHeight: 4,
        }}
      >
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
