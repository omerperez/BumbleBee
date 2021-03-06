import React from "react";
import PageTitle from "../Layout/PageTitle";
import { downloadFile } from "../../utils/functions";
import {
  error403,
  youtubeVideoAboutUs,
  govFile1,
  govFile2,
  govFile3,
} from "../images/projectImages";

export default function GovIL() {
  
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
              src={youtubeVideoAboutUs}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <img
              className="cur-pointer"
              src={govFile3}
              width={300}
              height={250}
              onClick={() =>
                downloadFile(
                  "/AgafHaRechev_Yavu_Rechev_FORMS_06427709.pdf",
                  "files"
                )
              }
              onError={error403}
            />
            <img
              className="cur-pointer"
              src={govFile2}
              width={300}
              height={250}
              onClick={() =>
                downloadFile(
                  "/Application_for_personal_import_brokerage_license.pdf",
                  "files"
                )
              }
              onError={error403}
            />
            <img
              className="cur-pointer"
              src={govFile1}
              width={300}
              height={250}
              onClick={() =>
                downloadFile("/?????????? ???????? ???????? - ???????? 22.4.21.pdf.pdf", "files")
              }
              onError={error403}
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
