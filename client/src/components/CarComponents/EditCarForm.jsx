import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { carsProperties } from "./exportForSelect";
import CarProfilePage from "../Pages/CarProfilePage";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EditCarForm({car ,saveChanges}) {
    
    const {editCar } = useAuth();
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
    <div className="row">
      <div className="col-11">
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
                    label="KM"
                    type="number"
                    onChange={(e) => setKm(e.target.value)}
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
                    label="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
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
                    label="color"
                    defaultValue={car.colour}
                    onChange={(e) => setColour(e.target.value)}
                    required
                    fullWidth
                    sx={{ minWidth: "200px" }}
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
          </div>
        </div>
      </div>
      <div className="col">
        <Button
          onClick={handleClickSaveChanges}
          style={{
            background: "#363636",
            borderRadius: "10%",
            border: "solid 2px rgb(79, 160, 79)",
          }}
        >
          <SaveIcon fontSize="large" style={{ color: "rgb(79, 160, 79)" }} />
        </Button>
        <Button
        className="mt-3"
          onClick={handleClickCancel}
          style={{
            background: "#DC143C",
            borderRadius: "10%",
            border: "solid 2px #363636"
          }}
        >
          <CancelIcon fontSize="large" style={{ color: "#363636" }} />
        </Button>
      </div>
    </div>
  );

}