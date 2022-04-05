import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { checkRegisterFields } from "./userFunctions";
import {
  israelFlag,
  emptyProfileImage,
  profileSuccess,
} from "../images/projectImages";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function DealerSignUp() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [file, setFile] = useState();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();

  const navigate = useNavigate();

  const ImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if (
      checkRegisterFields(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        mobileRef.current.value,
        passwordRef.current.value,
        file,
        "1"
      )
    ) {
      return setError("Please add image profile");
    }
    try {
      setError("");
      setLoading(true);
      const results = await signup(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        mobileRef.current.value,
        passwordRef.current.value,
        file
      );
      if (results !== "Success") {
        setError(results);
      } else {
        navigate("/homepage");
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }
  return (
    <Card className="no-border">
      <div>
        <h1 className="text-left mb-1 bumble-title">BumbleBee</h1>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <Card.Body>
        <h5 className="second-title">Welcome</h5>
        <h4 className="mb-2">Dealer Sign Up</h4>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-1"></div>
          <Form.Group id="first-name">
            <div className="row">
              <div className="col-7">
                <TextField
                  className="form-control mb-3"
                  id="first-name-user"
                  label="First Name"
                  inputRef={firstNameRef}
                  type="text"
                  variant="standard"
                  required
                />
                <TextField
                  className="form-control"
                  id="last-name-user"
                  label="Last Name"
                  inputRef={lastNameRef}
                  type="text"
                  variant="standard"
                  required
                />
              </div>
              <div className="col d-flex justify-content-center">
                <label htmlFor="file" className="custom-file-upload">
                  <div className="img-wrap">
                    <img
                      alt="img_signup"
                      className="img-wrop-src"
                      htmlFor="file"
                      src={
                        file && profileImage ? profileImage : emptyProfileImage
                      }
                    />
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="image/png, image/jpeg"
                    name="image"
                    className="display-none"
                    onChange={(event) => {
                      const userFile = event.target.files[0];
                      setFile(userFile);
                      ImageHandler(event);
                      console.log(userFile);
                    }}
                  />
                </label>
              </div>
            </div>
          </Form.Group>
          <Form.Group id="email" className="mb-3">
            <TextField
              id="standard-email-input"
              label="Email"
              inputRef={emailRef}
              type="email"
              autoComplete="new-password"
              variant="standard"
              fullWidth
              required
            />
          </Form.Group>
          <Form.Group id="mobile" className="mb-2">
            <div className="row">
              <div className="col">
                <TextField
                  disabled
                  id="input-with-icon-textfield"
                  label="Country"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          alt="israel_flag"
                          src={israelFlag}
                          width={25}
                          className="border-circle mr-10"
                        />
                        +972
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </div>
              <div className="col-9">
                <TextField
                  id="standard-email-input"
                  label="Mobile"
                  inputRef={mobileRef}
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  variant="standard"
                  fullWidth
                  required
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group id="password" className="mb-2">
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              inputRef={passwordRef}
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
            />
          </Form.Group>
          <Form.Group id="password" className="mb-1">
            <TextField
              id="standard-password-confirm-input"
              label="Password Confirmation"
              type="password"
              inputRef={passwordConfirmRef}
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
            />
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100 h-75 mt-5 yellow-btn"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mb-2">
        Need a regular account?
        <Link to="/signup" className="cancel-underline">
          {" "}
          Click here
        </Link>
      </div>
      <div className="w-100 text-center">
        Already have an account?
        <Link to="/login" className="cancel-underline">
          Log In
        </Link>
      </div>
    </Card>
  );
}
