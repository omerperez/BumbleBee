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

  const [messageName, setMessageName] = useState("");
  const [textFields, setTextFields] = useState("");
  const [title, setTitle] = useState("");
  const [visableTime, setVisableTime] = useState(0);
  const [template, setTemplate] = useState("");
  const [screenNumber, setScreenNumber] = useState([]);
  const [dateToStart, setDateToStart] = useState("2020-02-20T10:30");
  const [dateToEnd, setDateToEnd] = useState("2020-02-20T10:30");
  const [days, setDays] = React.useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChangeDay = (event) => {
    const {
      target: { value },
    } = event;
    setDays(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeScreens = (event) => {
    const {
      target: { value },
    } = event;
    setScreenNumber(typeof value === "string" ? value.split(",") : value);
  };

  const templateChange = (event) => {
    setTemplate(event.target.value);
  };

  const startDateChange = (event) => {
    setDateToStart(event.target.value);
  };

  const endDateChange = (event) => {
    setDateToEnd(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await createMessage(
        messageName,
        template,
        title,
        "Omer Test",
        visableTime,
        dateToStart,
        dateToEnd,
        days,
        screenNumber
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
                            id="messageName"
                            label="Advertisement Name (for you only)"
                            value={messageName}
                            onChange={(e) => {
                              setMessageName(e.target.value);
                            }}
                            type="text"
                            variant="outlined"
                            required
                          />
                        </div>
                        <div className="col">
                          <TextField
                            className="form-control"
                            id="title"
                            label="Title"
                            defaultValue={title}
                            type="text"
                            variant="outlined"
                            required
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
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
                              Template
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="template"
                              label="Template"
                              value={template}
                              style={{ width: "100%", height: "85%" }}
                              onChange={templateChange}
                              required
                            >
                              <MenuItem value={1}>Template 1</MenuItem>
                              <MenuItem value={2}>Template 2</MenuItem>
                              <MenuItem value={3}>Template 3</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col d-flex justify-content-center">
                          <FormControl fullWidth>
                            <InputLabel id="screen-simple-select-label">
                              Screen Number
                            </InputLabel>
                            <Select
                              className="w-100"
                              style={{ height: "83.5%" }}
                              labelId="screen-simple-select-label"
                              id="screenNumber-multiple-checkbox"
                              multiple
                              value={screenNumber}
                              onChange={handleChangeScreens}
                              input={<OutlinedInput label="Screen" />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                              required
                            >
                              {screens.map((screen) => (
                                <MenuItem key={screen} value={screen}>
                                  <Checkbox
                                    checked={screenNumber.indexOf(screen) > -1}
                                  />
                                  <ListItemText primary={screen} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </Form.Group>
                    <Form.Group className="w-100 mt-4">
                      <div className="row">
                        <div className="col d-flex" onChange={startDateChange}>
                          <TextField
                            id="datetime-local-start"
                            label="Date and time to end"
                            type="datetime-local"
                            defaultValue={dateToStart}
                            sx={{ width: 250 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                          />
                        </div>
                        <div className="col d-flex" onChange={endDateChange}>
                          <TextField
                            id="datetime-local-end"
                            label="Date and time to end"
                            type="datetime-local"
                            defaultValue={dateToEnd}
                            sx={{ width: 250 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                          />
                        </div>
                        <div className="col">
                          <FormControl fullWidth>
                            <InputLabel id="screen-simple-select-label">
                              Select Days
                            </InputLabel>
                            <Select
                              className="w-100"
                              style={{ height: "55%" }}
                              labelId="days-multiple-checkbox-label"
                              id="days-multiple-checkbox"
                              multiple
                              value={days}
                              onChange={handleChangeDay}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                              required
                            >
                              {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                  <Checkbox checked={days.indexOf(name) > -1} />
                                  <ListItemText primary={name} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col">
                          <TextField
                            className="w-100"
                            style={{ height: "85px" }}
                            id="visableTimeInSeconds-text-fields"
                            label="Visable Time (seconds)"
                            defaultValue={visableTime}
                            onChange={(e) => {
                              setVisableTime(e.target.value);
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
                            <InputLabel>Text Fields</InputLabel>
                            <TextareaAutosize
                              style={{ height: "150px" }}
                              id="textFields-text-fields"
                              label="Text Fields"
                              defaultValue={textFields}
                              onChange={(e) => {
                                setTextFields(e.target.value);
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
