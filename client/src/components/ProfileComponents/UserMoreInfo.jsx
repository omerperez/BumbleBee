import React, {useState} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Link } from "react-router-dom";
import TabPanel from '@mui/lab/TabPanel';
import UserFilesCard from "./UserFilesCard";
import TabPanelText from "./TabPanelText";

export default function UserMoreInfo({ currentUser, isUserPtofile }) {
  const [value, setValue] = useState("1");
  const date = new Date(currentUser.dateOfCreate ?? null);
  date.setHours(0,0,0,0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            style={{ letterSpacing: "1.5px" }}
          >
            <Tab
              style={{ padding: "0" }}
              className="capital-letter"
              label="More Inforamtion"
              value="1"
            />
            {currentUser.role === 1 && isUserPtofile ? (
              <Tab label="Files Status" className="capital-letter" value="2" />
            ) : null}
          </TabList>
        </Box>
        <TabPanel value="1" style={{ padding: 0 }}>
          <div
            className="mt-4 opacity-50"
            style={{ fontSize: 15, fontWeight: 600, letterSpacing: 1 }}
          >
            Contact Information
          </div>
          <TabPanelText
            title={"Phone"}
            value={currentUser.phoneNumber}
            isEditOption={isUserPtofile}
          />
          <TabPanelText
            title={"E-mail"}
            value={currentUser.email}
            isEditOption={isUserPtofile}
          />
        </TabPanel>
        {currentUser.role === 1 && isUserPtofile ? (
          <TabPanel value="2" style={{ padding: 5, marginTop: 20 }}>
            <UserFilesCard />
          </TabPanel>
        ) : null}
        {currentUser.role == 2 ? (
          <>
            <TabPanelText
              title={"Manufacturer Types"}
              value={"Audi, BMW, Nissan, Kia, Mini"}
            />
            <TabPanelText
              title={"Website"}
              value={"www.mobile.de.com"}
              isEditOption={isUserPtofile}
            />
          </>
        ) : null}
        <TabPanelText
          title={"Registration Date"}
          value={
            currentUser.dateOfCreate
              ? date.getDate().toString().padStart(2, "0") +
                "." +
                (date.getMonth() + 1).toString().padStart(2, "0") +
                "." +
                date.getFullYear()
              : "12.03.2022"
          }
        />
      </TabContext>
    </Box>
  );
}