import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function DealerCard({fullName, email ,phoneNumber, image}) {

  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex" }}
      style={{ borderRadius: "2%", boxShadow: "5px 5px 5px 5px #888888" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4">
            {fullName}
          </Typography>
          <Typography variant="subtitle1" color={"#e2a021"} className="mt-1">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            {/* {() => {
              for (let i = 0; i < 5; i++)  <StarIcon />;
            }} */}
          </Typography>
          <div style={{ marginTop: "10%" }}>
            <div>
              <AlternateEmailIcon
                style={{ marginRight: "5%", color: "#363636" }}
              />
              {email}
            </div>
            <div className="mt-3 d-flex" style={{ whiteSpace: "nowrap" }}>
              <LocationOnIcon style={{ color: "#363636", marginRight: "5%" }} />
              Josef-Bautc-Strasse 16
              <br />
              DE-63457 Hanau
            </div>
            <div className="mt-3 d-flex" style={{ whiteSpace: "nowrap" }}>
              <PhoneInTalkIcon
                style={{ color: "#363636", marginRight: "5%" }}
              />
              {phoneNumber}
            </div>
            <div
              className="mt-4 d-flex justify-content-center"
              style={{ whiteSpace: "nowrap" }}
            >
              <Button variant="contained" style={{ background: "#4fa04f" }}>
                Send <WhatsAppIcon style={{ margin: "3%" }} /> to {fullName}{" "}
              </Button>
            </div>
          </div>
        </CardContent>
      </Box>
      <div style={{ margin: "auto" }}>
        <img
          src={image}
          width={170}
          style={{
            borderRadius: "50%",
            border: "solid 2px #363636"
          }}
        />
      </div>
    </Card>
  );
}
