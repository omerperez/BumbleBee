import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";
import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

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
    } else if (newPass.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    setLoading(true);
    try {
      setError("");
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
      <div className="w-100  mb-3">
        <Button
          onClick={handleClickOpen}
          className={"edit-profile-btn-dealer no-border"}
        >
          Change Password
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <DialogTitle id="alert-dialog-title" className="w-500">
            Change Password
          </DialogTitle>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Loading />
          ) : (
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
          )}
          <DialogActions>
            <Button
              onClick={handleClose}
              disabled={loading}
              className="cancel-back w-100 no-border mw-95 color-white capital-letter ls-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              autoFocus
              disabled={loading}
              color="primary"
              className="green-back no-border w-100 mw-95 color-white capital-letter ls-2"
            >
              Apply
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
