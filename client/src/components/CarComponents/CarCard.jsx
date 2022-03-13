import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";

export default function CarCard({ _id, image, company, model, price }) {

  return (
    <div className="car-card-div">
      <Card className="car-card-width box-shadow-none border-radius-10">
        <Link to={`/car-profile/${_id}`}>
          <CardMedia
            className="border-radius-10 cur-pointer"
            component="img"
            height="140"
            image={image}
            onError={error403}
          />
        </Link>
        <Typography
          style={{ fontFamily: "sans-serif" }}
          className="mt-2 text-center"
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
