import React, { useState } from "react";
import useForm from "../../utils/useForm";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  checkRegisterFields,
  ValidateEmail,
  ImageHandler,
} from "./userFunctions";
import {
  error403,
  israelFlag,
} from "../images/projectImages";
import {
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Signup() {
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [values, carChange] = useForm();
  const [error, setError] = useState("");
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (values.image == null) {
      return setError("Please Upload Image Profile");
    }
    if (!checkbox1 || !checkbox2 || !checkbox3) {
      return setError("Please confirm all checkboxes");
    }
    if (values.password !== values.confirmPassword) {
      return setError("Password do not match");
    }
    if (values.password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if(!ValidateEmail(values.email)){
      return setError("You have entered an invalid email address");
    }
    if (checkRegisterFields(values)) {
      return setError("Please add image profile");
    }
      values.mobile = `+972${values.mobile}`;
      values.role = "1";
      try {
        setError("");
        setLoading(true);
        const results = await signup(
          values, null
        );
        if (results !== "Success"){
          setError(results);
        }else{
          navigate("/login");
        }
      } catch(err) {
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
        <h4 className="mb-2">Sign Up for new account</h4>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-1"></div>
          <Form.Group id="first-name">
            <div className="row">
              <div className="col">
                <TextField
                  className="form-control mb-3"
                  id="first-name-user"
                  name="firstName"
                  label="First Name"
                  type="text"
                  variant="standard"
                  required
                  onChange={(e) => carChange(e)}
                />
                <TextField
                  className="form-control"
                  id="last-name-user"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  variant="standard"
                  required
                  onChange={(e) => {carChange(e)}}
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
                        values.image && profileImage
                          ? profileImage
                          : "/regular-user.png"
                      }
                      onError={error403}
                    />
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="image/png, image/jpeg"
                    name="image"
                    className="display-none"
                    onChange={(event) => {
                      carChange(event);
                      ImageHandler(event, setProfileImage);
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
              name="email"
              type="email"
              autoComplete="new-password"
              variant="standard"
              fullWidth
              required
              onChange={(e) => carChange(e)}
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
                          onError={error403}
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
                  id="standard-mobile-input"
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  variant="standard"
                  fullWidth
                  required
                  onChange={(e) => carChange(e)}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group id="password" className="mb-2">
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
              onChange={(e) => carChange(e)}
            />
          </Form.Group>
          <Form.Group id="password" className="mb-1">
            <TextField
              id="standard-password-confirm-input"
              label="Password Confirmation"
              name="confirmPassword"
              type="password"
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
              onChange={(e) => carChange(e)}
            />
          </Form.Group>
          <Form.Group id="cb1">
            <FormControlLabel
              onChange={(e) => setCheckbox1(e.target.value)}
              control={<Checkbox />}
              label="Im an Israeli citizen"
            />
          </Form.Group>
          <Form.Group id="cb2">
            <FormControlLabel
              onChange={(e) => setCheckbox2(e.target.value)}
              control={<Checkbox />}
              label="I have a valid driver's license"
            />
          </Form.Group>
          <Form.Group id="cb3">
            <FormControlLabel
              onChange={(e) => setCheckbox3(e.target.checked)}
              control={<Checkbox />}
              label="I have not imported vehicles in the last 12 months"
            />
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100 h-75 yellow-btn"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mb-2">
        Need a dealer account?
        <Link to="/dealer-login" className="cancel-underline">
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
