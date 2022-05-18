import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from '@mui/lab/TabPanel';
import TabPanelText from "./TabPanelText";
import AlertLayout from "../AlertsComponents/AlertLayout";
import {removeDuplicateCompany} from "../../utils/functions";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Layout/Loading";

export default function UserMoreInfo({ currentUser, isUserPtofile }) {
  const { currentUser: myUser } = useAuth();
  const [alert, setAlert] = useState();
  const [companies, setCompanies] = useState();
  const [value, setValue] = useState(currentUser.role === 1 ? "2" : "1");
  const [loading, setLoading] = useState(true);

  const date = new Date(currentUser.dateOfCreate ?? null);
  date.setHours(0,0,0,0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

   const fetchData = () => {
     const alertsApi = `${process.env.REACT_APP_SERVER_API}/notification/client/${myUser._id}`;
     const userCarsApi = `${process.env.REACT_APP_SERVER_API}/car/user/${myUser._id}`;

     const getAlerts = axios.get(alertsApi);
     const getUserCars = axios.get(userCarsApi);

     axios.all([getAlerts, getUserCars]).then(
       axios.spread((...allData) => {
         const allAlerts = allData[0].data;
         const allCompanies = allData[1].data;
         setAlert(allAlerts.length > 0 ? allAlerts.length > 1 ? allAlerts.sort((a, b) => {
                    return new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate) ;
                  }) : allAlerts : []);
         setCompanies(allCompanies);
         setLoading(false);
       })
     );
   };

   useEffect(() => {
     fetchData();
   }, []);

   if(loading){
     return <Loading />
   }


  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            className="ls-1"
            aria-label="lab API tabs example"
          >
            <Tab
              className="capital-letter pad-0"
              label="More Inforamtion"
              value="1"
            />
            {currentUser.role === 1 && isUserPtofile ? (
              <Tab
                label="Request Status"
                className="capital-letter"
                value="2"
              />
            ) : null}
          </TabList>
        </Box>
        <TabPanel value="1" className="pad-0">
          <div className="mt-4 opacity-50 f-15 ls-less1">
            <b>Contact Information</b>
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
        </TabPanel>
        <TabPanel value="2" className={alert ? "p-5 mt-20" : "dis-bg"}>
          <div
            style={{ maxWidth: "100%", maxHeight: "350px", overflow: "auto" }}
          >
            {alert && alert.length > 0 ? (
              alert.map((showAlert) => {
                return <AlertLayout alert={showAlert} isDealer={false} />;
              })
            ) : (
              <div className="m-auto w-50 pad-10">
                <h4 className="fw-100 ls-1">No Requests Available</h4>
              </div>
            )}
          </div>
        </TabPanel>
        {currentUser.role === 2 ? (
          <>
            <TabPanelText
              title={"Manufacturer Types"}
              value={
                companies && companies.length > 0
                  ? removeDuplicateCompany(companies)
                  : "No Manufacturer Yet"
              }
            />
            <TabPanelText
              title={currentUser.website ? "Website" : "Website "}
              value={currentUser.website ?? "No Website"}
              isEditOption={isUserPtofile}
            />
          </>
        ) : null}
      </TabContext>
    </Box>
  );
}