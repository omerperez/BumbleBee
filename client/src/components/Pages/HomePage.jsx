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
        <div className="cars-grid">
          {cars.map((car) => {
            return (
              <CarCard
                key={car._id}
                _id={car._id}
                image={
                  car.images && car.images.length > 0
                    ? `https://bumblebee-pro.s3.eu-west-1.amazonaws.com/${car.images[0]}`
                    : "/image_not_available.png"
                }
                company={car.company ? car.company : car.companyEnglish}
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

