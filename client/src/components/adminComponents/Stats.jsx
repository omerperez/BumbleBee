import React,{useState, useEffect} from 'react';

import Chart from 'chart.js/auto';
import {Bar} from 'react-chartjs-2'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { carsProperties } from '../CarComponents/exportForSelect';

export default function Stats() {

const[dataVal,setDataVal] = useState(null);
const[year,setYear] = useState(2010);
const[model,setModel] = useState('מרצדס בנץ גרמנ');
const[loading,setLoading] = useState(true);
const yearsForSelect=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022];


useEffect(() => {
       fetch(`${process.env.REACT_APP_SERVER_API}/user/dashboard/${year}/${model.hebrew}`)
       .then((response) => response.json())
       .then((data) => {
          setDataVal(data)
          setLoading(false)
        });  
 },[year,model]);
 
 if(loading){
   return <h1>loading...</h1>
 }
 
 const countByYears={
  labels: Object.keys(dataVal.countByYears),
  datasets: [{
      label: 'Cars Per Year',
      data: Object.values(dataVal.countByYears),
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
  }]
 };

 const modelsByYear={
  labels: Object.keys(dataVal.modelsByYear),
  datasets: [{
      label: 'Cars Per Model',
      data: Object.values(dataVal.modelsByYear),
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
  }]
 };

 const carsPerYearAndModel={
  labels: Object.keys(dataVal.specificModelGraph),
  datasets: [{
      label: 'Cars Per Year&model',
      data: Object.values(dataVal.specificModelGraph),
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
  }]
 };

 return(
    <div> 
      <div className='d-flex justify-content-start row mt-3'>
        <div className="col-3 mr-5">
       <FormControl fullWidth >
            <InputLabel>Manufacturer</InputLabel>
            <Select
              label="company"
              name="company"
              value={model ? model : ""}
              onChange={(e)=>setModel(e.target.value)}
              required
            >
              {carsProperties.makes.map((make) => (
                <MenuItem key={make.id} value={make}>
                  {make.english}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div>
          <div className="col-3">
       <FormControl fullWidth >
            <InputLabel>Year</InputLabel>
            <Select
              label="year"
              name="year"
              value={year ? year : ""}
              onChange={(e)=>setYear(e.target.value)}
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
     <div style={{width:'50%', height:'400px', display:'inline-flex'}}>
        <Bar
        data= {modelsByYear}
        options={{
          maintanAspectRatio: false,
          plugins:{
            title:{
              display:true,
              text:"cars per year",
              fontSize:40
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
        />
     </div>
     <div style={{width:'50%', height:'400px', display:'inline-flex'}}>
        <Bar
        data= {carsPerYearAndModel}
        options={{
          maintanAspectRatio: false,
          plugins:{
            title:{
              display:true,
              text:"cars per year and model",
              fontSize:40
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
        />
     </div>
     <div style={{width:'100%', height:'400px', display:'inline-flex'}}>
        <Bar
        data= {countByYears}
        options={{
          maintanAspectRatio: false,
          plugins:{
            title:{
              display:true,
              text:"cars per year",
              fontSize:40
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
        />
     </div>
   </div>
   
 )
}