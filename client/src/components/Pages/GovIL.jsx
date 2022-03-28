import React from "react";
import PageTitle from "../Layout/PageTitle";
import fileDownload from "js-file-download";
import axios from "axios";
import Button from "@mui/material/Button";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

export default function GovIL() {

const filePath = "/files/govil1.pdf";

const downloadFile = (filePath) =>{
  axios
    .get(`/files/${filePath}`, {
      responseType: "blob",
    })
    .then((res) => {
      let filename = filePath.replace(/^.*[\\\/]/, "");
      let fileExtension;
      fileExtension = filePath.split(".");
      fileExtension = fileExtension[fileExtension.length - 1];
      fileDownload(res.data, `${filename}.${fileExtension}`);
    });
}

  return (
    <>
      <PageTitle page={"Gov IL"} />
      <div className="d-flex justify-content-center h-75">
        <div className="pl-1 pr-1 w-100 f-lighter">
          <div className="f-19">
            <p style={{ direction: "rtl", fontSize: 24 }}>
              <b>מה צריך לעשות ?</b>
              <br />
              להוריד את הטפסים ולאחר מילואי לעבור לשלב הבא. אנחנו כבר נדאג להגיש
              עבורך את הטפסים.
            </p>
          </div>
          <div
            style={{ justifyContent: "center", display: "flex", marginTop: 50 }}
          >
            <Button
              onClick={() =>
                downloadFile("AgafHaRechev_Yavu_Rechev_FORMS_06427709.pdf")
              }
              variant="contained"
              style={{ padding: 15, margin: 10 }}
              endIcon={<SimCardDownloadIcon />}
            >
              אישור מתן שירות לרכב ביבוא אישי - אישור שירות ממוסך
            </Button>

            <Button
              onClick={() =>
                downloadFile(
                  "Application_for_personal_import_brokerage_license.pdf"
                )
              }
              variant="contained"
              style={{ padding: 15, margin: 10 }}
              endIcon={<SimCardDownloadIcon />}
            >
              בקשה להוצאת רישיון כמתווך ביבוא אישי
            </Button>

            <Button
              onClick={() =>
                downloadFile("תצהיר יבוא אישי - ידני 22.4.21.pdf.pdf")
              }
              variant="contained"
              style={{ padding: 15, margin: 10 }}
              endIcon={<SimCardDownloadIcon />}
            >
              הורדת טופס תצהיר המיועד למייבא רכב ביבוא אישי
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
