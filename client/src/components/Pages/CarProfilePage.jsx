import React, {useState, useEffect} from "react";
import CarImageGallery from "../CarComponents/CarImageGallery";
import CarProfileBody from "../CarComponents/CarProfileBody";
import PageTitle from "../Layout/PageTitle";
import EditCarForm from "../CarComponents/EditCarForm";
import { editCarIcon, error403 } from "../images/projectImages";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Loading from "../Layout/Loading";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CarProfilePage() {
  
  const { currentUser, currency } = useAuth();
  const [car, setCar] = useState();
  const [loading, setLoading ] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState();
  const matches675 = useMediaQuery("(max-width:675px)");

  const fetchData = () => {
    const userId = currentUser._id;
    const index = window.location.toString().lastIndexOf("/") + 1;
    const id = window.location.toString().substring(index);
    
    const userApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${userId}`;
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
  }, [isEdit, currency]);

  if (loading) {
    return <Loading />;
  }
  
  if(car == null ) return 'Sorry We dont find your car...'

  function getEditButton(){
    return (
      <div className={matches675 ? null : "row"}>
        <div className={matches675 ? null : "col-11"}>
          <CarProfileBody car={car} />
        </div>
        {car.dealer == currentUser._id && currentUser.role === 2 ? (
        <div className="col">
          <img
            className="cur-pointer"
            src={editCarIcon}
            width={85}
            onClick={() => setIsEdit(true)}
            onError={error403}
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
