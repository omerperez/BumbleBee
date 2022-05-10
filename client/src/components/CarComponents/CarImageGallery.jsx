import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import DealerCard from "./DealerCard";
import { error403, image403 } from "../images/projectImages";
import CarImagesCarousel from "../DialogComponents/CarImagesCarousel";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import DealerPropertiesDialog from "../DialogComponents/DealerPropertiesDialog";
import { minWidth } from "@mui/system";

export default function CarImageGallery({ id, car, user }) {
  const [dealer, setDealer] = useState(car.dealer);
  const [newStatus, setNewStatus] = useState(JSON.stringify(user.cars).indexOf(car._id) != -1 ? true : false);
  const { addCarToFavorite, currentUser } = useAuth();
  const matches770 = useMediaQuery("(max-width:770px)");
  const matches1070 = useMediaQuery("(max-width:1070px)");

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
      <div className={matches770 ? "justify-content-center" : "row"}>
        {matches770 ? null : (
          <div
            className={
              matches1070 ? "col-2 col-md-3 p-0 pl-1" : "col-2 p-0 pl-1"
            }
          >
            <ImageList
              className="border-3-black"
              gap={0}
              sx={{ height: 550, background: "#363636" }}
              cols={1}
            >
              <CarImagesCarousel images={[...car.images, car.mainImage]} />
            </ImageList>
          </div>
        )}
        <div
          className={
            matches770
              ? "mt-2"
              : matches1070
              ? "col-12 col-md-9 col-xl-6 p-0 pr-1"
              : "col-12 col-lg-6 p-0 pr-1"
          }
        >
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
              height={matches770 ? null : 550}
              className={
                matches770
                  ? "border-bottom-0 border-3-black border-"
                  : "border-3-black no-border-left"
              }
              onError={error403}
            />
            {currentUser.role === 1 ? (
              <div className="start-pos">
                <Button className="no-border no-bg" onClick={AddCarToFavorite}>
                  {newStatus ? (
                    <StarIcon fontSize="large" className="yel-col-stars" />
                  ) : (
                    <StarBorderIcon
                      fontSize="large"
                      className="yel-col-stars"
                    />
                  )}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        {matches770 ? (
          <div className="row cur-pointer">
            <CarImagesCarousel images={[...car.images, car.mainImage]} />
          </div>
        ) : null}
        {matches1070 ? (
          <DealerPropertiesDialog
            dealer={dealer}
            role={user.role}
            showReq={user.isSendReq}
            car={car}
          />
        ) : (
          <div className="col-4">
            <DealerCard
              dealer={dealer}
              role={user.role}
              showReq={user.isSendReq}
              car={car}
            />
          </div>
        )}
      </div>
    </>
  );
}

