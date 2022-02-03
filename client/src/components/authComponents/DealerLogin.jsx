import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function DealerLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/homepage");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100 card-width-max">
        <Card className="no-border">
          <div className="mb-5">
            <h1 className="text-left mb-4 bumble-title">BumbleBee</h1>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <Card.Body>
            <h5 className="mt-3 second-title mb-2">Welcome</h5>
            <h4 className="mb-5">Login to your account</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-4">
                <TextField
                  id="standard-email-input"
                  label="Email"
                  inputRef={emailRef}
                  type="email"
                  autoComplete="current-password"
                  variant="standard"
                  fullWidth
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mb-5">
                <TextField
                  id="standard-email-input"
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                  variant="standard"
                  fullWidth
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 mb-3 yellow-btn"
                type="submit"
              >
                Login
              </Button>
              <Button
                disabled={loading}
                className="mb-3 w-100 grey-btn"
                type="submit"
              >
                <Link to="/signup" className="link-in-btn">
                  Need an account? Sign In
                </Link>
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              Forgot Password?{" "}
              <Link to="/forgot-password" className="cancel-underline ">
                Click here
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
