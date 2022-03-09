import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
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
        passwordRef.current.value,
        phoneRef,
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
        <div className="mb-2">
          <h1 className="text-left mb-4 bumble-title">BumbleBee</h1>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <Card.Body>
          <h5 className="mt-3 second-title mb-2">Welcome</h5>
          <h4 className="mb-4">Sign Up for new account</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="first-name" className="mb-4">
              <div className="row">
                <div className="col">
                  <TextField
                    className="form-control"
                    id="first-name-user"
                    label="First Name"
                    inputRef={firstNameRef}
                    type="text"
                    variant="standard"
                    required
                  />
                </div>
                <div className="col">
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
            <Form.Group id="password" className="mb-5">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="false"
                inputRef={passwordRef}
                variant="standard"
                autoComplete="new-password"
                fullWidth
                required
              />
            </Form.Group>
            <Form.Group id="password" className="mb-5">
              <TextField
                id="standard-password-confirm-input"
                label="Password Confirmation"
                type="password"
                inputRef={passwordConfirmRef}
                variant="standard"
                fullWidth
                required
              />
            </Form.Group>
            <Form.Group id="mobile" className="mb-5">
              <TextField
                id="standard-mobile-input"
                label="Mobile Phone Number"
                type="number"
                inputRef={phoneRef}
                variant="standard"
                fullWidth
                required
              />
            </Form.Group>
            <Form.Group id="image" className="mb-5">
              <TextField
                id="file"
                label="Profile Image"
                type="file"
                name="image"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setFile(file);
                }}
                variant="standard"
                fullWidth
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
