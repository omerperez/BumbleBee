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
      <div className="d-flex justify-content-center">
        <div>
          <div>
            <h1 style={{ textAlign: "center", fontWeight: 600 }}>
              {/* direction: "rtl", */}
              What should be done?
              {/* מה צריך לעשות ? */}
            </h1>
            <p
              style={{
                textAlign: "center",
                fontSize: 26,
                fontWeight: "100",
              }}
            >
              {/* הורד/י את הטפסים, בסיום המילואי עבור/י לשלב הבא להגשתם באתר. */}
              Please download the forms, at the end of filling out the forms go
              to the next step of submitting the forms on our site.
              <br />
              {/* אנחנו כבר נדאג להגיש עבורך את הטפסים באתר הממשלתי עם שאר הדברים
              הנלווים. */}
              We will make sure to submit for you the forms on the government
              website with the rest of the required things
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <iframe
              width="850"
              height="330"
              src="https://www.youtube.com/embed/vV0mj43AI3E"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="d-flex justify-content-center mt-1">
            <img
              className="cur-pointer"
              src="/svg/download_file_3.svg"
              width={300}
              height={250}
              onClick={() =>
                downloadFile("AgafHaRechev_Yavu_Rechev_FORMS_06427709.pdf")
              }
            />
            <img
              className="cur-pointer"
              src="/svg/download_file_2.svg"
              width={300}
              height={250}
              onClick={() =>
                downloadFile(
                  "Application_for_personal_import_brokerage_license.pdf"
                )
              }
            />
            <img
              className="cur-pointer"
              src="/svg/download_file_1.svg"
              width={300}
              height={250}
              onClick={() =>
                downloadFile("תצהיר יבוא אישי - ידני 22.4.21.pdf.pdf")
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
