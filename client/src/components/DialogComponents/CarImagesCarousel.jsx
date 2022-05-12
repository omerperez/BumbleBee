import React from "react";
import Dialog from "@mui/material/Dialog";
import { Carousel } from "react-bootstrap";
import { error403, noAvailable } from "../images/projectImages";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CarImagesCarousel({ images }) {
  const [open, setOpen] = React.useState(false);
  const matches770 = useMediaQuery("(max-width:770px)");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        {images && images.length > 0 ? (
          images.map((image, inx) => {
            return images.length - 1 !== inx ? (
              !matches770 ? (
                <ImageListItem
                  key={image}
                  onClick={handleClickOpen}
                  className="cur-pointer"
                >
                  <img
                    alt={"car gallery " + inx}
                    src={process.env.REACT_APP_S3 + image}
                    onError={error403}
                  />
                </ImageListItem>
              ) : inx > 3 ? null : (
                <img
                  onClick={handleClickOpen}
                  width={"25%"}
                  height={"100%"}
                  className="col border-2-black"
                  alt={"car gallery " + inx}
                  src={process.env.REACT_APP_S3 + image}
                  onError={error403}
                />
              )
            ) : null;
          })
        ) : (
          <ImageListItem key={1}>
            <img alt="no_avl_img" src={noAvailable} onError={error403} />
          </ImageListItem>
        )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Carousel>
          {images &&
            images.map((image, key) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 cover-back"
                    src={process.env.REACT_APP_S3 + image}
                    key={key}
                    alt={"Car image"}
                    onError={error403}
                  />
                </Carousel.Item>
              );
            })}
        </Carousel>
      </Dialog>
    </div>
  );
}
