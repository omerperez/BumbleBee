import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { error403, noAvailable, image403 } from "../images/projectImages";
import CarImagesCarousel from "../DialogComponents/CarImagesCarousel";

export default function CarImageGallery({ id, car }) {
  
  const [dealer, setDealer] = useState(car.dealer);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/` + car.dealer)
      .then((response) => response.json())
      .then((data) => {
        setDealer(data);
      });
  }, [car.dealer]);

  return (
    <>
      <div className="d-flex">
        <ImageList
          className="border-3-black flex-basis-17"
          gap={0}
          sx={{ height: 400 }}
          cols={1}
        >
          <CarImagesCarousel images={[...car.images, car.mainImage]} />
        </ImageList>
        <div className="flex-basis-50">
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
            height={400}
            className="border-3-black no-border-left"
            onError={error403}
          />
        </div>
        <div className="flex-basis-33 page-space">
          <DealerCard dealer={dealer ? dealer : null} />
        </div>
      </div>
    </>
  );
}

