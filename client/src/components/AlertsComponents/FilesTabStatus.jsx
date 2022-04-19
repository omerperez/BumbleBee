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
      } else if (value == "3" && govil != null && dhl != null) {
        setFlag(false);
      } else if (value == "4" && shipping != null) {
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

  const isFiles = (files) => {
      if(files !== null ){
          setFlag(false);
      }else{
          setFlag(true)
      }
  }
  return (
    <Box sx={flag ? greyBg : regular}>
      <TabContext value={value} sx={{ background: "#D3D3D3" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab className="capital-letter" label="Payment" value="1" />
            <Tab className="capital-letter" label="Licenses" value="2" />
            <Tab className="capital-letter" label={"GovIL & DHL"} value="3" />
            <Tab className="capital-letter" label="Shipping" value="4" />
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
            <img className=" cur-pointer" src="/files/licenses.svg" width={"100%"} onClick={() => downloadFiles(licenses)} />
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
          {govil && dhl ? (
            <div className="d-flex justify-content-center cur-pointer">
              <div>
                <img src="/files/dhl.svg" width={"100%"} />
              </div>
              <div>
                <img src="/files/gov.svg" width={"100%"} />
              </div>
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
        <TabPanel value="4">
          {shipping ? (
            "Shipping"
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