import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { carsProperties } from "./exportForSelect";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import useForm from "../../utils/useForm";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  chooseFile: {
    display: "flex",
    width: "100vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#363636",
    borderRadius: 5,
    color: "#363636",
    background: "#FCB13F",
  },
  noFile: {
    display: "flex",
    width: "100vh",
    height: "15vh",
    justifyContent: "center",
    padding: 10,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#FCB13F",
    borderRadius: 5,
    color: "#363636",
    background: "#F5F5F5",
  },
}));

export default function CarForm() {
  
  const classes = useStyles();
  const [values, carChange] = useForm();
  const navigate = useNavigate();
  const { createNewCar } = useAuth();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromSecApi, setDataFromSecApi] = useState([]);
  const [company, setCompany] = useState({});
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
      try {
        setLoading(true);
        await createNewCar(values);
        // navigate("/homepage");
      } catch {
        setError("Failed to sign in");
      }
    setLoading(false);
  }

    return (
      <div className="p1l-1 pr-1">
        {error != "" ? (
          <Alert
            severity="error"
            className="mt-3 m-4"
            style={{ border: "solid 2px #DC143C" }}
          >
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ) : null}
        <div className="row d-flex justify-content-center m-3">
          <h5>General Information</h5>
          <div className="col">
            <FormControl fullWidth className="mt-3">
              <InputLabel>Manufacturer</InputLabel>
              <Select
                label="company"
                name="company"
                value={values.company ? values.company : ""}
                onChange={userSelectCompany}
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
          <div className="col">
            <FormControl fullWidth disabled={firstStatus} className="mt-3">
              <InputLabel>Model</InputLabel>
              <Select
                label="model"
                name="model"
                value={values.model ? values.model : ""}
                onChange={userSelectModel}
                required
              >
                {Array.from(
                  new Set(dataFromApi.map((obj) => obj.degem_nm))
                ).map((degem_nm, key) => {
                  return (
                    <MenuItem key={degem_nm.id} value={degem_nm}>
                      {degem_nm}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl disabled={secondStatus} fullWidth className="mt-3">
              <InputLabel>Body Type</InputLabel>
              <Select
                label="type"
                name="type"
                value={values.type ? values.type : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(new Set(dataFromSecApi.map((obj) => obj.type))).map(
                  (type, key) => {
                    return (
                      <MenuItem key={type.id} value={type}>
                        {type}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Year</InputLabel>
              <Select
                label="year"
                name="year"
                value={values.year ? values.year : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter((car) => car.degem_nm === model)
                      .map((obj) => obj.shnat_yitzur)
                  )
                ).map((shnat_yitzur, key) => {
                  return (
                    <MenuItem key={shnat_yitzur.id} value={shnat_yitzur}>
                      {shnat_yitzur}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth disabled={secondStatus} className="mt-3">
              <InputLabel>Engine</InputLabel>
              <Select
                label="engine"
                name="engine"
                value={values.engine ? values.engine : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter((car) => car.degem_nm === model)
                      .map((obj) => obj.nefach_manoa)
                  )
                ).map((nefach_manoa, key) => {
                  return (
                    <MenuItem key={nefach_manoa.id} value={nefach_manoa}>
                      {nefach_manoa}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col mt-3">
            <FormControl fullWidth>
              <TextField
                label="Registration Date"
                name="firstRegistrationDate"
                type="date"
                value={
                  values.firstRegistrationDate
                    ? values.firstRegistrationDate
                    : ""
                }
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  carChange(e);
                  if (
                    (Date.now() - new Date(e.target.value)) /
                      (1000 * 60 * 60 * 24) >
                      700 ||
                    (Date.now() - new Date(e.target.value)) /
                      (1000 * 60 * 60 * 24) <
                      0
                  ) {
                    setError(
                      error.includes(
                        "Date of Registration need to be 2 years from now maxium "
                      )
                        ? error
                        : "Date of Registration need to be 2 years from now maxium " + error
                    );
                  } else {
                    setError("");
                  }
                }}
                required
              />
            </FormControl>
          </div>
        </div>
        <div className="row d-flex justify-content-left m-3 mt-4">
          <h5>Performance Specs</h5>
          <div className="col-3 mt-3">
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                label="condition"
                name="condition"
                value={values.condition ? values.condition : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.Condition.map((cond, key) => {
                  return (
                    <MenuItem key={cond.id} value={cond}>
                      {cond}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            <FormControl fullWidth>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                label="fuel"
                name="fuel"
                value={values.fuel ? values.fuel : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {Array.from(
                  new Set(
                    dataFromApi
                      .filter(
                        (car) =>
                          car.degem_nm === model &&
                          car.nefach_manoa === values.engine
                      )
                      .map((obj) => obj.sug_delek_nm)
                  )
                ).map((sug_delek_nm, key) => {
                  return (
                    <MenuItem key={sug_delek_nm.id} value={sug_delek_nm}>
                      {sug_delek_nm}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            <FormControl fullWidth>
              <InputLabel>Gearbox</InputLabel>
              <Select
                label="gearbox"
                name="gearbox"
                value={values.gearbox ? values.gearbox : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.gearBoxesList.map((gearboxOption) => {
                  return (
                    <MenuItem key={gearboxOption.id} value={gearboxOption}>
                      {gearboxOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            <FormControl fullWidth>
              <InputLabel>Owners</InputLabel>
              <Select
                label="Owners"
                name="numberOfVehicleOwners"
                value={
                  values.numberOfVehicleOwners
                    ? values.numberOfVehicleOwners
                    : ""
                }
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.NumberOfOwners.map((num, key) => {
                  return (
                    <MenuItem key={num.id} value={num}>
                      {num}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            <FormControl fullWidth>
              <InputLabel>Doors</InputLabel>
              <Select
                label="doors"
                name="doorCount"
                value={values.doorCount ? values.doorCount : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.doorCountOptions.map((doorOption, key) => {
                  return (
                    <MenuItem key={doorOption.id} value={doorOption}>
                      {doorOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-1 mt-3">
            <FormControl fullWidth>
              <InputLabel>Seats</InputLabel>
              <Select
                label="seats"
                name="numberOfSeats"
                value={values.numberOfSeats ? values.numberOfSeats : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.countOfSeatsOptions.map((seatsOption, key) => {
                  return (
                    <MenuItem key={seatsOption.id} value={seatsOption}>
                      {seatsOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 mt-3">
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                label="color"
                name="colour"
                value={values.colour ? values.colour : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.colorList.map((color, i) => {
                  return (
                    <MenuItem key={color.id + i} value={color}>
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
        <div className="row d-flex justify-content-center m-3 mt-4">
          <h5>Others</h5>
          <div className="col">
            <FormControl fullWidth className="mt-3">
              <TextField
                label="km"
                name="km"
                type="number"
                value={values.km && values.km > -1 ? values.km : ""}
                onChange={(e) => {
                  carChange(e);
                  if (e.target.value < 0) {
                    setError(
                      error.includes("Please Enter Positive Number ")
                        ? error
                        : "Please Enter Positive Number " + error
                    );
                  } else {
                    setError("");
                  }
                }}
                required
              />
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth className="mt-3">
              <InputLabel>Interior Design</InputLabel>
              <Select
                label="interior design"
                name="interiorDesign"
                value={values.interiorDesign ? values.interiorDesign : ""}
                onChange={(e) => carChange(e)}
                required
              >
                {carsProperties.InteriorDesign.map((designOption) => {
                  return (
                    <MenuItem key={designOption.id} value={designOption}>
                      {designOption}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl fullWidth className="mt-3">
              <TextField
                label="Price $"
                name="price"
                type="number"
                value={values.price && values.price > -1 ? values.price : ""}
                onChange={(e) => {
                  carChange(e);
                  if (e.target.value < 0) {
                    setError(
                      error.includes("Please Enter Positive Number ")
                        ? error
                        : "Please Enter Positive Number " + error
                    );
                  } else {
                    setError("");
                  }
                }}
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
          <label htmlFor={"image"}>
            <div className={values.image ? classes.chooseFile : classes.noFile}>
              <div style={{ margin: "auto", fontSize: 22 }}>
                <FileUploadIcon fontSize="large" style={{ marginRight: 10 }} />
                {values.image
                  ? values.image.length + " images selected"
                  : "Upload Files"}
              </div>
            </div>
          </label>
          <input
            id="image"
            type="file"
            name="image"
            multiple
            style={{ display: "none" }}
            onChange={(e) => carChange(e)}
          />
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