import React, {useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Chart from 'chart.js/auto';
import {Pie} from 'react-chartjs-2'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Loading from "../Layout/Loading";

import {getCategoriesPerUser} from "../adminComponents/StatisticsFunctions";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function CategoriesPerUserDialog({ id, name,disabled }) {
    const[categoriesPerUserData,setCategoriesPerUserData] = useState(null);
    const[loading,setLoading] = useState(true);
    const[open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getdata = () => {
    fetch(
        `${process.env.REACT_APP_SERVER_API}/user/dashboard/${id}`
      ).then((response) => response.json())
      .then((data) => {
        setCategoriesPerUserData(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
  };

  useEffect(() => {
    getdata();
  },[]);

  if (loading) {
    return <Loading />;
  }

  console.log(categoriesPerUserData);


  const categoriesPerUser = getCategoriesPerUser(categoriesPerUserData);

  return (
    <div>
      <Button onClick={handleClickOpen} disabled={disabled} className="capital-letter bg-col-blue" variant="contained">
        Categories
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <div>{"Categories of " + name}</div>
        </DialogTitle>
        
     <div
    //    style={{
    //      width: "100%",
    //      maxWidth: 1000,
    //      height: "400px",
    //      display: "inline-flex",
    //    }}
     >
       <Pie
         data={categoriesPerUser}
         options={{
            cutoutPercentage:0,
             responsive: true,
            
             plugins: {
                 tooltip:{
                     callbacks:{
                         label:(context)=>{
                             var sum=0;
                             for (const data of context.dataset.data){
                                 sum=sum+data;
                             }
                             const pers = Math.floor((context.parsed*100)/sum);
                             return (context.label+": "+pers +'%')

                         },
                         afterLabel: (context)=>{
                             return("Number: "+context.parsed)
                         }
                     }
                 }
              },
        }}
        />
     </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
