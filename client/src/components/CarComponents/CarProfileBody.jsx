import React from "react";
import './table.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileBodyMobile from "./ProfileBodyMobile";
import {convertDateFormat} from "./carFunctions";

export default function CarProfileBody({car}) {
  const matches675 = useMediaQuery("(max-width:675px)");

  return matches675 ? (
    <div className="d-flex justify-content-center mt-2">
      <ProfileBodyMobile car={car} />
    </div>
  ) : (
    <div className="font-24">
      <div className="row">
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
                <td>{car.km + " km"}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{car.category}</td>
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
                  {`${car.price}$ (${
                    car.netPrice ?? (car.price * 0.7).toString().substring(0, 8)
                  }$)`}
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
              <tr>
                <th>Gearbox</th>
                <td>{car.gearbox}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <table>
            <tbody>
              <tr>
                <th>Emission Class</th>
                <td>{car.emissionClass}</td>
              </tr>
              <tr>
                <th>First Registration</th>
                <td>
                  {`${convertDateFormat(car.firstRegistration)[2]}/${
                    convertDateFormat(car.firstRegistration)[1]
                  }/${convertDateFormat(car.firstRegistration)[0]}`}
                </td>
              </tr>
              <tr>
                <th>Colour</th>
                <td>{car.colour}</td>
              </tr>
              <tr>
                <th>Interior Design</th>
                <td>{car.interiorDesign}</td>
              </tr>
              <tr>
                <th>
                  Views <VisibilityIcon className="ml-10" color="primary" />{" "}
                </th>
                <td>{car.clicksCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}