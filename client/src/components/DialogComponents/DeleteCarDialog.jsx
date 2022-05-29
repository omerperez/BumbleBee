import React, { useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });

export default function DeleteCarDialog({id, name, role}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () =>{
    api
      .delete(`/car/delete/${id}`)
      .then(function (response) {
        console.log(response);
        setOpen(false);
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
      });
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <DeleteIcon color="error" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You sure that you want to delete {name}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
