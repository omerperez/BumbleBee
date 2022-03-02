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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [firstStatus, setFirstStatus] = useState(true);
  const [model, setModel] = useState("");
  const [secondStatus, setSecondStatus] = useState(true);
  const [loading, setLoading] = useState(false);

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
    carChange(e);
   };

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
      try {
        setLoading(true);
        await createNewCar(values);
        navigate("/homepage");
      } catch {
        setError("Failed to sign in");
      }
    setLoading(false);
  }

    return (
      <div className="p1l-1 pr-1">
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="row d-flex justify-content-center m-3">
          <h5>General Information</h5>
          <div className="col">
            {/* Company */}
            <FormControl fullWidth className="mt-3">
              <InputLabel>Manufacturer</InputLabel>
              <Select
                label="company"
                name="company"
                value={values.company}
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
          <div className="col">
            {/* model */}
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
          <div className="col">
            {/* type */}
            <FormControl disabled={secondStatus} fullWidth className="mt-3">
              <InputLabel>Body Type</InputLabel>
              <Select
                label
                name="type"
                value={values.type}
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
          <div className="col">
            {/* year */}
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Year</InputLabel>
              <Select
                label
                name="year"
                value={values.year}
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
          <div className="col">
            {/* engine */}
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Engine</InputLabel>
              <Select
                label
                name="engine"
                value={values.engine}
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
          <div className="col mt-3">
            {/* First Registration */}
            <FormControl fullWidth>
              <TextField
                label="firstRegistrationDate"
                name="firstRegistrationDate"
                type="date"
                defaultValue={values.firstRegistrationDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => carChange(e)}
                required
              />
            </FormControl>
          </div>
        </div>
        <div className="row d-flex justify-content-left m-3">
          <h5>Performance Specs</h5>
          <div className="col-3 mt-3">
            {/* condition */}
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                label="condition"
                name="condition"
                value={values.condition}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.Condition.map((cond) => {
                  return (
                    <MenuItem key={cond} value={cond}>
                      {cond}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            {/* Fuel Type */}
            <FormControl fullWidth>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                label
                name="fuel"
                value={values.fuel}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter(
                        (car) =>
                          car.degem_nm == model &&
                          car.nefach_manoa == values.engine
                      )
                      .map((obj) => obj.sug_delek_nm)
                  )
                ).map((sug_delek_nm) => {
                  return (
                    <MenuItem key={sug_delek_nm} value={sug_delek_nm}>
                      {sug_delek_nm}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            {/* GearBox */}
            <FormControl fullWidth>
              <InputLabel>Gearbox</InputLabel>
              <Select
                label
                name="gearbox"
                value={values.gearbox}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.gearBoxesList.map((gearboxOption) => {
                  return (
                    <MenuItem key={gearboxOption} value={gearboxOption}>
                      {gearboxOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            {/* Number Of Vehicle Owners */}
            <FormControl fullWidth>
              <InputLabel>Owners</InputLabel>
              <Select
                label
                name="numberOfVehicleOwners"
                value={values.numberOfVehicleOwners}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.NumberOfOwners.map((num) => {
                  return (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            {/* Door Count */}
            <FormControl fullWidth>
              <InputLabel>Doors</InputLabel>
              <Select
                label
                name="doorCount"
                value={values.doorCount}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.doorCountOptions.map((doorOption) => {
                  return (
                    <MenuItem key={doorOption} value={doorOption}>
                      {doorOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            {/* Seats Count */}
            <FormControl fullWidth>
              <InputLabel>Seats</InputLabel>
              <Select
                label
                name="numberOfSeats"
                value={values.numberOfSeats}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.countOfSeatsOptions.map((seatsOption) => {
                  return (
                    <MenuItem key={seatsOption} value={seatsOption}>
                      {seatsOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            {/* Color */}
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                label
                name="colour"
                value={values.colour}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.colorList.map((color, i) => {
                  return (
                    <MenuItem key={color + i} value={color + i}>
                      <div className="row">
                        <div className="col-8">{color}</div>
                        <div
                          className="col-1 d-flex bumble-img-log"
                          style={{ background: color }}
                        ></div>
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row d-flex justify-content-center m-3">
          <h5>Part 3</h5>
          <div className="col">
            {/* Kilometers */}
            <FormControl fullWidth className="mt-3">
              <TextField
                label="km"
                name="km"
                type="number"
                defaultValue={values.km}
                onChange={(e) => carChange(e)}
                required
              />
            </FormControl>
          </div>
          <div className="col">
            {/* Interior Design */}
            <FormControl fullWidth className="mt-3">
              <InputLabel>Interior Design</InputLabel>
              <Select
                label
                name="interiorDesign"
                value={values.interiorDesign}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.InteriorDesign.map((designOption, i) => {
                  return (
                    <MenuItem key={designOption} value={designOption}>
                      {designOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            {/* Price */}
            <FormControl fullWidth className="mt-3">
              <TextField
                label="Price $"
                name="price"
                type="number"
                value={values.price}
                onChange={(e) => carChange(e)}
              />
            </FormControl>
          </div>
          <div className="col">
            <Alert severity="info" className="mt-3">
              <AlertTitle>
                Net Price - {values.price ? values.price * 0.7 + " " : " "}$
              </AlertTitle>
            </Alert>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5">
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
      <div className="mt-4 justify-content-center d-flex">
          <Button
            disabled={loading}
            className="mb-3 yellow-btn col-4"
            onClick={handleClickSubmit}
          >
            Add New Car
          </Button>
        </div>
      </div>
    );
}