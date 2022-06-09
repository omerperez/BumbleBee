import React, { useState, useEffect } from "react";
import PageTitle from "../Layout/PageTitle";
import Loading from "../Layout/Loading";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AlertLayout from "../AlertsComponents/AlertLayout";
import TotalAlertStatistic from "../AlertsComponents/TotalAlertStatistic";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OrderStatus() {
   const { currentUser } = useAuth();
   const [loading, setLoading] = useState(true);
   const [alerts, setAlerts] = useState(null);
   const [newAlerts, setNewAlerts] = useState([]);
   const [state, setState] = useState({ num: 0 });
   const [maxAlertDate, setMaxAlertDate] = useState();
   const [sort, setSort] = useState(1);
   const [filterState, setFilterState] = useState(0);
   const matches = useMediaQuery("(max-width:600px)");

   useEffect(() => {
     fetch(
       `${process.env.REACT_APP_SERVER_API}/notification/user/${
         currentUser._id
       }/${state.num == 0 ? "first" : maxAlertDate}`
     ).then((res) =>
       res.json().then((data) => {
         const sortAlerts =
           data.length > 1
             ? data.sort((a, b) => {
                 return new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate);
               })
             : data;
          if (state.num == 0) {
            setAlerts(sortAlerts);
          } else {
            if(sortAlerts.length > 0){
              const removeOldAlerts = alerts.filter((al) => {
                return !sortAlerts.includes(al._id);
              });
              setAlerts(removeOldAlerts);
              setNewAlerts(sortAlerts);
            }
          }
         setLoading(false);
       })
     );
     const timer = setTimeout(() => setState({ num: state.num + 1 }), 10000);
     return () => clearTimeout(timer);
   }, [currentUser._id, state]);
   
   useEffect(() => {
     setLoading(true);
     fetch(
       `${process.env.REACT_APP_SERVER_API}/notification/user/${currentUser._id}/first`
     ).then((res) =>
       res.json().then((data) => {
         const sortAlerts =
           data.length > 1
             ? data.sort((a, b) => {
                 if (sort === 1) {
                   return (
                     new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate)
                   );
                 } else if (sort === 2) {
                   return (
                     new Date(a.lastUpdateDate) - new Date(b.lastUpdateDate)
                   );
                 } else if (sort === 3) {
                   return a.step - b.step;
                 } else {
                   return b.step - a.step;
                 }
               })
             : data;
         const filterAlert = filterState === 0 ? sortAlerts : sortAlerts.filter((al) => {
                 return filterState === 1
                   ? al.step != 5 && al.step % 2 == 1
                   : filterState === 2
                   ? al.step !== 5 && al.step % 2 === 0
                   : filterState === 3
                   ? al.step === 5
                   : al.step !== 5;
               });
         setAlerts(filterAlert);
         setLoading(false);
       })
     );
   }, [sort, filterState]);

   useEffect(async () => {
     if (alerts.length > 0) {
       const maxDate = new Date(
         Math.max(
           ...alerts.map((element) => {
             return new Date(element.lastUpdateDate);
           })
         )
       );
       setMaxAlertDate(maxDate);
     }
   }, [alerts]);
   

  if (loading) return <Loading />;

  if (currentUser && currentUser.role !== 2) {
    return <Navigate to={-1} />;
  }
  
  return (
    <div>
      <PageTitle page={"Order Status"} />
      {/* {matches ? null : <TotalAlertStatistic alerts={alerts} />} */}
      <div className="d-flex justify-content-end row m-3">
        <div className="col-12 col-sm-6 col-md-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterState}
              label="Sort"
              onChange={(e) => {
                setFilterState(e.target.value);
              }}
            >
              <MenuItem value={0}>Show All</MenuItem>
              <MenuItem value={1}>Waiting for my response</MenuItem>
              <MenuItem value={2}>Waiting for customer's response</MenuItem>
              <MenuItem value={3}>Requests I canceled</MenuItem>
              <MenuItem value={4}>Hide requests I canceled</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={matches ? "col-12 col-sm-6 col-md-3 mt-2 mb-2" : "col-12 col-sm-6 col-md-3"}>
          <FormControl fullWidth className="col-3">
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Age"
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <MenuItem value={1}>Sort Newest to Oldest</MenuItem>
              <MenuItem value={2}>Sort Oldest to Newest</MenuItem>
              <MenuItem value={3}>Sort by step number ascending </MenuItem>
              <MenuItem value={4}>Sort by step number descending </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        {newAlerts &&
          newAlerts.map((alt, inx) => {
            return (
              <div key={inx}>
                <AlertLayout
                  key={alt._id}
                  alert={alt}
                  isDealer={currentUser.role === 2}
                />
              </div>
            );
          })}
        {alerts &&
          alerts.map((alt, inx) => {
            if (JSON.stringify(newAlerts).indexOf(alt._id) == -1) {
              return (
                <div key={inx}>
                  <AlertLayout
                    key={alt._id}
                    alert={alt}
                    isDealer={currentUser.role === 2}
                  />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}


