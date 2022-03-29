import React from "react";
import './table.css'

export default function CarProfileBody({car}) {

    return (
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
                  <td>{car.price + "$ (" + car.netPrice + "$)"}</td>
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
                  <td>{car.colour}</td>
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
    );

}