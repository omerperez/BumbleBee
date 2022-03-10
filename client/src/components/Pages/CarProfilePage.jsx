import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";

export default function CarProfilePage() {
  
  const [car, setCar] = useState();
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    fetch("http://localhost:8080/car/show/" + id)
      .then((response) => response.json())
      .then((data) => setCar(data))  
  },[isEdit]);

  

  if(car == null ) return 'Sorry We dont find your car...'

  function getEditButton(){
    return (
    <>
    <Button onClick={() => setIsEdit(true)}>EDIT</Button>
    <CarProfileBody car={car} />
    </>  
    )
  }

  const saveChanges = () => {
    setIsEdit(false);
  };


  return (
    <>
      <PageTitle page={car.companyEnglish + " " + car.model} />
      <CarImageGallery id={car.dealer} car={car} />
      {isEdit ? <EditCarForm  car={car} saveChanges={saveChanges}/> : getEditButton()}
    </>
  );
}



/*import React, {useState, useEffect} from "react";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";

export default function CarProfilePage() {
  
  const [car, setCar] = useState();

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
      <PageTitle page={car.companyEnglish + " " + car.model} />
      <CarImageGallery id={car.dealer} car={car} />
      <CarProfileBody car={car} />
    </>
  );
}
*/