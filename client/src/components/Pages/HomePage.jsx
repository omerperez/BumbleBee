import React, { useState, useEffect } from "react";
import CarCard from "../CarComponents/CarCard";
import FilterCars from "../CarComponents/FilterCars";
import PageTitle from "../Layout/PageTitle";
import Loading from "../Layout/Loading";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export default function HomePage() {
  
  const { currentUser } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState();

   const fetchData = () => {
     const currentUserApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`;
     const carsApi = `${process.env.REACT_APP_SERVER_API}/car`;

     const getUser = axios.get(currentUserApi);
     const getCars = axios.get(carsApi);

     axios.all([getUser, getCars]).then(
       axios.spread((...allData) => {
         const userData = allData[0].data;
         const carsData = allData[1].data;
         setUser(userData);
         setCars(carsData);
         setLoading(false);
       })
     );
   };

   useEffect(() => {
     fetchData();
   }, []);

  if(loading) {
    return <Loading />;
  }

  if (cars === null) return "";

  return (
    <>
      <div className="ml-8" style={{ maxWidth: '500px'}}>
        <PageTitle page={"Home Page"} />
      </div>
      <div className="pr-1">
        <FilterCars carsState={cars} carsSetState={setCars} />
        <div className="cars-grid">
          {cars.filter((car) => car.isSell !== true).map((car) => {
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
                user={user}
                status={
                  JSON.stringify(user.cars).indexOf(car._id) !== -1
                    ? true
                    : false
                }
                isOwner={user._id === car.dealer}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

