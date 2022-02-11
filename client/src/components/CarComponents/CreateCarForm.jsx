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
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { carsProperties } from "./exportForSelect";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const api = axios.create({ baseURL: process.env.REACT_APP_FBASE_URL });

export default function CreateCarForm() {
  
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromSecApi, setDataFromSecApi] = useState([]);
  const [company, setCompany] = useState({});
  const [firstStatus, setFirstStatus] = useState(true);
  const [model, setModel] = useState("");
  const [secondStatus, setSecondStatus] = useState(true);
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [hpStatus, setHpStatus] = useState(true);
  const [fuel, setFuel] = useState("");
  const [type, setType] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState(5);
  const [doorCount, setDoorCount] = useState(5);
  const [gearbox, setGearbox] = useState("");
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState(10000);
  const [ numberOfVehicleOwners, setNumberOfVehicleOwners ] = useState("00");
  const [km, setKm] = useState(10000);
  const [interiorDesign, setInteriorDesign] = useState("");
  const [condition, setCondition] = useState("");
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
        });
  }, [company]);
  
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     setError("");
  //     setLoading(true);
  //     await caret(
  //       company,
  //       model,
  //       year,
  //       numberOfVehicleOwners,
  //       engine,
  //       km,
  //       price,
  //       price * 0.7,
  //       vehicleStatus,
  //       category,
  //       images,
  //       fuel,
  //       numberOfSeats,
  //       doorCount,
  //       gearbox,
  //       "Euro6",
  //       firstRegistrationDate,
  //       colour,
  //       interiorDesign
  //     );
  //     navigate("/homepage");
  //   } catch {
  //     setError("Failed to sign in");
  //   }
  //   setLoading(false);
  // }

  const makeCahnge = (e) => {
    setCompany(e.target.value);
    setFirstStatus(false);
  }
  
  const changeModel = (e) => {
    setModel(e.target.value);
    setSecondStatus(false);
  }
    return (
      <div className="pl-1 pr-1">
        <Form action="/multiple">
          <div className="row d-flex justify-content-center m-3">
            <h5>General Information</h5>
            <div className="col">
              {/* Manufacturer */}
              <FormControl fullWidth className="mt-3">
                <InputLabel>Manufacturer</InputLabel>
                <Select
                  label="Manufacturer"
                  value={company}
                  onChange={makeCahnge}
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
                <Select label value={model} onChange={changeModel} required>
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
            <div className="col mb-3">
              {/* Year */}
              <FormControl fullWidth disabled={secondStatus} className="mt-3">
                <InputLabel>Year</InputLabel>
                <Select
                  label
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
            <div className="col mb-3">
              {/* Engine */}
              <FormControl fullWidth disabled={secondStatus} className="mt-3">
                <InputLabel>Engine</InputLabel>
                <Select
                  label
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
            <div className="col">
              {/* First Registration */}
              <FormControl className="mt-3" fullWidth>
                <TextField
                  label="First Registration"
                  type="date"
                  defaultValue={firstRegistrationDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </div>
          </div>
          <div className="row d-flex justify-content-left m-3">
            <h5>Performance Specs</h5>
            <div className="col-3 mt-3">
              {/* Condition */}
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  label="Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
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
              <FormControl fullWidth disabled={hpStatus}>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  label
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  required
                >
                  {Array.from(
                    new Set(
                      dataFromApi
                        .filter(
                          (car) =>
                            car.degem_nm == model && car.nefach_manoa == engine
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
                  value={gearbox}
                  onChange={(e) => setGearbox(e.target.value)}
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
                  value={numberOfVehicleOwners}
                  onChange={(e) => setNumberOfVehicleOwners(e.target.value)}
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
                  value={doorCount}
                  onChange={(e) => setDoorCount(e.target.value)}
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
                  value={numberOfSeats}
                  onChange={(e) => setNumberOfSeats(e.target.value)}
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
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
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
          <div
            className="d-flex row justify-content-center m-3"
            style={{ alignItems: "center" }}
          >
            <h5>Part 3</h5>
            <div className="col">
              {/* Kilometers */}
              <FormControl fullWidth className="mt-3">
                <TextField
                  label="Kilometers"
                  type="number"
                  defaultValue={km}
                  onChange={(e) => setKm(e.target.value)}
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
                  value={interiorDesign}
                  onChange={(e) => setInteriorDesign(e.target.value)}
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
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </FormControl>
            </div>
            <div className="col">
              <Alert severity="info" className="mt-3">
                <AlertTitle>Net Price - {price * 0.7 + " "}$</AlertTitle>
              </Alert>
            </div>
            <div className="row d-flex justify-content-center"></div>
          </div>
          <div
            className="inputfile d-flex justify-content-center m-5"
            // className=""
          >
            <input type="file" id="file" name="images" multiple />
            <label for="file" className="btn-2">
              Upload Images <FileUploadIcon />
            </label>
            {/* <input type={"file"} name="images" multiple /> */}
          </div>
        </Form>
      </div>
    );
}


  // Category
  //               <FormControl fullWidth disabled={secondStatus}>
  //                 <InputLabel>Category</InputLabel>
  //                 <Select
  //                   label
  //                   value={carType}
  //                   onChange={(e) => setCarType(e.target.value)}
  //                   required
  //                 >
  //                   {Array.from(
  //                     new Set(
  //                       dataFromApi
  //                         .filter((car) => car.degem_nm == model)
  //                         .map((obj) => obj.sug_rechev_nm)
  //                     )
  //                   ).map((sug_rechev_nm) => {
  //                     return (
  //                       <MenuItem key={sug_rechev_nm} value={sug_rechev_nm}>
  //                         {sug_rechev_nm}
  //                       </MenuItem>
  //                     );
  //                   })}
  //                 </Select>
  //               </FormControl>