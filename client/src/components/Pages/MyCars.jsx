import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "@mui/material";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const { currentUser, deleteCar } = useAuth();

  useEffect(() => {
     const index = window.location.toString().lastIndexOf("/") + 1;
     const id = window.location.toString().substring(index);
     fetch(`${process.env.REACT_APP_SERVER_API}/car/mycars/${id}`)
       .then((response) => response.json())
       .then((data) => setCars(data));  
  }, []);

  if (cars.length == 0) return (
    <>
      <PageTitle page={"My Cars"} />
      <div>
        <Alert severity="warning">No Cars Yet</Alert>
      </div>
    </>
  );
  return (
    <>
      <PageTitle page={"My Cars"} />
      <div className="pl-1 pr-1">
        <div className="cars-grid">
          {cars.map((car) => {
            return (
              <CarCard
                key={car._id}
                _id={car._id}
                image={
                  car.mainImage ? 
                  process.env.REACT_APP_S3 + car.mainImage
                  :
                  car.images && car.images.length > 0
                    ? process.env.REACT_APP_S3 + car.images[0]
                    : "/image_not_available.png"
                }
                company={car.company ? car.company : car.companyEnglish}
                model={car.model}
                year={car.year}
                used={car.numberOfVehicleOwners}
                engine={car.engine}
                km={car.km}
                price={car.price}
                currentPage="1"
              />
            );
          })
          }
        </div>
      </div>
    </>
  );
}

