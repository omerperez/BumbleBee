import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";
import EditIcon from "@mui/icons-material/Edit";

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
      <div className="row">
        <div className="col-11">
          <CarProfileBody car={car} />
        </div>
        <div className="col">
          <Button
            onClick={() => setIsEdit(true)}
            style={{
              background: "#363636",
              borderRadius: "10%",
              border: "solid 2px #e2a021",
            }}
          >
            <EditIcon fontSize="large" style={{ color: "#e2a021" }} />
          </Button>
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