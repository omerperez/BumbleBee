import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import CircularProgress from "@mui/material/CircularProgress";
import FilterCars from "../CarComponents/FilterCars";

export default function MyFavorite() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/car/my-favorite/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCars(data);
      });
  }, []);

  if (currentUser.role === 2) {
    return (
      <>
        <PageTitle page={"Access Denied"} />
        <AccessDenied />
      </>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-15">
        <CircularProgress size={200} />
      </div>
    );
  }

  if (cars.length == 0)
    return (
      <>
        <PageTitle page={"My Favorite"} />
        <div>
          <Alert severity="warning">No Cars Yet</Alert>
        </div>
      </>
    );

  return (
    <div className="ml-8">
      <PageTitle page={"My Favorite"} />
      <div className="pl-1 pr-1">
        <FilterCars carsState={cars} carsSetState={setCars} />
        <div className="cars-grid">
          {cars.map((car) => {
            return (
              <CarCard
                key={car._id}
                _id={car._id}
                image={
                  car.mainImage
                    ? process.env.REACT_APP_S3 + car.mainImage
                    : car.images && car.images.length > 0
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
                currentPage="myFavorite"
                userRole={currentUser.role}
                status={
                  JSON.stringify(currentUser.cars).indexOf(car._id) !== -1
                    ? true
                    : false
                }
                userId={currentUser._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
