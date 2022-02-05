import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function CustomsCard({name, link, image}) {
  return (
    <div style={{ width: "40%" }}>
      <Card style={{ margin: "10px", border: "solid 1px #363636" }}>
        <a href={link} className="cancel-underline" target="_blank">
          <img
            src={image}
            style={{
              backgroundSize: "cover",
              width: "100%",
              height: "200px",
              borderBottom: "solid 1px #363636",
            }}
          />
        </a>
        <CardContent
          style={{
            borderTop: "solid 1px #e2a021",
            background: "#363636",
            color: "#e2a021",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
