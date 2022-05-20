import React, { useState, useEffect } from "react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import axios from "axios";
import RatingDealer from "../ProfileComponents/RatingDealer";
import Loading from "../Layout/Loading";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function DealerRatingDialog({dealer, client}) {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rateCount, setRateCount] = useState();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/user/find-rating/${client}/${dealer}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRateCount(data ? data.count : 0);
      });
  }, []);

  const sendRating = () => {
    setLoading(true);
    const message = {
      client: client,
      dealer: dealer,
      count: rateCount,
    };
    api
      .post(`/user/rating`, message)
      .then(() => {
        setLoading(false);
        setOpen(false);
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
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
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => setOpen(false)}
            color="error"
            className="capital-letter ls-2 f-18"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
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
