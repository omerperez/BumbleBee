import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {downloadFiles, downloadFile } from "../../utils/functions";

export default function FilesTabStatus({ step, payment, licenses, govil, dhl, shipping }) {
  const [value, setValue] = useState(step);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
      if (value == "1" && payment != null) {
        setFlag(false);
      } else if (value == "2" && licenses != null) {
        setFlag(false);
      } else if (value == "3" && govil != null) {
        setFlag(false);
      } else if (value == "4" && dhl != null) {
        setFlag(false);
      } else if (value == "5" && shipping != null) {
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
          {payment ? (
            <img src="/files/payment.svg" width={"100%"} />
          ) : (
            <div
              className="d-flex justify-content-center"
              style={{ padding: "25% 0" }}
            >
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="2">
          {licenses ? (
            <div className="d-flex justify-content-center">
              <img
                className=" cur-pointer"
                src="/files/licenses.svg"
                width={"100%"}
                style={{ maxWidth: 400 }}
                onClick={() => downloadFiles(licenses)}
              />
            </div>
          ) : (
            <div
              className="d-flex justify-content-center"
              style={{ padding: "25% 0" }}
            >
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="3">
          {govil ? (
            <img
              className=" cur-pointer"
              src="/files/gov.svg"
              width={"100%"}
              onClick={() => downloadFiles(govil)}
            />
          ) : (
            <div
              className="d-flex justify-content-center"
              style={{ padding: "25% 0" }}
            >
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="4">
          {dhl ? (
            <img
              className=" cur-pointer"
              src="/files/dhl.svg"
              width={"100%"}
              onClick={() => downloadFiles(dhl)}
            />
          ) : (
            <div
              className="d-flex justify-content-center"
              style={{ padding: "25% 0" }}
            >
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
        <TabPanel value="5">
          {shipping ? (
            <img
              className=" cur-pointer"
              src="/files/shipping.svg"
              width={"100%"}
              onClick={() => downloadFiles(shipping)}
            />
          ) : (
            <div
              className="d-flex justify-content-center"
              style={{ padding: "25% 0" }}
            >
              <h3>Files Not Available</h3>
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}