import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export default function CustomsCard({ name, link, image, color }) {
  return (
    <Card
      className="mr-2 mb-3"
      style={{
        border: `solid 1px ${color}`, 
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: color }}>{name[0]}</Avatar>}
        titleTypographyProps={{ variant: "h4" }}
        title={name}
      />
      <a href={link} className="cancel-underline" target="_blank">
        <img
          src={image}
          className="costoms-img"
          style={{
            borderTop: `solid 1px ${color}`,
            borderBottom: `solid 1px ${color}`,
          }}
        />
      </a>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <div className="row">
        <Button style={{ background: color }}>
          <a href={link} className="cancel-underline" target="_blank">
            <span className="mr-10px color-white">Go to website</span>
            <LanguageIcon className="color-white" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
