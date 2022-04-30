import React,{useState, useEffect} from 'react';

import Chart from 'chart.js/auto';
import {Bar , Pie} from 'react-chartjs-2'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { carsProperties } from '../CarComponents/exportForSelect';
import Loading from "../Layout/Loading";

import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

import {
  getCountByYears,
  getModelByYears,
  getSpecificModel,
  getCategoriesOfUser,
  getCategoriesPerUser,
  yearsForSelect,
} from "./StatisticsFunctions";

export default function Stats() {

const[govildata,setGovildata] = useState(null);
const[year,setYear] = useState(2015);
const[model,setModel] = useState('BMW');
const[categoriesPerUserData,setCategoriesPerUserData] = useState(null);
const[loading,setLoading] = useState(true);

// const { currentUser } = useAuth();

const fetchData = () => {
    
  //const govilDataApi = `${process.env.REACT_APP_SERVER_API}/user/dashboard/${year}/${model.hebrew}`;
  const categoriesPerUserApi = `${process.env.REACT_APP_SERVER_API}/user/dashboard`;

  //const getGovilData = axios.get(govilDataApi);
  const getCategoriesPerUserApi = axios.get(categoriesPerUserApi);

  axios.all([ getCategoriesPerUserApi]).then(
    axios.spread((...allData) => {
      //const allgovilData = allData[0].data;
      const allCategoriesPerUserData = allData[0].data;
      //setGovildata(allgovilData);
      setCategoriesPerUserData(allCategoriesPerUserData);
      setLoading(false);
    })
  );
}

useEffect(() => {
  fetchData();
}, []);
 
if (loading) {
  return <Loading />;
}

 console.log(categoriesPerUserData);

//  const countByYears = getCountByYears(dataVal.countByYears);
//  const modelsByYear = getModelByYears(dataVal.modelsByYear);
//  const carsPerYearAndModel = getSpecificModel(dataVal.specificModelGraph);
 const categoriesPerUser = getCategoriesPerUser(categoriesPerUserData);




 return (
    <> 
      <div className="d-flex justify-content-start row mt-3">
         <div className="col-3 mr-5">
       <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              label="company"
              name="company"
              value={model != null ? model.english : ""}
              onChange={(e) => setModel(e.target.value)}
              required
            >
             {carsProperties.makes.map((make, key) => {
               return (
                 <MenuItem key={make.id} value={make}>
                   {make.english}
                 </MenuItem>
               );
             })}
            </Select>
          </FormControl>
          </div>
          <div className="col-3">
       <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              label="year"
              name="year"
              value={year ? year : ""}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              {yearsForSelect.map((SelectYear, key) => {
                return (
                  <MenuItem key={SelectYear.id} value={SelectYear}>
                    {SelectYear}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          </div>
          <div className="col-3">
       <FormControl fullWidth>
            <InputLabel>User</InputLabel>
            <Select
              label="user"
              name="user"
              value={user ? user : ""}
              onChange={(e) => setUser(e.target.value)}
              required
            >
              {yearsForSelect.map((SelectUser, key) => {
                return (
                  <MenuItem key={SelectUser.id} value={SelectUser}>
                    {SelectUser}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          </div>
          </div>

        {/* <div
       style={{
         width: "100%",
         maxWidth: 1000,
         height: "400px",
         display: "inline-flex",
       }}
     >
       <Bar
        data={modelsByYear}
        options={{
          maintanAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "cars per year",
              fontSize: 40,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        />
     </div>

     <div
       style={{
         width: "100%",
         maxWidth: 1000,
         height: "400px",
         display: "inline-flex",
       }}
     >
       {" "}
       <Bar
         data={carsPerYearAndModel}
         options={{
           maintanAspectRatio: false,
           plugins: {
             title: {
               display: true,
               text: "cars per year and model",
               fontSize: 40,
             },
           },
           scales: {
             y: {
               beginAtZero: true,
             },
           },
         }}
       />
     </div>

     <div
       style={{
         width: "100%",
         maxWidth: 1000,
         height: "400px",
         display: "inline-flex",
       }}
     >
       <Bar
         data={countByYears}
         options={{
           maintanAspectRatio: false,
           plugins: {
             title: {
               display: true,
               text: "cars per year",
               fontSize: 40,
             },
           },
           scales: {
             y: {
               beginAtZero: true,
             },
          },
        }}
        />
      </div>  */}
     <div
       style={{
         width: "50%",
         maxWidth: 1000,
         height: "400px",
         display: "inline-flex",
       }}
     >
       <Pie
         data={categoriesPerUser}
         options={{
           maintanAspectRatio: false,
           plugins: {
             title: {
               display: true,
               text: "Categories Per User",
               fontSize: 80,
             },
           },
        }}
        />
     </div>
   </>
 );
 
}