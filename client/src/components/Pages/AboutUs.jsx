import React, {useState} from "react";
import PageTitle from "../Layout/PageTitle";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AboutUsBody from "../InformationComponents/AboutUsBody";
import StepTitle from "../InformationComponents/StepTitle";

const steps = [
  "Find the vehicle you want",
  "Contact the dealer",
  "Gov IL Form",
  "Broker Time",
  "DHL Label",
  "Last thing",
];

const stepsImages = [
  "/images/searching.png",
  "/images/call.png",
  "/images/gov.png",
  "/images/broker.png",
  "/images/dhl.png",
  "/images/con.png",
];
export default function AboutUs() {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };


  return (
    <>
      <PageTitle page={"About Us"} />
      <div className="pl-1 pr-1 w-75 f-lighter">
        {/* <h2 className="mb-3">Who we are ?</h2> */}
        <AboutUsBody />
      </div>
      <div className="pr-5 mt-4">
        <Box sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {index == activeStep ? (
                    <>
                      <img
                        width={40}
                        className="mb-1"
                        src={stepsImages[index]}
                      />
                      <br />
                    </>
                  ) : null}
                  {label + "   "}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <React.Fragment>
              <div className="mt-3 pl-1">
                <Typography className="mb-5">
                  <div
                    className="mt-4 mb-4"
                    style={{ alignItems: "center", display: "flex" }}
                  >
                    <StepTitle step={activeStep} />
                  </div>
                  <div className="f-lighter">
                    <AboutUsBody />
                  </div>
                </Typography>
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                  disabled={activeStep == steps.length - 1}
                >
                  Next
                </Button>
              </Box>
            </React.Fragment>
          </div>
        </Box>
      </div>
    </>
  );
}


