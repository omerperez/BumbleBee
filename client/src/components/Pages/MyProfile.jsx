import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import OtherPropertiesCard from "../ProfileComponents/OtherPropertiesCard";
import ProfileSide from "../ProfileComponents/ProfileSide";
import axios from "axios";
import RequestSteps from "../AlertsComponents/RequestSteps";

export default function MyProfile() {

  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //       setLoading(false);
  //     });
  // }, []);

  const fetchData = () => {
    const currentUserApi = `${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`;
    const notificationApi = `${process.env.REACT_APP_SERVER_API}/notification/client/${currentUser._id}`;

    const getUser = axios.get(currentUserApi);
    const getNotification = axios.get(notificationApi);

    axios.all([getUser, getNotification]).then(
      axios.spread((...allData) => {
        const userData = allData[0].data;
        const notificationData = allData[1].data;
        setUser(userData);
        setAlert(
          notificationData.length > 0 ? notificationData[notificationData.length - 1] : null
        );
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mt-15 d-flex justify-content-center">
        <CircularProgress size={200} />
      </div>
    );
  }
  
  return (
    <>
      <PageTitle />
      <div className="d-flex justify-content-centermt-5 pad-1">
        <div className="col-3 mt-5 mb-5 offset-1">
          <ProfileSide currentUser={user} />
          {user.role === 1 ? (
            <>
              <div className="mt-4">
                <h3 className="fw-100"> Request Steps </h3>
              </div>
            </>
          ) : null}
        </div>
        <div className="col-9 ml-25 mt-5 mb-5 col-sm-7">
          <OtherPropertiesCard currentUser={user} />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {user.role === 1 ? <RequestSteps step={alert ? alert.step : 1} /> : null}
      </div>
    </>
  );
}
