import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import Loading from "../Layout/Loading";
import FilterCars from "../CarComponents/FilterCars";
import calcNetPrice from "../../utils/calcNetPrice";

export default function MyFavorite() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, currencyValue } = useAuth();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/car/my-favorite/${currentUser._id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCars(data);
      });
  }, [currentUser._id]);

  if (currentUser.role !== 1) {
    return (
      <>
        <PageTitle page={"Access Denied"} />
        <AccessDenied />
      </>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="ml-8">
      <PageTitle page={"My Favorite"} />
      <div className="pl-1 pr-1">
        {cars && cars.length ? (
          <FilterCars carsState={cars} carsSetState={setCars} />
        ) : null}
        <div className="cars-grid">
          {cars && cars.length ? (
            cars.map((car) => {
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
                  price={Math.round((car.price * currencyValue * 100) / 100)}
                  netPrice={Math.round(
                    (calcNetPrice(car.fuelConsumption, car.price) *
                      currencyValue *
                      100) /
                      100
                  )}
                  currentPage="myFavorite"
                  user={currentUser}
                />
              );
            })
          ) : (
            <Alert className="mt-4 mr-2" severity="warning">No Cars Yet</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
