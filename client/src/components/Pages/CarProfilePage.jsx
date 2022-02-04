import React, {useState, useEffect} from "react";
import PageTitle from "../Layout/PageTitle";

export default function CarProfilePage() {
  
  const [car, setCar] = useState([]);
  
  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);

    fetch("http://localhost:8080/car/show/" + id)
      .then((response) => response.json())
      .then((data) => setCar(data))  
    }, []);
  
  if(car == null ) return 'Sorry We dont find your car...'

  return (
    <>
      <PageTitle page={car.company + ' ' + car.model} />
    </>
  );
}
