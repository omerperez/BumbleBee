import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomsCard from "../CustomsComponents/CustomsCard";
import PageTitle from "../Layout/PageTitle";

export default function CompaniesPage() {

    const [cars, setCars ] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/car/")
          .then((response) => response.json())
          .then((data) => setCars(data));
    }, []);

    const companies = Array.from(new Set(cars.map((a) => a.company))).map(
      (company) => {
        return cars.find((a) => a.company === company);
      }
    );
    console.log(companies);

  return (
    <>
      <PageTitle page={"All Makers"} />
      <div className="cars-grid pl-1 pr-1">
        {companies.map((car, key) => {
          return (
            <Link
              to={`${car.company.toLowerCase()}`}
              className="container"
            >
              <img
                className="center"
                src={`/makers/${car.company.toLowerCase()}.png`}
                width={175}
              />
            </Link>
          );
        })}
      </div>
    </>
    //
  );
}
