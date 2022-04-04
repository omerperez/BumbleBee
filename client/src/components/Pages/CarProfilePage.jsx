import React, {useState, useEffect} from "react";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";
import { editCarIcon } from "../images/projectImages";
import { useAuth } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function CarProfilePage() {

  const [car, setCar] = useState();
  const [loading, setLoading ] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    fetch(`${process.env.REACT_APP_SERVER_API}/car/show/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCar(data)
      });  
  },[isEdit]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-15">
        <CircularProgress size={200} />
      </div>
    );
  }
  
  if(car == null ) return 'Sorry We dont find your car...'

  function getEditButton(){
    return (
      <div className="row">
        <div className="col-11">
          <CarProfileBody car={car} />
        </div>
        {car.dealer == currentUser._id && currentUser.role === 2 ? (
        <div className="col">
          <img
            className="cur-pointer"
            src={editCarIcon}
            width={85}
            onClick={() => setIsEdit(true)}
          />
        </div>
        ) : ( null )}
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
