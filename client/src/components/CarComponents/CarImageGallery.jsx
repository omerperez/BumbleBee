import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { error403 } from "../images/error403";

export default function CarImageGallery({ id, car }) {
  
  const [dealer, setDealer] = useState(car.dealer);

  useEffect(() => {
    fetch(`http://localhost:8080/user/my-user/` + car.dealer)
      .then((response) => response.json())
      .then((data) => {
        setDealer(data);
      });
  }, []);

  return (
    <>
      <div className="pl-1 pr-1" style={{ display: "flex" }}>
        <ImageList
          style={{
            flexBasis: "17%",
            height: 450,
            border: "solid 3px black",
          }}
          gap={0}
          sx={{ width: 200, height: 500 }}
          cols={1}
        >
          {car.images && car.images.length > 0 ? (
            car.images.map((image) => {
              return (
                <ImageListItem key={image}>
                  <img
                    src={process.env.REACT_APP_S3 + image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/noimages.png";
                    }}
                  />
                </ImageListItem>
              );
            })
          ) : (
            <ImageListItem key={1}>
              <img src="/noimages.png" />
            </ImageListItem>
          )}
        </ImageList>
        <div style={{ flexBasis: "50%", height: 450 }}>
          <img
            src={
              car.images && car.images.length > 0
                ? process.env.REACT_APP_S3 + car.images[0]
                : "/image_not_available.png"
            }
            width={"100%"}
            height={450}
            style={{ border: "solid 3px black", borderLeft: "none" }}
            onError={error403}
          />
        </div>
        <div style={{ flexBasis: "33%", marginLeft: "1%" }}>
          <DealerCard dealer={dealer ? dealer : null} />
        </div>
      </div>
    </>
  );
}

