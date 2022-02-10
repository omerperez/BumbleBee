import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";

export default function HomePage() {
  const [cars, setCars] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/car")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  if (cars == null) return "";

  return (
    <>
      <PageTitle page={"Home Page"} />
      <div className="pl-1 pr-1">
        {/* <Link to={'/companies'}>
          <Button>All Makers</Button>
        </Link> */}
        <div className="cars-grid">
          {cars.map((car) => {
            return (
              <CarCard
                key={car._id}
                _id={car._id}
                image={"mini.jpeg"}
                company={car.company}
                model={car.model}
                year={car.year}
                used={car.numberOfVehicleOwners}
                engine={car.engine}
                km={car.km}
                price={car.price}
              />
            );
          })
          }
        </div>
      </div>
    </>
  );
}

