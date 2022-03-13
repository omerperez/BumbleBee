import React, {useState, useEffect} from "react";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";
import { editCarIcon } from "../images/projectImages";

export default function CarProfilePage() {
  
  const [car, setCar] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    fetch(`${process.env.REACT_APP_SERVER_API}/car/show/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data));  
  },[isEdit]);

  if(car == null ) return 'Sorry We dont find your car...'

  function getEditButton(){
    return (
      <div className="row">
        <div className="col-11">
          <CarProfileBody car={car} />
        </div>
        <div className="col">
          <img
            className="cur-pointer"
            src={editCarIcon}
            width={85}
            onClick={() => setIsEdit(true)}
          />
        </div>
      </div>
    );
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
