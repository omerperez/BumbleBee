import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Alert } from "@mui/material";
import { Navigate } from "react-router-dom";
import Loading from "../Layout/Loading";
import FilterCars from "../CarComponents/FilterCars";
import calcNetPrice from "../../utils/calcNetPrice";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState("");
  const { currentUser, currencyValue } = useAuth();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/car`)
      .then((response) => response.json())
      .then((data) => {
        const myCars = data.filter((car) => car.dealer === currentUser._id);
        setLoading(false);
        setCars(myCars);
      });
  }, []);

  if (currentUser.role !== 2) {
    return <Navigate to={-1} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (cars.length == 0)
    return (
      <>
        <PageTitle page={"My Cars"} />
        <div>
          <Alert severity="warning">No Cars Yet</Alert>
        </div>
      </>
    );

  return (
    <div className="ml-8">
      <PageTitle page={"My Cars"} />
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
                price={Math.round((car.price * currencyValue * 100) / 100)}
                netPrice={Math.round(
                  (calcNetPrice(car.fuelConsumption, car.price) *
                    currencyValue *
                    100) /
                    100
                )}
                currentPage="myCars"
                user={currentUser}
                isSale={car.isSell}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

