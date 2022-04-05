import React from "react";
import PageTitle from "../Layout/PageTitle";
import fileDownload from "js-file-download";
import axios from "axios";

export default function GovIL() {

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
            <h1 className="text-center fw-600">What should be done?</h1>
            <p className="text-center fw-100 font-26">
              Please download the forms, at the end of filling out the forms go
              to the next step of submitting the forms on our site.
              <br />
              We will make sure to submit for you the forms on the government
              website with the rest of the required things
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <iframe
              width="850"
              height="310"
              src="https://www.youtube.com/embed/vV0mj43AI3E"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="d-flex justify-content-center mt-4">
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
          <div className="d-flex justify-content-center">
            <h4 className="mr-5">Or you can fill the form in </h4>
            <a
              href={
                "https://www.gov.il/he/departments/topics/customs_israel_tax_authority/govil-landing-page"
              }
              target="_blank"
            >
              <h4>Gov IL site</h4>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
