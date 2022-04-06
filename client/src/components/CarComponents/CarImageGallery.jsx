import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { error403, noAvailable, image403 } from "../images/projectImages";
import CarImagesCarousel from "../DialogComponents/CarImagesCarousel";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

export default function CarImageGallery({ id, car, user }) {
  const [dealer, setDealer] = useState(car.dealer);
  const [newStatus, setNewStatus] = useState(JSON.stringify(user.cars).indexOf(car._id) != -1 ? true : false);
  const {addCarToFavorite} = useAuth();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${car.dealer}`)
      .then((response) => response.json())
      .then((data) => {
        setDealer(data);
      });
  }, [car.dealer]);

  const AddCarToFavorite = async () => {
    const res = await addCarToFavorite(user._id, car._id);
    if (res == "OK") {
      setNewStatus(!newStatus);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="mw-350">
          <ImageList
            className="border-3-black flex-basis-17"
            gap={0}
            sx={{ height: 550 }}
            cols={1}
          >
            <CarImagesCarousel images={[...car.images, car.mainImage]} />
          </ImageList>
        </div>
        <div className="flex-basis-50">
          <div className="position-relative">
            <img
              alt="main_image"
              src={
                car.mainImage
                  ? process.env.REACT_APP_S3 + car.mainImage
                  : car.images && car.images.length > 0
                  ? process.env.REACT_APP_S3 + car.images[0]
                  : image403
              }
              width={"100%"}
              height={550}
              className="border-3-black no-border-left"
              onError={error403}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "85%",
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
        </div>
        <div className="flex-basis-33 page-space">
          <DealerCard dealer={dealer ? dealer : null} />
        </div>
      </div>
    </>
  );
}

