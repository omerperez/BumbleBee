import React,{useState, useEffect} from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Loading from "../Layout/Loading";
import axios from "axios";
import {
  getCountByYears,
  getModelByYears,
  getSpecificModel,
  getCategoriesPerUser,
  yearsForSelect,
} from "./StatisticsFunctions";
import DiagramGraph from "./DiagramGraph";
import PieGraph from "./PieGraph";

export default function Stats() {

const[govildata,setGovildata] = useState(null);
const[year,setYear] = useState(2015);
const[model,setModel] = useState('BMW');
const [categoriesPerUserData, setCategoriesPerUserData] = useState(null);
const [viewsCategories, setViewsCategories] = useState(null);
const[loading,setLoading] = useState(true);
const matches560 = useMediaQuery("(max-width:560px)");

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
   <div
     className={
       matches560
         ? "d-flex justify-content-center mt-5 row"
         : "d-flex justify-content-center mt-5 row m-5"
     }
   >
     <div className="col-12 col-md-6 mb-5">
       <PieGraph
         data={categoriesPerUser}
         title={"Favorite Per Category"}
         mobileWidth={matches560}
       />
     </div>
     <div className="col-12 col-md-6 mb-5">
       <PieGraph
         data={getCategoriesPerUser(viewsCategories)}
         title={"Views Per Category"}
         mobileWidth={matches560}
       />
     </div>
     <div className="col-12 col-md-6 mb-4">
       <div style={matches560 ? { maxWidth: "50%" } : { maxWidth: "25%" }}>
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
       <DiagramGraph data={modelsByYear} title={"Count By Years"} />
     </div>
     <div className="col-12 col-md-6 mb-4">
       <div className="mt-5">
         <DiagramGraph
           data={countByYears}
           title={"Companies By Years"}
         />
       </div>
     </div>
   </div>
 ); 
}