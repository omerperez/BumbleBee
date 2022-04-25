import React, {useState, useEffect} from "react";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";
import { editCarIcon } from "../images/projectImages";
import { useAuth } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function CarProfilePage() {

  const [car, setCar] = useState();
  const [loading, setLoading ] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { currentUser } = useAuth();
  const [user, setUser] = useState();

  const fetchData = () => {
    
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    
    const userApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`;
    const carApi = `${process.env.REACT_APP_SERVER_API}/car/show/${id}`;

    const getUser = axios.get(userApi);
    const getCar = axios.get(carApi);

    axios.all([getUser, getCar]).then(
      axios.spread((...allData) => {
        const allUserData = allData[0].data;
        const allCarData = allData[1].data;

        setUser(allUserData);
        setCar(allCarData);
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [isEdit]);

  // useEffect(() => {
  //   const index = window.location.toString().lastIndexOf("/") + 1;
  //   const id = window.location.toString().substring(index);
  //   fetch(`${process.env.REACT_APP_SERVER_API}/car/show/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoading(false);
  //       setCar(data)
  //     });  
  //         fetch(
  //           `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`
  //         ).then((res) => res.json().then((data) => setUser(data)));
  // },[isEdit]);

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
      <CarImageGallery
        id={car.dealer}
        car={car}
        user={user}
        status={JSON.stringify(user.cars).indexOf(car.id)}
      />
      {isEdit ? (
        <EditCarForm car={car} saveChanges={saveChanges} />
      ) : (
        getEditButton()
      )}
    </>
  );
}
