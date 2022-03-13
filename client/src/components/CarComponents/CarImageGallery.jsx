import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { error403, noAvailable, image403 } from "../images/projectImages";

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
      <div className="pl-1 pr-1 d-flex">
        <ImageList
          className="border-3-black flex-basis-17"
          gap={0}
          sx={{ width: 200, height: 450 }}
          cols={1}
        >
          {car.images && car.images.length > 0 ? (
            car.images.map((image, inx) => {
              return (
                <ImageListItem key={image}>
                  <img
                    alt={"gallery" + inx}
                    src={process.env.REACT_APP_S3 + image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = { noAvailable };
                    }}
                  />
                </ImageListItem>
              );
            })
          ) : (
            <ImageListItem key={1}>
              <img alt="no_avl_img" src={noAvailable} />
            </ImageListItem>
          )}
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
            height={450}
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

