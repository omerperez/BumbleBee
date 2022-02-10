import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PageTitle from "../Layout/PageTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { FormControl } from "@mui/material";
import {
  companiesHeAndEn,
  carsCompany,
  hebrewCarsCompany,
  doorCountOptions,
  countOfSeatsOptions,
  gearBoxesList,
  colorList,
} from "./exportForSelect";
import DeleteDialog from "../DialogComponents/DeleteDialog";
import LocalizationProvider from "@mui/lab/LocalizationProvider";


const api = axios.create({ baseURL: process.env.REACT_APP_FBASE_URL });

export default function CreateCarForm() {
  
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromSecApi, setDataFromSecApi] = useState([]);

  const [company, setCompany] = useState({});

  const [status, setStatus] = useState(true);
  const [model, setModel] = useState("");

  const [carType, setCarType] = useState("");

  const [yearStatus, setYearStatus] = useState(true);
  const [year, setYear] = useState("");

  const [engine, setEngine] = useState("");

  const [hpStatus, setHpStatus] = useState(true);
  const [horsePower, setHorsePower] = useState("");

  const [type, setType] = useState("");

  const [numberOfSeats, setNumberOfSeats] = useState(5);
  const [doorCount, setDoorCount] = useState(5);
  
  const [gearbox, setGearbox] = useState("");
  const [mnufacturerColour, setMnufacturerColour] = useState("");
  const [colour, setColour] = useState("");

  const [firstRegistrationDate, setFirstRegistrationDate] = useState(
    new Date("2020-08-18")
  );

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
          setDataFromSecApi(data.filter((car) => car.year >= 2020 ));
          console.log(data);
        });
  }, [company]);
  
  
  const makeCahnge = (e) => {
    setCompany(e.target.value);
    setStatus(false);
  }

  const changeModel = (e) => {
    setModel(e.target.value);
    setYearStatus(false);
  }

    return (
      <div className="pl-1 pr-1">
        <div>
          <Card style={{ boxShadow: "15px 15px 15px 15px #363636" }}>
            <Form>
              {/* Make */}
              <div className="row d-flex justify-content-center mt-4 mb-4">
                <div className="col-3">
                  <FormControl fullWidth>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select
                      className="w-100"
                      labelId="make-label"
                      id="make"
                      label="Make"
                      value={company}
                      onChange={makeCahnge}
                      required
                    >
                      {companiesHeAndEn.map((make) => (
                        <MenuItem key={make} value={make}>
                          {make.english}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-3">
                  {/* Model */}
                  <FormControl disabled={status} fullWidth>
                    <InputLabel id="model-label">Model</InputLabel>
                    <Select
                      labelId="model-label"
                      id="model"
                      label="Model"
                      value={model}
                      onChange={changeModel}
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
                <div className="col-3">
                  <FormControl disabled={status} fullWidth>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                      className="w-100"
                      labelId="type-label"
                      id="type"
                      label="Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      {Array.from(
                        new Set(dataFromSecApi.map((obj) => obj.type))
                      ).map((type) => {
                        return (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex justify-content-center mt-4  mb-4">
                <div className="col-3">
                  {/* Year */}
                  <FormControl fullWidth disabled={yearStatus}>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                      labelId="year-label"
                      id="year"
                      label="Year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
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
                <div className="col-3">
                  {/* Engine */}
                  <FormControl fullWidth disabled={yearStatus}>
                    <InputLabel id="engine-label">Engine</InputLabel>
                    <Select
                      labelId="engine-label"
                      id="engine"
                      label="Engine"
                      value={engine}
                      onChange={(e) => {
                        setEngine(e.target.value);
                        setHpStatus(false);
                      }}
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
              </div>
              <div className="row d-flex justify-content-center mt-4  mb-4">
                <div className="col-3">
                  {/* HP */}
                  <FormControl fullWidth disabled={hpStatus}>
                    <InputLabel id="hp-label">Horse Power</InputLabel>
                    <Select
                      labelId="hp-label"
                      id="hp"
                      label="hp"
                      value={horsePower}
                      onChange={(e) => setHorsePower(e.target.value)}
                      required
                    >
                      {Array.from(
                        new Set(
                          dataFromApi
                            .filter(
                              (car) =>
                                car.degem_nm == model &&
                                car.nefach_manoa == engine
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
                <div className="col-3">
                  {/* Category */}
                  <FormControl fullWidth disabled={yearStatus}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      label="Category"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                      required
                    >
                      {Array.from(
                        new Set(
                          dataFromApi
                            .filter((car) => car.degem_nm == model)
                            .map((obj) => obj.sug_rechev_nm)
                        )
                      ).map((sug_rechev_nm) => {
                        return (
                          <MenuItem key={sug_rechev_nm} value={sug_rechev_nm}>
                            {sug_rechev_nm}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex justify-content-center mt-4  mb-4">
                <div className="col-2">
                  <TextField
                    id="datetime-local-start"
                    label="Date"
                    type="date"
                    defaultValue={firstRegistrationDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>
                <div className="col-1">
                  <FormControl fullWidth>
                    <InputLabel id="door-label">Door Count</InputLabel>
                    <Select
                      className="w-100"
                      labelId="door-label"
                      id="door"
                      label="Door Count"
                      value={doorCount}
                      onChange={(e) => setDoorCount(e.target.value)}
                      required
                    >
                      {doorCountOptions.map((doorOption) => {
                        return (
                          <MenuItem key={doorOption} value={doorOption}>
                            {doorOption}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-1">
                  <FormControl fullWidth>
                    <InputLabel id="seats-label">Seats Count</InputLabel>
                    <Select
                      className="w-100"
                      labelId="seats-label"
                      id="seats"
                      label="Count Of Seats"
                      value={numberOfSeats}
                      onChange={(e) => setNumberOfSeats(e.target.value)}
                      required
                    >
                      {countOfSeatsOptions.map((seatsOption) => {
                        return (
                          <MenuItem key={seatsOption} value={seatsOption}>
                            {seatsOption}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-2">
                  <FormControl fullWidth>
                    <InputLabel id="gearbox-label">Gearbox</InputLabel>
                    <Select
                      className="w-100"
                      labelId="gearbox-label"
                      id="gearbox"
                      label="Gearbox"
                      value={gearbox}
                      onChange={(e) => setGearbox(e.target.value)}
                      required
                    >
                      {gearBoxesList.map((gearboxOption) => {
                        return (
                          <MenuItem key={gearboxOption} value={gearboxOption}>
                            {gearboxOption}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="row d-flex justify-content-center mt-4  mb-4">
                <div className="col-3">
                  {/* Year */}
                  <FormControl fullWidth>
                    <InputLabel id="m-color-label">
                      Mnufacturer Colour
                    </InputLabel>
                    <Select
                      labelId="m-color-label"
                      id="m-color"
                      label="m-color"
                      value={mnufacturerColour}
                      onChange={(e) => setMnufacturerColour(e.target.value)}
                      required
                    >
                      {colorList.map((color) => {
                        return (
                          <MenuItem key={color} value={color}>
                            <div className="row">
                              <div className="col-8">{color}</div>
                              <div
                                className="col-1 d-flex"
                                style={{ background: color }}
                              ></div>
                            </div>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-3">
                  {/* Year */}
                  <FormControl fullWidth>
                    <InputLabel id="m-color-label">Colour</InputLabel>
                    <Select
                      labelId="m-color-label"
                      id="m-color"
                      label="m-color"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      required
                    >
                      {colorList.map((color, i) => {
                        return (
                          <MenuItem key={color + i} value={color + i}>
                            <div className="row">
                              <div className="col-8">{color}</div>
                              <div
                                className="col-1 d-flex"
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
            </Form>
          </Card>
        </div>
      </div>
    );
}
