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
            car.images
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
        <div className="row pl-1 pr-1 font-24">
          <div className="col">
            <table>
              <tbody>
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
                  <td>
                    <TextField
                      component={"span"}
                      defaultValue={car.km}
                      label="KM"
                      type="number"
                      onChange={(e) => setKm(e.target.value)}
                      fullWidth
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col">
            <table>
              <tbody>
                <tr>
                  <th>Owners</th>
                  <td>{car.numberOfVehicleOwners}</td>
                </tr>
                <tr>
                  <th>Price (Net)</th>
                  <td>
                    <TextField
                      defaultValue={car.price}
                      label="price"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      fullWidth
                    />
                  </td>
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
              </tbody>
            </table>
          </div>

          <div className="col">
            <table>
              <tbody>
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
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <th>Interior Design</th>
                  <td>{car.iteriorDesign}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="col">
        <Button
          className="bg-bumble border-radius-5 border-3-green"
          onClick={handleClickSaveChanges}
        >
          <SaveIcon fontSize="large" color="success" />
        </Button>
        <Button
          className="border-2-black border-radius-5 mt-3 bg-red"
          onClick={handleClickCancel}
        >
          <CancelIcon fontSize="large" className="color-black" />
        </Button>
      </div>
    </div>
  );

}