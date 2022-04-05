
import React from "react";
import Card from "@mui/material/Card";
import { useAuth } from "../../contexts/AuthContext";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import Chip from "@mui/material/Chip";

export default function UserCard() {
  const { currentUser } = useAuth();

  const handleClickEdit = () =>{
    console.log("omer")
  }
  
  return (
    <div className="d-flex justify-content-center">
      <Card sx={{ width: 350 }}>
        <div className="d-flex justify-content-center mt-3">
          <img
            width={300}
            height={300}
            className="cover-back border-circle"
            src={process.env.REACT_APP_S3 + currentUser.image}
            alt="Paella dish"
          />
        </div>
        <div className="d-flex justify-content-center mt-2"></div>
        <div className="padding-usercard">
          <div className="mr-15 f-right">
            <Chip
              label={
                currentUser.role === 2
                  ? "Dealer"
                  : currentUser.role == 3
                  ? "Admin"
                  : "Client"
              }
              className={currentUser.role === 2 ? "dealer-tag" : "client-tag"}
            />
          </div>
          <h3>{currentUser.firstName + " " + currentUser.lastName}</h3>
        </div>
        <div className="mt-4 mb-5 mr-15 ml-15">
          <div className="row">
            <span className="col opc-8">
              {currentUser.firstName + " " + currentUser.lastName}
            </span>
            <span className="col opc-8">
              {`${currentUser.phoneNumber.substr(
                0,
                4
              )}-${currentUser.phoneNumber.substr(4)}`}
            </span>
          </div>
          <div className="mt-4 opc-8">
            <span className="ls-2"> {currentUser.email} </span>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-4 mt-4">
          <Link
            to={"edit"}
            className="link-in-btn"
            variant="contained"
            onClick={handleClickEdit}
          >
            <Button
              className={
                currentUser.role !== 1
                  ? "edit-profile-btn-dealer"
                  : "edit-profile-btn"
              }
            >
              Edit Profile
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
