import React from "react";
import PageTitle from "../Layout/PageTitle";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AboutUsBody from "../InformationComponents/AboutUsBody";

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

  const [activeStep, setActiveStep] = React.useState(0);

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
        <h2 className="mb-3">Who we are ?</h2>
        <AboutUsBody />
        <AboutUsBody />
      </div>
      <div className="justify-content-center d-flex mt-4 pl-1 pr-1">
        <Box sx={{ width: "90%" }}>
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
              <div className="d-flex justify-content-center mt-4">
                <Typography className="mb-5">
                  <h1 className="text-center mb-4">
                    {activeStep === 0
                      ? "צעד ראשון"
                      : activeStep === 1
                      ? "צעד שני"
                      : activeStep === 2
                      ? "צעד שלישי"
                      : activeStep === 3
                      ? "צעד רביעי"
                      : activeStep === 4
                      ? "צעד חמישי"
                      : "תתחדש"}
                  </h1>
                  <AboutUsBody />
                  <AboutUsBody />
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


