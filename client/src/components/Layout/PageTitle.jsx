import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { carHeaderImage } from "../images/projectImages";

export default function PageTitle({ page }) {

  return (
    <div className="m-18">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          className="page-title-header"
          href={"/HomePage"}
        >
          <img
            alt=""
            src={carHeaderImage}
            className="bumble-img-log"
            width={40}
            height={40}
          />
          <Typography className="title-bumble-header">BubleBee</Typography>
        </Link>
        ) : (
      </Breadcrumbs>

      <Breadcrumbs className="header-title-space">
        <Typography className="page-title-font">{page}</Typography>
      </Breadcrumbs>
      <Divider />
    </div>
  );
}
