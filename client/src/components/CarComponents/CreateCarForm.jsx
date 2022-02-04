import React, { useRef, useState } from "react";
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

  const [company, setCompany] = useState("");
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


  // const handleChangeDay = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setDays(typeof value === "string" ? value.split(",") : value);
  // };

  // const handleChangeScreens = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setScreenNumber(typeof value === "string" ? value.split(",") : value);
  // };

  const usedChange = (event) => {
    setUsed(event.target.value);
  };

  const yearChange = (event) => {
    setYear(event.target.value);
  };

  const doorChange = (event) => {
    setDoorCount(event.target.value);
  };

  const colorChange = (event) => {
    setColour(event.target.value);
  };

  const dateChange = (event) => {
    setFirstRegistration(event.target.value);
  };

  // const endDateChange = (event) => {
  //   setDateToEnd(event.target.value);
  // };

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
          <Card style={{ boxShadow: "15px 15px 15px 15px #708090" }}>
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
                          <TextField
                            className="form-control"
                            id="company"
                            label="Company"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                            }}
                            type="text"
                            variant="outlined"
                            required
                          />
                        </div>
                        <div className="col">
                          <TextField
                            className="form-control"
                            id="company"
                            label="Company"
                            value={company}
                            onChange={(e) => {
                              setCompany(e.target.value);
                            }}
                            type="text"
                            variant="outlined"
                            required
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group id="template-form" className="w-100 mt-4">
                      <div className="row">
                        <div className="col d-flex justify-content-center">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Number Of Vehicle Owners
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="Number Of Vehicle Owners"
                              label="Number Of Vehicle Owners"
                              value={used}
                              style={{ width: "100%", height: "85%" }}
                              onChange={usedChange}
                              required
                            >
                              <MenuItem value={1}>01</MenuItem>
                              <MenuItem value={2}>02</MenuItem>
                              <MenuItem value={3}>03</MenuItem>
                              <MenuItem value={4}>04</MenuItem>
                              <MenuItem value={5}>05</MenuItem>
                              <MenuItem value={6}>06</MenuItem>
                              <MenuItem value={7}>07</MenuItem>
                              <MenuItem value={8}>08</MenuItem>
                              <MenuItem value={9}>09</MenuItem>
                              <MenuItem value={10}>+10</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col d-flex justify-content-center">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Year
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="template"
                              label="Number Of Vehicle Owners"
                              value={year}
                              style={{ width: "100%", height: "85%" }}
                              onChange={yearChange}
                              required
                            >
                              <MenuItem value={2020}>2020</MenuItem>
                              <MenuItem value={2021}>2021</MenuItem>
                              <MenuItem value={2022}>2022</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="w-100 mt-4">
                      <div className="row">
                        <div className="col d-flex" onChange={dateChange}>
                          <TextField
                            id="datetime-local-start"
                            label="Date and time to end"
                            type="datetime-local"
                            defaultValue={firstRegistration}
                            sx={{ width: 250 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                          />
                        </div>
                        <div className="col d-flex">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Count Of Doors
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="Count Of Doors"
                              label="Count Of Doors"
                              value={year}
                              style={{ width: "100%", height: "85%" }}
                              onChange={doorChange}
                              required
                            >
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                              Color
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="template"
                              label="Number Of Vehicle Owners"
                              value={colour}
                              style={{ width: "100%", height: "85%" }}
                              onChange={colorChange}
                              required
                            >
                              <MenuItem value={"Black"}>Black</MenuItem>
                              <MenuItem value={"Yellow"}>Yellow</MenuItem>
                              <MenuItem value={"Blue"}>Blue</MenuItem>
                              <MenuItem value={"White"}>White</MenuItem>
                              <MenuItem value={"Grey"}>Grey</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col">
                          <TextField
                            className="w-100"
                            style={{ height: "85px" }}
                            id="visableTimeInSeconds-text-fields"
                            label="Price I=in $"
                            defaultValue={price}
                            onChange={(e) => {
                              setPrice(e.target.value);
                            }}
                            type="number"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group id="text-field-form">
                      <div className="row">
                        <div className="d-flex col-6 justify-content-center wrapper">
                          <FormControl fullWidth>
                            <InputLabel>Description</InputLabel>
                            <TextareaAutosize
                              style={{ height: "150px" }}
                              id="textFields-text-fields"
                              label="Description"
                              defaultValue={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                              type="text"
                              variant="outlined"
                              maxRows={10}
                            />
                          </FormControl>
                        </div>{" "}
                        <div className="d-flex justify-content-center col-6 wrapper">
                          <div
                            className="drop_zone"
                            onDragOver={handleDragOver}
                            onDrop={handleOnDrop}
                            onClick={() => fileInput.current.click()}
                          >
                            <p>
                              Click to select or Drag and drop image here....
                            </p>
                            <input
                              id="file"
                              accept="image/*"
                              class="form-control"
                              label="Profile Image"
                              type="file"
                              name="image"
                              required
                              ref={fileInput}
                              hidden
                              onChange={(e) => handleFile(e.target.files[0])}
                              // onChange={(event) => {
                              //   const file = event.target.files[0];
                              //   setImages(file);
                              // }}
                            ></input>
                          </div>
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
