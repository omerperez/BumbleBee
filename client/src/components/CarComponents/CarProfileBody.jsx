import { Divider } from "@mui/material";
import React, {useState, useEffect} from "react";
import './table.css'
export default function CarProfileBody({car}) {

    return (
      <div className="pl-1 pr-1" style={{ fontSize: "24px" }}>
        <div className="row">
          <div className="col">
            <table>
              <tr>
                <th>Company</th>
                <td>{car.company}</td>
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
                <th>
                  Number Of Vehicle
                  <br />
                  Owners
                </th>
                <td>{car.numberOfVehicleOwners}</td>
              </tr>
              <tr>
                <th>Type Of Engine</th>
                <td>{car.engine}</td>
              </tr>
              <tr>
                <th>Mileage</th>
                <td>{car.km + " km"}</td>
              </tr>
              <tr>
                <th>Price (Net)</th>
                <td>{car.price + "$ (" + car.netPrice + "$)"}</td>
              </tr>
            </table>
          </div>
          <div className="col">
            <table>
              <tr>
                <th>Vehicle condition</th>
                <td>{car.vehicleStatus}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{car.category}</td>
              </tr>
              <tr>
                <th>Availability</th>
                <td>{car.availability ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Power (HP)</th>
                <td>{car.hp}</td>
              </tr>
              <tr>
                <th>Fuel Consumption</th>
                <td>{car.fuelConsumption}</td>
              </tr>
              <tr>
                <th>Number of Seats</th>
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
                <th>Colour (Manufacturer)</th>
                <td>{car.mnufacturerColour}</td>
              </tr>
              <tr>
                <th>Colour</th>
                <td>{car.colour}</td>
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
      </div>
    );

}
