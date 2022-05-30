import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";
import PageTitle from "../Layout/PageTitle";

export default function CompaniesPage() {
    const [cars, setCars ] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_API}/car/`)
          .then((response) => response.json())
          .then((data) => setCars(data));
    }, []);
    const companies = Array.from(new Set(cars.map((a) => a.company))).map(
      (company) => {
        return cars.find((a) => a.company === company);
      }
    );

  return (
    <>
      <PageTitle page={"All Makers"} />
      <div className="cars-grid pr-1">
        {companies.map((car, key) => {
          return (
            <Link
              to={`${car.company.toLowerCase()}`}
              className="container"
            >
              <img
                alt={car.company}
                className="center"
                src={`/makers/${car.company.toLowerCase()}.png`}
                width={175}
                onError={error403}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
