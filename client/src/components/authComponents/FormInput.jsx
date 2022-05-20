import React from "react";
import TextField from "@mui/material/TextField";

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
