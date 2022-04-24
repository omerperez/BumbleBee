import React, { useState } from "react";
import useForm from "../../utils/useForm";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { checkRegisterFields, ImageHandler } from "./userFunctions";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MultipleSelectChip from "./MultipleSelectChip";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

export default function DealerSignUp() {

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [values, carChange] = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [mobile, setMobiel] = useState("");
  const [endHour, setEndHour] = useState(new Date("2018-01-01T00:00:00.000Z"));
  const [startHour, setStartHour] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [dayState, setDayState] = useState([]);

  async function handleSubmit() {
 
    if (values.password != values.confirmPassword) {
      return setError("Password do not match");
    }
    if(values.password.length < 6){
      return setError("Password must be at least 6 characters long");
    }
    values.mobile = mobile;
    if (checkRegisterFields(values)) {
      return setError("Please fill all fields");
    }
    values.role = "2";
    const dealer = {
      openingTime: startHour,
      closingTime: endHour,
      activityDays: dayState.toString().replaceAll("/[/]", ""),
    };
    try {
      setError("");
      setLoading(true);
     const results = await signup(values, dealer);
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
          <Form.Group id="dealer-form">
            <div className="row">
              <div className="col-7">
                <TextField
                  className="form-control mb-3"
                  id="first-name-user"
                  label="First Name"
                  type="text"
                  variant="standard"
                  name="firstName"
                  onChange={(e) => carChange(e)}
                  required
                  disabled={loading}
                />
                <TextField
                  className="form-control"
                  name="lastName"
                  onChange={(e) => carChange(e)}
                  id="last-name-user"
                  label="Last Name"
                  type="text"
                  variant="standard"
                  required
                  disabled={loading}
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
                          : "/seller-user.png"
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
                      carChange(event);
                      ImageHandler(event, setProfileImage);
                    }}
                    disabled={loading}
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
              onChange={(e) => carChange(e)}
              type="email"
              autoComplete="new-password"
              variant="standard"
              fullWidth
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group id="mobile" className="mb-2 mt-4">
            <PhoneInput
              defaultCountry="IL"
              placeholder="Mobile"
              value={mobile}
              onChange={setMobiel}
            />
          </Form.Group>
          <Form.Group id="password" className="mb-2">
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              name="password"
              onChange={(e) => carChange(e)}
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group id="password" className="mb-1">
            <TextField
              id="standard-password-confirm-input"
              label="Password Confirmation"
              type="password"
              name="confirmPassword"
              onChange={(e) => carChange(e)}
              variant="standard"
              autoComplete="new-password"
              fullWidth
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group id="days" className="mt-4 time-grid">
            <div className="mr-10">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Start"
                  value={startHour}
                  onChange={setStartHour}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={loading}
                />
              </LocalizationProvider>
            </div>
            <div className="mr-10">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="End"
                  value={endHour}
                  onChange={setEndHour}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={loading}
                />
              </LocalizationProvider>
            </div>
            <MultipleSelectChip
              setDayState={setDayState}
              dayState={dayState}
              status={loading}
            />
          </Form.Group>
          <Button
            disabled={loading}
            className="w-100 h-75 mt-4 yellow-btn"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </Card.Body>
      <div className="w-100 text-center mb-1 mr-2">
        Already have an account?
        <Link to="/login" className="cancel-underline">
          Log In
        </Link>
      </div>
      <div className="w-100 text-center mr-2">
        Need a regular account?
        <Link to="/signup" className="cancel-underline">
          Click here
        </Link>
      </div>
    </Card>
  );
}
