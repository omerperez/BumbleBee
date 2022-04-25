import React from "react";
import EditIcon from '@mui/icons-material/Edit';
export default function TabPanelText({title, value}) {
  return (
    <div className="row mt-4">
      <b className="col-6 col-sm-3 ls-1">{title}</b>
      {title === "Website" ? (
        <a
          className="col-6 col-sm-5 cancel-underline"
          href={value}
          target="_blank"
        >
          <span className="ls-less1 fw-100">{value}</span>
        </a>
      ) : (
        <span className="ls-less1 fw-100 col-6 col-sm-5">
          {value}
        </span>
      )}
    </div>
  );
}
