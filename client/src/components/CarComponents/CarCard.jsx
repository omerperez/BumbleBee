import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { error403 } from "../images/projectImages";

export default function CarCard({ _id, image, company, model, price }) {

  return (
    <div className="car-card-div">
      <Card className="car-card-width">
        <CardMedia
          component="img"
          height="170"
          image={image}
          onError={error403}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {company}
          </Typography>
          <Typography gutterBottom component="div" className="font-22">
            {model}
          </Typography>
          <div className="row mt-4">
            <div className="col-6 d-flex justify-content-start">
              <h4>{price} $</h4>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <Link
                to={`/car-profile/${_id}`}
                className="cancel-underline border2 border-radius-5"
              >
                <Button>More Details</Button>
              </Link>
            </div>
          </div>
        </CardContent>
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
