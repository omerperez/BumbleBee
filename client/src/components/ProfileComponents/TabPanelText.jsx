import React from "react";
import EditIcon from '@mui/icons-material/Edit';
export default function TabPanelText({title, value}) {
  return (
    <div className="row mt-4">
      <b className="col-6 col-sm-3" style={{ letterSpacing: 1 }}>
        {title}
      </b>
      {title === "Website" ? (
        <a
          className="col-6 col-sm-5 cancel-underline"
          href={value}
          target="_blank"
        >
          <span style={{ fontWeight: 100, letterSpacing: 1.2 }}>{value}</span>
        </a>
      ) : (
        <span
          style={{ fontWeight: 100, letterSpacing: 1.2 }}
          className="col-6 col-sm-5"
        >
          {value}
        </span>
      )}
    </div>
  );
}
