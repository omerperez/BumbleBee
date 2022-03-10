import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Divider, FormControl, Input } from "@mui/material";
import { carsProperties } from "./exportForSelect";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import CarProfilePage from "../Pages/CarProfilePage";

//const api = axios.create({ baseURL: process.env.REACT_APP_FBASE_URL });

export default function EditCarForm({car ,saveChanges}) {
    
    const {editCar, progress } = useAuth();
    const [colour, setColour] = useState(car.colour);
    const [price, setPrice] = useState(car.price);
    const [km, setKm] = useState(car.km);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleClickSaveChanges = async (e) => {
      e.preventDefault();
        try {
          setLoading(true);
          await editCar(
            car._id,
            km,
            price,
            colour,
        );
        <CarProfilePage/>
        saveChanges();
      } catch {
          setError("Failed to sign in");
        }
      setLoading(false);
    }

    const handleClickCancel = async (e) => {
      e.preventDefault();
        try {
        <CarProfilePage/>
        saveChanges();
      } catch {
        }
    }

  return (
    <div className="pl-1 pr-1" style={{ fontSize: "24px" }}>
      <div className="row">
        
        <div className="col">
            <table>
              <tr>
                <th>Company</th>
                <td>{car.companyEnglish}</td>
              </tr>
              <tr>
                <th>Model</th>
                <td>{car.model}</td>
              </tr>
              <tr>
                <th>Year</th>
                <td>{car.year}</td>
              </tr>

              <tr>
                <th>Type Of Engine</th>
                <td>{car.engine}</td>
              </tr>
              <tr>
                <th>Mileage</th>
                <TextField 
                defaultValue={car.km}
                label= "KM"
                type = "number"
                onChange={(e) => setKm(e.target.value)}      
                //sx={{minWidth: '200px'}}
                fullWidth
              />
              </tr>
            </table>
        </div>
        <div className="col">
          <table>
            <tr>
              <th>Owners</th>
              <td>{car.numberOfVehicleOwners}</td>
            </tr>
            <tr>
              <th>Price (Net)</th>
              <TextField 
                defaultValue={car.price}
                label= "price"
                type = "number"
                onChange={(e) => setPrice(e.target.value)}
                //sx={{minWidth: '200px'}}
                fullWidth
              />
            </tr>
            <tr>
              <th>Fuel Consumption</th>
              <td>{car.fuelConsumption}</td>
            </tr>
            <tr>
              <th>Seats</th>
              <td>{car.numberOfSeats}</td>
            </tr>
            <tr>
              <th>Door Count</th>
              <td>{car.doorCount}</td>
            </tr>
          </table>
        </div>

        <div className="col">
          <table>
            <tr>
              <th>Gearbox</th>
              <td>{car.gearbox}</td>
            </tr>
            <tr>
              <th>Emission Class</th>
              <td>{car.emissionClass}</td>
            </tr>
            <tr>
              <th>First Registration</th>
              <td>
                {Date(car.firstRegistration)
                  .toString()
                  .substring(
                    0,
                    Date(car.firstRegistration).toString().indexOf(":") - 2
                  )
                  .substring(
                    Date(car.firstRegistration).toString().indexOf(" ")
                  )}
              </td>
            </tr>
            <tr>
              <th>Colour</th>
              <Select
                  label = "color"
                  defaultValue={car.colour}
                  onChange={(e) => setColour(e.target.value)}       
                  required
                  fullWidth
                  sx={{minWidth: '200px'}}
                >
                  {carsProperties.colorList.map((color, i) => {
                    return (
                      <MenuItem key={color + i} value={color}>
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
            </tr>
            <tr>
              <th>Interior Design</th>
              <td>{car.iteriorDesign}</td>
            </tr>
          </table>
        </div>
        {/* <div className="col-1">

        </div> */}
      </div>
      <div className="justify-content-center d-flex row">
            <Button
             className="col"
             disabled={loading}
             onClick={handleClickSaveChanges}
             style={{background:"green"}}
            >
              Save Changes
            </Button>
            <Button
              className="col"
              style={{ background: "red" }}
              disabled={loading}
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
          </div>
    </div>
  );

}