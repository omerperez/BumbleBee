import React,{useState, useEffect} from 'react';
import Chart from 'chart.js/auto';
import {Bar , Pie} from 'react-chartjs-2'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { carsProperties } from '../CarComponents/exportForSelect';
import Loading from "../Layout/Loading";
import axios from "axios";
import {
  getCountByYears,
  getModelByYears,
  getSpecificModel,
  getCategoriesPerUser,
  yearsForSelect,
} from "./StatisticsFunctions";
import CountOfCarsPerModel from "./CountOfCarsPerModel";
import CarsPerYearAndModel from "./CarsPerYearAndModel";
import CountOfModelsByYear from "./CountOfModelsByYear";
import UsersCategories from "./UsersCategories";

export default function Stats() {

const[govildata,setGovildata] = useState(null);
const[year,setYear] = useState(2015);
const[model,setModel] = useState('BMW');
const [categoriesPerUserData, setCategoriesPerUserData] = useState(null);
const [viewsCategories, setViewsCategories] = useState(null);
const[loading,setLoading] = useState(true);

const fetchData = () => {
    
  const govilDataApi = `${process.env.REACT_APP_SERVER_API}/user/dashboard/${year}/${model.hebrew}`;
  const categoriesPerUserApi = `${process.env.REACT_APP_SERVER_API}/user/dashboard`;
  const viewsPerCategory = `${process.env.REACT_APP_SERVER_API}/car/dashboard`;

  const getGovilData = axios.get(govilDataApi);
  const getCategoriesPerUserApi = axios.get(categoriesPerUserApi);
  const getViewPerCategory = axios.get(viewsPerCategory);

  axios.all([getGovilData, getCategoriesPerUserApi, getViewPerCategory]).then(
    axios.spread((...allData) => {
      const allgovilData = allData[0].data;
      const allCategoriesPerUserData = allData[1].data;
      const allViewsPerCategory = allData[2].data;

      setGovildata(allgovilData);
      setCategoriesPerUserData(allCategoriesPerUserData);
      setViewsCategories(allViewsPerCategory);
      setLoading(false);
    })
  );
}

useEffect(() => {
  fetchData();
}, [year, model]);
 
if (loading) {
  return <Loading />;
}

 const countByYears = getCountByYears(govildata.countByYears);
 const modelsByYear = getModelByYears(govildata.modelsByYear);
 const carsPerYearAndModel = getSpecificModel(govildata.specificModelGraph);
 const categoriesPerUser = getCategoriesPerUser(categoriesPerUserData);

 return (
   <div className="d-flex justify-content-center mt-5 row m-5">
     <div className="col-6 mb-5">
       <UsersCategories
         data={categoriesPerUser}
         title={"Favorite Per Category"}
       />
     </div>
     <div className="col-6 mb-5">
       <UsersCategories
         data={getCategoriesPerUser(viewsCategories)}
         title={"Views Per Category"}
       />
     </div>
     <div className="col-6 mb-4">
       <div style={{ maxWidth: "25%" }}>
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
       <CountOfCarsPerModel modelsByYear={modelsByYear} />
     </div>
     <div className="col-6 mb-5">
       <CountOfModelsByYear data={countByYears} />
     </div>
   </div>
 ); 
}

 {
   /* <div className="col-6 mb-5">
       <div style={{ maxWidth: "25%" }}>
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
       <CarsPerYearAndModel data={carsPerYearAndModel} />
     </div> */
 }