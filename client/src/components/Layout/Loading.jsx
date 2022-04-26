import { Typography, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div>
      <Typography className="d-flex justify-content-center mt-15">
        Loading...
      </Typography>
      <div className="d-flex justify-content-center mt-2">
        <CircularProgress size={80} />
      </div>
    </div>
  );
}
