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

export default function DealerCard({ dealer }) {
  const theme = useTheme();
  const mobile = dealer.phoneNumber ? dealer.phoneNumber : "+972522520484";
  const whatsappMassege =
    "Hi " +
    dealer.firstName +
    ", I see you sell this car is BumbleBee: " +
    window.location.href +
    " can you bring me more details please?";

  const sendWhatsAppToDealer = () => {
    window.open("https://wa.me/" + mobile + "?text=" + whatsappMassege);
  };

  return (
    <Card
      className="grid-container"
      sx={{ display: "flex" }}
      style={{ borderRadius: "2%", boxShadow: "5px 5px 5px 5px #888888" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        className="grid-item"
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h4">
            {dealer.firstName + " " + dealer.lastName}
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
          <div className="mt-3">
            <div>
              <AlternateEmailIcon
                style={{ marginRight: "5%", color: "#363636" }}
              />
              {dealer.email}
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
              {mobile}
            </div>
            <div
              className="mt-4 d-flex justify-content-center"
              style={{ whiteSpace: "nowrap" }}
            >
              <Button
                variant="contained"
                style={{ background: "#4fa04f" }}
                onClick={sendWhatsAppToDealer}
              >
                Send <WhatsAppIcon style={{ margin: "3%" }} /> to{" "}
                {dealer.firstName + " " + dealer.lastName}{" "}
              </Button>
            </div>
          </div>
        </CardContent>
      </Box>
      <div style={{ margin: "auto" }} className="grid-item">
        <img
          src={`https://bumblebee-pro.s3.eu-west-1.amazonaws.com/${dealer.image}`}
          width={170}
          style={{
            borderRadius: "50%",
            border: "solid 2px #363636",
          }}
        />
      </div>
    </Card>
  );
}
