import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../contexts/AuthContext";
import { DialogContent } from "@mui/material";
import { Button, Form, Alert } from "react-bootstrap";

export default function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);
  const { editPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confimPass, setConfimPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = async () => {
     if (newPass !== confimPass) {
       return setError("Password Not Matches");
     }
     try {
       setError("");
       setLoading(true);
       const results = await editPassword(oldPass, newPass);
       if (results !== "Success") {
         setLoading(false);
         setError(results);
       } else {
        setLoading(false);
        setOpen(false);
      }
     } catch (err) {
       setError(err);
     } 
  };

  return (
    <div>
      <div className="w-100 text-center mb-3">
        <span className="mr-5">Do you want to change your password?</span>
        <span className="cur-pointer color-primary" onClick={handleClickOpen}>
          Click here
        </span>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-500">
          <DialogTitle id="alert-dialog-title">Change Password</DialogTitle>
          {error && <Alert variant="danger">{error}</Alert>}
          <DialogContent>
            <Form.Group className="mt-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setOldPass(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  setConfimPass(e.target.value);
                }}
              />
            </Form.Group>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleChangePassword} autoFocus color="primary">
              Apply
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
