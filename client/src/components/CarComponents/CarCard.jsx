import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";
import DeleteCarDialog from "../DialogComponents/DeleteCarDialog";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
// import { Button } from "react-bootstrap";
export default function CarCard({ _id, image, company, model, price, currentPage, user }) {

  const {addCarToFavorite} = useAuth();
  const [newStatus, setNewStatus] = useState(
    currentPage === "myFavorite" ? true : JSON.stringify(user.cars).indexOf(_id) !== -1 ? true : false
  );
  const AddCarToFavorite = async () => {
    const res = await addCarToFavorite(user._id, _id);
    if(res == "OK"){
      setNewStatus(!newStatus);
      if(currentPage === "myFavorite"){
        window.location.reload(true);
      }
    }
  }

  return (
    <div className="car-card-div " style={{ maxWidth: "300px" }}>
      <Card className="car-card-width box-shadow-none">
        {user && user.role === 1 ? (
          <div className="pos-rel">
            <img
              src={image}
              className="cur-pointer br-10"
              height="165"
              width="100%"
              onError={error403}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Button
                style={{ background: "none", border: "none" }}
                onClick={AddCarToFavorite}
              >
                {newStatus ? (
                  <StarIcon fontSize="large" style={{ color: "#e6af5c" }} />
                ) : (
                  <StarBorderIcon
                    fontSize="large"
                    style={{ color: "#e6af5c" }}
                  />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Link to={`/car-profile/${_id}`} width={300} className="pos-rel">
            <img
              src={image}
              className="cur-pointer br-10"
              height="175"
              width="300"
              onError={error403}
            />
          </Link>
        )}
        <Typography
          className="mt-2 text-center font-sans"
          gutterBottom
          component="div"
        >
          <b>
            {company && company.length > 0
              ? company.charAt(0).toUpperCase() +
                company.toLowerCase().substr(1) +
                " " +
                model
              : company + " " + model}
          </b>
          <br />
          {price + "$"}
          <div className="text-center">
            <Link
              to={`/car-profile/${_id}`}
              className="cancel-underline f-14 capital-letter info-text-color"
            >
              click for more info
            </Link>
          </div>
        </Typography>
        {currentPage && currentPage === "myCars" ? (
          <div className="text-center">
            <DeleteCarDialog id={_id} name={company + " " + model} />
          </div>
        ) : null}
      </Card>
    </div>
  );
}























/* 
<div className="car-card-body">
            <div className="flex-50">
              <CalendarTodayIcon className="icon-text-space" />
              {year}
            </div>
            <div className="flex-50">
              <PanToolIcon className="icon-text-space" />
              {used}
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-50">
              <EngineeringIcon className="icon-text-space" />
              {engine}
            </div>
            <div className="flex-50">
              <AddRoadIcon className="icon-text-space " />
              {km}
            </div>
          </div>   
*/
