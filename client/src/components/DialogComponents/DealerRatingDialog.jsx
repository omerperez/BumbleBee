import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import axios from "axios";
import RatingDealer from "../ProfileComponents/RatingDealer";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function DealerRatingDialog({dealer, client}) {
  
  const [open, setOpen] = useState(false);
  const [rateCount, setRateCount] = useState();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/user/find-rating/${client}/${dealer}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRateCount(data ? data.count : 0);
      });
  }, []);

  const sendRating = () => {
    const message = {
      client: client,
      dealer: dealer,
      count: rateCount,
    };
    api
      .post(`/user/rating`, message)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpen(false);
    window.location.reload(true);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="capital-letter ls-less1"
        variant="contained"
        endIcon={<StarHalfIcon />}
      >
        Rate Dealer
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="fw-100 f-30">
          Star Rating
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="text-center"
          >
            <RatingDealer
              readOnly={false}
              ratingCount={rateCount}
              setRatingCount={setRateCount}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="error"
            className="capital-letter ls-2 f-18"
          >
            Cancel
          </Button>
          <Button
            onClick={sendRating}
            autoFocus
            color="primary"
            className="capital-letter ls-2 f-18"
          >
            Rate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
