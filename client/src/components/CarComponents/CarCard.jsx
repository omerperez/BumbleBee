import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PanToolIcon from "@mui/icons-material/PanTool";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddRoadIcon from "@mui/icons-material/AddRoad";


export default function CarCard({image, company, model, year, used,engine, km, price}) {
    
  return (
    <div className="car-card-div">
      <Card className="car-card-width">
        <CardMedia component="img" height="170" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company + " " + model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
            <div style={{ display: "flex" }}>
              <div className="flex-50">
                <EngineeringIcon className="icon-text-space" />
                {engine}
              </div>
              <div className="flex-50">
                <AddRoadIcon className="icon-text-space " />
                {km}
              </div>
            </div>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View More {" " + price}</Button>
        </CardActions>
      </Card>
    </div>
  );
}
