import React,{useState, useEffect} from 'react';
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { carsProperties } from '../CarComponents/exportForSelect';
import Loading from "../Layout/Loading";
import {
  getCountByYears,
  getModelByYears,
  getSpecificModel,
  yearsForSelect,
} from "./StatisticsFunctions";

export default function Stats() {

const[dataVal, setDataVal] = useState();
const[year,setYear] = useState(2010);
const [model, setModel] = useState(carsProperties.makes[0].english);
const[loading,setLoading] = useState(true);

useEffect(() => {
       fetch(`${process.env.REACT_APP_SERVER_API}/user/dashboard/${year}/${model.hebrew}`)
       .then((response) => response.json())
       .then((data) => {
          setDataVal(data)
          setLoading(false)
        });  
 } , [year,model]);
 
 if(loading){
   return <Loading />;
 }

 const countByYears = getCountByYears(dataVal.countByYears);
 const modelsByYear = getModelByYears(dataVal.modelsByYear);
 const carsPerYearAndModel = getSpecificModel(dataVal.specificModelGraph);

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
     </div>
   </>
 );
}