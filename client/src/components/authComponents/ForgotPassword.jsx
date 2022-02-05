import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage('');
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }
  return (
    <>
      <Card className="no-border">
        <div className="mb-5">
          <h1 className="text-left mb-4 bumble-title">BumbleBee</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="sucsses">{message}</Alert>}
        </div>
        <Card.Body>
          <h4 className="mb-4">Password Reset</h4>
          <h5 className="second-title mb-4">
            Don't worry, it takes a few moments
          </h5>
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
            <Button disabled={loading} className="w-100 grey-btn" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Button
              disabled={loading}
              className="w-100 green-btn"
              type="submit"
            >
              <Link to="/login" className=" link-in-btn">
                Do you remember the password? Log In
              </Link>
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ?{" "}
        <Link to="/signup" className="cancel-underline">
          Sign Up
        </Link>
      </div>
    </>
  );
}
