import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SelectAccountTypeDialog from "../DialogComponents/SelectAccountTypeDialog";

export default function FormInput({ label, type, carChange, loadingStatus, name }) {
  return (
    <TextField
      className="form-control mb-3"
      id={label + type}
      label={label}
      type={type}
      variant="standard"
      name={name}
      onChange={(e) => carChange(e)}
      required
      disabled={loadingStatus}
      autoComplete="new-password"
    />
  );
}
