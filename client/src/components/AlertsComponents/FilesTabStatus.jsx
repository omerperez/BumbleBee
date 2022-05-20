import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {downloadFiles } from "../../utils/functions";
import { error403 } from "../images/projectImages";

export default function FilesTabStatus({ step, payment, licenses, govil, dhl, shipping }) {
  const [value, setValue] = useState(step);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
      if (value == "1" && payment != null && payment.length > 0) {
        setFlag(false);
      } else if (value == "2" && licenses != null && licenses.length > 0) {
        setFlag(false);
      } else if (value == "3" && govil != null && govil.length > 0) {
        setFlag(false);
      } else if (value == "4" && dhl != null && dhl.length > 0) {
        setFlag(false);
      } else if (value == "5" && shipping != null && shipping.length > 0) {
        setFlag(false);
      } else {
        setFlag(true);
      }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
  const greyBg = { width: "100%", border: "solid 1px black", height: "100%", background: "#D3D3D3" };
  const regular = {
    width: "100%",
    border: "solid 1px black",
    height: "100%",
  };

  return (
    <Box sx={flag ? greyBg : regular}>
      <TabContext value={value} sx={{ background: "#D3D3D3" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab className="capital-letter" label="Payment" value="1" />
            <Tab className="capital-letter" label="Licenses" value="2" />
            <Tab className="capital-letter" label={"Gov IL"} value="3" />
            <Tab className="capital-letter" label={"DHL"} value="4" />
            <Tab className="capital-letter" label="Container" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {payment && payment.length > 0 ? (
            <div className="d-flex justify-content-center">
              <img
                className="cur-pointer mw-400"
                src="/files/payment.svg"
                width={"100%"}
                onClick={() => downloadFiles(payment, process.env.REACT_APP_S3)}
                onError={error403}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center p-25-0">
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="2">
          {licenses && licenses.length > 0 ? (
            <div className="d-flex justify-content-center">
              <img
                className=" cur-pointer mw-400"
                src="/files/licenses.svg"
                width={"100%"}
                onClick={() =>
                  downloadFiles(licenses, process.env.REACT_APP_S3)
                }
                onError={error403}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center p-25-0">
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="3">
          {govil && govil.length > 0 ? (
            <div className="d-flex justify-content-center">
              <img
                className="cur-pointer mw-400"
                src="/files/gov.svg"
                width={"100%"}
                onClick={() => downloadFiles(govil, process.env.REACT_APP_S3)}
                onError={error403}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center p-25-0">
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="4">
          {dhl && dhl.length > 0 ? (
            <div className="d-flex justify-content-center">
              <img
                className=" cur-pointer mw-400"
                src="/files/dhl.svg"
                width={"100%"}
                onClick={() => downloadFiles(dhl, process.env.REACT_APP_S3)}
                onError={error403}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center p-25-0">
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="5">
          {shipping && shipping.length > 0 ? (
            <img
              className=" cur-pointer mw-400"
              src="/files/shipping.svg"
              width={"100%"}
              onClick={() => downloadFiles(shipping, process.env.REACT_APP_S3)}
              onError={error403}
            />
          ) : (
            <div className="d-flex justify-content-center p-25-0">
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}