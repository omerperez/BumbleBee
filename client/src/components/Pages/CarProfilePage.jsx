import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";

export default function CarProfilePage() {
  
  const [car, setCar] = useState();
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    fetch("http://localhost:8080/car/show/" + id)
      .then((response) => response.json())
      .then((data) => setCar(data))  
  }, [save]);
  
  if(car == null ) return 'Sorry We dont find your car...'

  return (
    <>
      <PageTitle page={car.companyEnglish + " " + car.model} />
      <CarImageGallery id={car.dealer} car={car} />
      <Button onClick={() => setEdit(!edit)}>EDIT</Button>
      <Button onClick={() => setEdit(!save)}>SAVE</Button>
      {edit ? "blablabla" : <CarProfileBody car={car} />}
    </>
  );
}
