import React from "react";
import './table.css';
import { convertDateFormat, numberWithCommas } from "./carFunctions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProfileBodyMobile from "./ProfileBodyMobile";
import { useAuth } from "../../contexts/AuthContext";
import calcNetPrice from "../../utils/calcNetPrice";

export default function CarProfileBody({car}) {
  const { currency, currencyValue } = useAuth();
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
                <th>Dealer Price</th>
                <td>
                  {currency == 1
                    ? "$" + numberWithCommas(car.price)
                    : currency == 2
                    ? numberWithCommas(Math.round(car.price * currencyValue)) +
                      "€"
                    : numberWithCommas(Math.round(car.price * currencyValue)) +
                      "₪"}
                </td>
              </tr>
              <tr>
                <th>Total Price</th>
                <td>
                  {currency == 1 ? " $" : ""}
                  {numberWithCommas(
                    Math.round(
                      ((calcNetPrice(car.fuelConsumption, car.price) +
                        car.price) *
                        currencyValue *
                        100) /
                        100
                    )
                  )}
                  {currency == 2 ? "€" : currency == 3 ? "₪" : ""}
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