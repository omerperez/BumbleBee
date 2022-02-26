import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Divider, FormControl } from "@mui/material";
import { carsProperties } from "./exportForSelect";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import useForm from "../../utils/useForm";

const api = axios.create({ baseURL: process.env.REACT_APP_FBASE_URL });

export default function CarForm() {

  const [values, carChange] = useForm();
  const { createNewCar, progress } = useAuth();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromSecApi, setDataFromSecApi] = useState([]);
  const [company, setCompany] = useState({});

  useEffect(() => {
     fetch(
       `https://data.gov.il/api/3/action/datastore_search?resource_id=03adc637-b6fe-402b-9937-7c3d3afc9140&limit=100000&q=פרטי נוסעים&q=${company.hebrew}`
     )
       .then((response) => response.json())
       .then((data) =>
         setDataFromApi(
           data.result.records.filter((car) => car.shnat_yitzur >= 2020)
         )
       );
     fetch(
       `https://car-data.p.rapidapi.com/cars?&year=2020&make=${company.english}`,
       {
         method: "GET",
         headers: {
           "x-rapidapi-host": "car-data.p.rapidapi.com",
           "x-rapidapi-key":
             "4607af252emsh3d7ae6deef5d96ep1f460fjsnd8f476e79f3a",
         },
       }
     )
       .then((response) => response.json())
       .then((data) => {
         setDataFromSecApi(data.filter((car) => car.year >= 2020));
       });
   }, [company]);

   const userSelectCompany = (e) => {
    setCompany(e.target.value); 
    setFirstStatus(false);
    carChange(e);
   }

   const userSelectModel = (e) =>{
    setModel(e.target.value)
    setSecondStatus(false);
    carChange(e);
   }

   const fileSelectedHandler = (e) => {
    e.preventDefault();
    const files = e.target.files;
    carChange(e);
   };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [firstStatus, setFirstStatus] = useState(true);
  const [model, setModel] = useState("");
  const [secondStatus, setSecondStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    //     try {
    //       setLoading(true);
    //       await createNewCar(values);
    //       navigate("/homepage");
    //     } catch {
    //       setError("Failed to sign in");
    //     }
    // setLoading(false);
  }

    return (
      <div className="p1l-1 pr-1">
        <div className="row d-flex justify-content-center m-3">
          {error && <Alert variant="danger">{error}</Alert>}
          <h5>General Information</h5>
          <div className="col">
            {/* Manufacturer */}
            <FormControl fullWidth className="mt-3">
              <InputLabel>Manufacturer</InputLabel>
              <Select
                label="Manufacturer"
                name="Manufacturer"
                value={values.Manufacturer}
                onChange={userSelectCompany}
                required
              >
                {carsProperties.makes.map((make) => (
                  <MenuItem key={make} value={make}>
                    {make.english}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col mb-3">
            {/* Model */}
            <FormControl fullWidth disabled={firstStatus} className="mt-3">
              <InputLabel>Model</InputLabel>
              <Select
                label
                name="model"
                value={values.model}
                onChange={userSelectModel}
                required
              >
                {Array.from(
                  new Set(dataFromApi.map((obj) => obj.degem_nm))
                ).map((degem_nm) => {
                  return (
                    <MenuItem key={degem_nm} value={degem_nm}>
                      {degem_nm}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col mb-3">
            {/* Type */}
            <FormControl disabled={secondStatus} fullWidth className="mt-3">
              <InputLabel>Body Type</InputLabel>
              <Select
                label
                name="Type"
                value={values.Type}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(new Set(dataFromSecApi.map((obj) => obj.type))).map(
                  (type) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
          <div className="col mb-3">
            {/* Year */}
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Year</InputLabel>
              <Select
                label
                name="Year"
                value={values.Year}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter((car) => car.degem_nm == model)
                      .map((obj) => obj.shnat_yitzur)
                  )
                ).map((shnat_yitzur) => {
                  return (
                    <MenuItem key={shnat_yitzur} value={shnat_yitzur}>
                      {shnat_yitzur}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col mb-3">
            {/* Engine */}
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Engine</InputLabel>
              <Select
                label
                name="Engine"
                value={values.Engine}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter((car) => car.degem_nm == model)
                      .map((obj) => obj.nefach_manoa)
                  )
                ).map((nefach_manoa) => {
                  return (
                    <MenuItem key={nefach_manoa} value={nefach_manoa}>
                      {nefach_manoa}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            {/* First Registration */}
            <FormControl className="mt-3" fullWidth>
              <TextField
                label="First Registration"
                name="firstRegistration"
                type="date"
                defaultValue={values.firstRegistration}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => carChange(e)}
                required
              />
            </FormControl>
          </div>
          <FormControl fullWidth className="mt-3">
            <div className="d-flex justify-content-center">
              <div className="form-group">
                <label for="images">
                  Select files:
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={fileSelectedHandler}
                  />
                  <br />
                </label>
              </div>
            </div>
          </FormControl>
        </div>
        <Button
          disabled={loading}
          className="w-100 mb-3 yellow-btn"
          // type="submit"
          onClick={handleClickSubmit}
        >
          Create New Car
        </Button>
      </div>
    );
}