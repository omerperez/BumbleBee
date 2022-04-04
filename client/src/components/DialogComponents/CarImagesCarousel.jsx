import React from "react";
import Dialog from "@mui/material/Dialog";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Button, Carousel } from "react-bootstrap";
import { error403, noAvailable } from "../images/projectImages";
import ImageListItem from "@mui/material/ImageListItem";
import CloseIcon from "@mui/icons-material/Close";

export default function CarImagesCarousel({ images }) {
  const [open, setOpen] = React.useState(false);

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
            ) : null;
          })
        ) : (
          <ImageListItem key={1}>
            <img alt="no_avl_img" src={noAvailable} />
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
                  />
                </Carousel.Item>
              );
            })}
        </Carousel>
      </Dialog>
    </div>
  );
}
