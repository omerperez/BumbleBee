import React from "react";
import CarCard from "../CarComponents/CarCard";
import PageTitle from "../Layout/PageTitle";

export default function HomePage() {
  const [cars, setCars] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/car")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  if (cars == null) return "";
  ///mini.jpeg
  return (
    <>
      <PageTitle page={"Home Page"} />
      <div className="cars-grid pr-1 pl-1">
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
        })}
      </div>
    </>
  );
}

