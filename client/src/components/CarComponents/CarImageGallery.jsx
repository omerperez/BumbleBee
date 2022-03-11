import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DealerCard from "./DealerCard";
import { useAuth } from "../../contexts/AuthContext";

export default function CarImageGallery({ id, car }) {
  // const url = "https://firebasestorage.googleapis.com/v0/b/bumblebee-d5c23.appspot.com/o/files%2F";
  const url = "https://bumblebee-pro.s3.eu-west-1.amazonaws.com/";
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
                  <img src={url + image} />
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
                ? url + car.images[0]
                : "/image_not_available.png"
            }
            width={"100%"}
            height={450}
            style={{ border: "solid 3px black", borderLeft: "none" }}
          />
        </div>
        <div style={{ flexBasis: "33%", marginLeft: "1%" }}>
          <DealerCard dealer={dealer ? dealer : null} />
        </div>
      </div>
    </>
  );
}

