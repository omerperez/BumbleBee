import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  israelFlag,
  emptyProfileImage,
  profileSuccess,
} from "../images/projectImages";

export default function Signup() {
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
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value,
        mobileRef.current.value,
        passwordRef.current.value,
        file
      );
      navigate("/homepage");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card className="no-border">
        <div>
          <h1 className="text-left mb-1 bumble-title">BumbleBee</h1>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <Card.Body>
          <h5 className="second-title mb-2">Welcome</h5>
          <h4 className="mb-3">Sign Up for new account</h4>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-1"></div>
            <Form.Group id="first-name" className="mb-3">
              <div className="row mb-3">
                <div className="col-7">
                  <TextField
                    className="form-control mb-4"
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
                        fohtmlForr="file"
                        src={file ? profileSuccess : emptyProfileImage}
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
                        console.log(userFile);
                      }}
                    />
                  </label>
                </div>
              </div>
            </Form.Group>
            <Form.Group id="email" className="mb-4">
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
            <Form.Group id="mobile" className="mb-3">
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
            <Form.Group id="password" className="mb-3">
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
            <Form.Group id="password" className="mb-4">
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
              className="w-100 yellow-btn mb-3"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
        <Link to="/login" className="cancel-underline">
          {" "}
          Log In
        </Link>
      </div>
    </>
  );
}
