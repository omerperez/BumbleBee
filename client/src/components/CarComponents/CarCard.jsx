import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";
import DeleteCarDialog from "../DialogComponents/DeleteCarDialog";

export default function CarCard({ _id, image, company, model, price, currentPage }) {

  return (
    <div className="car-card-div" style={{ maxWidth: "300px" }}>
      <Card className="car-card-width box-shadow-none">
        <Link to={`/car-profile/${_id}`}>
          <CardMedia
            className=" border-radius-2 cur-pointer"
            component="img"
            height="140"
            image={image}
            onError={error403}
          />
        </Link>
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
        {currentPage && currentPage == 1 ? (
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
