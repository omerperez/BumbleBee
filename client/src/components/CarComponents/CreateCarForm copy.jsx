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
// import { carsCompany } from "./exportForSelect";
import DeleteDialog from "../DialogComponents/DeleteDialog";

const api = axios.create({ baseURL: process.env.REACT_APP_FBASE_URL });

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const screens = ["Screen 1", "Screen 2", "Screen 3"];

export default function CreateCarForm() {
  const { createMessage } = useAuth();
  const navigate = useNavigate();

  const [dataApi, setDataApi] = useState([]);
  const [company, setCompany] = useState("");
  const [modelsOptions, setModelsOptions] = useState([]);
  const [status, setStatus] = useState(true);
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2020);
  const [used, setUsed] = useState('00');
  const [engine, setEngine] = useState('');
  const [km, setKm] = useState("");
  const [price, setPrice] = useState(15000);
  const [netPrice, setNetPrice] = useState(10000);
  const [vehicleStatus, setVehicleStatus] = useState('');
  const [category, setCategory] = React.useState([]);
  const [availability, setAvailability] = useState(false);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [hp, setHp] = useState(0);
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState(5);
  const [doorCount, setDoorCount] = useState(5);
  const [gearbox, setGearbox] = useState('');
  const [emissionClass, setEmissionClass] = useState('');
  const [firstRegistration, setFirstRegistration] = useState("2020-02-20");
  const [mnufacturerColour, setMnufacturerColour] = useState("");
  const [colour, setColour] = useState("");
  const [iteriorDesign, setIteriorDesign] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

     let modelUrl;
     if (model !== "") {
       modelUrl = "&q=" + company + "&q=" + model;
     } else {
       modelUrl = "&q=" + company;
     }

    fetch(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=03adc637-b6fe-402b-9937-7c3d3afc9140&limit=100000&q=פרטי נוסעים&q=${modelUrl}`
    )
      .then((response) => response.json())
      .then((data) =>
        setDataApi(
          data.result.records.filter((car) => car.shnat_yitzur >= 2020)
        )
      );
   
    fetch(
      "https://car-data.p.rapidapi.com/cars?limit=50&page=0&make=" + modelUrl,
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
        // setModelsOptions(data)
        console.log(data);
      }
      );
  }, [company]);

  

  console.log(dataApi);
  let dataApiUniqe = Array.from(new Set(dataApi.map((car) => car.make))).map(
    (make) => {
      return dataApi.find((car) => car.make === make);
    }
  );

  const modelChanged = (e) => {
    setModel(e.target.value);
  }
  /* DRAG IMAGES */
  const fileInput = useRef(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFile = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
  };
   const makeChange = (event) => {
     setCompany(event.target.value);
     setStatus(false);
     setModel('');
   };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await createMessage(
        company,
        model,
        year,
        used,
        engine,
        km,
        price,
        netPrice,
        vehicleStatus,
        category,
        availability,
        description,
        images,
        hp,
        fuelConsumption,
        numberOfSeats,
        doorCount,
        gearbox,
        emissionClass,
        firstRegistration,
        mnufacturerColour,
        colour,
        iteriorDesign
      );
      navigate("/homepage");
    } catch {
      setError("Failed to create an advertisement");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="pr-1 pl-1">
        <div className="pr-1 pl-1 mt-3">
          <Card className="create-car-box-shadow">
            <div className="row">
              <div className="col-3" style={{ backgroundColor: "#87CEFA" }}>
                <h1
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    marginTop: "50%",
                  }}
                >
                  <img src="/new.png" width={200} />
                </h1>
              </div>
              <div className="col-9">
                <Form onSubmit={handleSubmit}>
                  <Card.Body>
                    <Form.Group id="first-name" className="mt-3">
                      <div className="row">
                        <div className="col">
                          <InputLabel id="demo-simple-select-label">
                            Make
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="make"
                            label="Make"
                            value={company}
                            style={{ width: "100%", height: "85%" }}
                            onChange={makeChange}
                            required
                          >
                            {hebrewCarsCompany.map((make) => (
                              <MenuItem key={make} value={make}>
                                {make}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className="col">
                          <FormControl disabled={status} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Model
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-helper-label"
                              id="model"
                              label="Model"
                              value={model}
                              onChange={modelChanged}
                              style={{ width: "100%", height: "85%" }}
                              required
                            >
                              {dataApiUniqe.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option.model}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col">
                          <FormControl disabled={status} fullWidth>
                            <InputLabel id="delek">סוג דלק</InputLabel>
                            <Select
                              labelId="delek"
                              id="delek-id"
                              label="סוג דלק"
                              value={fuelConsumption}
                              style={{ width: "100%", height: "85%" }}
                              onChange={(e) =>
                                setFuelConsumption(e.target.value)
                              }
                              required
                            >
                              <MenuItem value={"בנזין"}>בנזין</MenuItem>
                              <MenuItem value={"היברידי"}>היברידי</MenuItem>
                              <MenuItem value={"חשמלי"}>חשמלי</MenuItem>
                              <MenuItem value={"דיזל"}>דיזל</MenuItem>
                              <MenuItem value={"גז"}>גז</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </Form.Group>
                  </Card.Body>
                  <div className="justify-content-center d-flex">
                    <Button
                      disabled={loading}
                      className="w-25 blue-btn mb-4"
                      type="submit"
                    >
                      Add Advertisement
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
