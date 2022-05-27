import React, { useState } from "react";
import { Link } from "react-router-dom";
import { error403, carRedIconSale } from "../images/projectImages";
import DeleteCarDialog from "../DialogComponents/DeleteCarDialog";
import { useAuth } from "../../contexts/AuthContext";
import {numberWithCommas} from "./carFunctions";
import { Card, Typography, Button, Chip } from "@mui/material";
import CarRentalIcon from "@mui/icons-material/CarRental";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function CarCard({ _id, image, company, model, price, netPrice, currentPage, user, isSale, isOwner }) {

  const { addCarToFavorite, currency } = useAuth();
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
    <div
      className="car-card-div mw-300"
      style={{ background: "#F8F8F8	", borderRadius: 5, padding: 1, margin: 10 }}
    >
      <Card className="car-card-width box-shadow-none">
        {user && user.role === 1 ? (
          <div className="pos-rel">
            <img
              src={image}
              className="cur-pointer br-10"
              width="100%"
              height={170}
              onError={error403}
            />
            <div className="start-pos">
              <Button className="no-border no-bg" onClick={AddCarToFavorite}>
                {newStatus ? (
                  <StarIcon fontSize="large" className="yel-col-stars" />
                ) : (
                  <StarBorderIcon fontSize="large" className="yel-col-stars" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Link to={`/car-profile/${_id}`} width={300}>
            <div className="pos-rel">
              <img
                src={image}
                className="cur-pointer br-10"
                width="100%"
                height={170}
                onError={error403}
              />
              <div className="sale-pos">
                {isSale ? (
                  <img src={carRedIconSale} width={70} height={60} />
                ) : isOwner ? (
                  <Chip
                    icon={<CarRentalIcon />}
                    label="Your vehicle"
                    sx={{ background: "#42ADFF", color: 'white' }}
                    className="opc-8 m-1"
                  />
                ) : null}
              </div>
            </div>
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
          <span className="mr-2 w-400" style={{ color: "#3CB371" }}>
            Price:
          </span>
          <span className="fw-100">
            {currency == 1
              ? "$" + numberWithCommas(price)
              : currency == 2
              ? numberWithCommas(price) + "€"
              : numberWithCommas(price) + "₪"}
            <br />
          </span>
          <span className="mr-2 fw-400" style={{ color: "#FF6347" }}>
            Taxes:
          </span>
          <span className="fw-100">
            {currency == 1
              ? "$" + numberWithCommas(netPrice)
              : currency == 2
              ? numberWithCommas(netPrice) + "€"
              : numberWithCommas(netPrice) + "₪"}
          </span>
          <div className="text-center">
            <Link
              to={`/car-profile/${_id}`}
              className="cancel-underline capital-letter info-text-color" //f-14
            >
              more info
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
