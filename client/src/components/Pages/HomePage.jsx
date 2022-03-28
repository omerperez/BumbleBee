import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import FilterCars from "../CarComponents/FilterCars";
import PageTitle from "../Layout/PageTitle";
import useFetch from "../../utils/useFetch";

export default function HomePage() {

  const { data: cars, loading } = useFetch(
    `${process.env.REACT_APP_SERVER_API}/car`
  );
  
  if(loading) return "Just a second"

  if (cars == null) return "";

  return (
    <>
      <PageTitle page={"Home Page"} />
      <div className="pl-1 pr-1">
        {/* <div > */}
        {/* <FilterCars
          data={cars}
          labelName={"Company"}
          formName={"company"}
          onChange={(e) => console.log(e.target.value)}
        /> */}
        {/* </div> */}
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
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

