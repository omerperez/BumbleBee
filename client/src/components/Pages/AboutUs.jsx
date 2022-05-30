import React, { useState } from "react";
import PageTitle from "../Layout/PageTitle";
import AboutUsBody from "../InformationComponents/AboutUsBody";
import StepTitle from "../InformationComponents/StepTitle";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
} from "@mui/material";
import {
  clapsImage,
  error403,
  youtubeVideoAboutUs,
} from "../images/projectImages";

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
    <div className="ml-8">
      <PageTitle page={"About Us"} />
      <div className="w-75 f-lighter">
        <div className="f-19">
          <b>Importing</b> a vehicle is complex, however by doing the necessary
          research and learning the rules and limitations involved in the
          process, importing may be worthwhile. Bumblebee is a platform that
          helps you buy and import vehicles to Israel independently. The
          platform contains all the steps you need to consider as an independent
          importer, and helps you avoid additional cost and middleman. In
          Bumblebee you can see all the different vehicles you can buy and
          import. You can find a wide variety of cars, you may even get your
          hands on an unusual model that's not available to the Israeli market.
          Once you choose your car, you get the information you need about the
          documents you need to take care of. Bumblebee links you to relevant
          dealers and appraisers from Meches. You can communicate with them
          easily, and safely pass all documents needed. Once the transaction is
          done, Bumblebee gives you full visibility about your order status. You
          get a safe, easy and profitable end-to-end car import process.
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 mb-4">
        <iframe
          width="850"
          height="310"
          src={youtubeVideoAboutUs}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
                        src={index !== 5 ? stepsImages[index] : clapsImage}
                        onError={error403}
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
              <div className="mt-3">
                <Typography className="mb-5" component={"span"}>
                  <div className="mt-4 mb-4">
                    <StepTitle step={activeStep} />
                  </div>
                  <div className="f-lighter text-center">
                    <AboutUsBody step={activeStep + 1} />
                  </div>
                </Typography>
              </div>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  pt: 2,
                }}
              >
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
    </div>
  );
}


