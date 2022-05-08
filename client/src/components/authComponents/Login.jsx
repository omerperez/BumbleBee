import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SelectAccountTypeDialog from "../DialogComponents/SelectAccountTypeDialog";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, cleanCookie } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cleanCookie();
  }, [])
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
       const results = await login(
         emailRef.current.value,
         passwordRef.current.value
       );
      if (results !== "Success") {
        setError(results);
      } else {
        navigate("/homepage");
      }
    } catch(err) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }
  return (
    <Card className="no-border">
      <div className="mb-5">
        <h1 className="text-left bumble-title nowrap">BumbleBee</h1>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <Card.Body>
        <h5 className="second-title mb-2">Welcome</h5>
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
              id="standard-password-input"
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
        </Form>
        <div className="w-100 text-center mt-3">
          <SelectAccountTypeDialog />
        </div>
      </Card.Body>
    </Card>
  );
}
