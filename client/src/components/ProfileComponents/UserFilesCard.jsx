import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth } from "../../contexts/AuthContext";
import { Divider } from "@mui/material";
import axios from "axios";
import fileDownload from "js-file-download";
import { Link } from "react-router-dom";
import {
  error403,
  govFile1,
  govFile2,
  govFile3,
} from "../images/projectImages";

const downloadFile = (filePath) => {
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
};

export default function UserFilesCard() {
  const { currentUser } = useAuth();

  return (
    <div className="d-flex justify-content-start ">
      <Card>
        <div className="padding-usercard">
          <h5>File Status</h5>
        </div>
        <Divider />
        <div className="mt-5 mr-25 ml-25">
          <div className="d-flex justify-content-center mt-4">
            <img
              className="cur-pointer"
              src={govFile3}
              width={225}
              height={150}
              onClick={() =>
                downloadFile("AgafHaRechev_Yavu_Rechev_FORMS_06427709.pdf")
              }
              onError={error403}
            />
            <img
              className="cur-pointer"
              src={govFile2}
              width={225}
              height={150}
              onClick={() =>
                downloadFile(
                  "Application_for_personal_import_brokerage_license.pdf"
                )
              }
              onError={error403}
            />
            <img
              className="cur-pointer"
              src={govFile1}
              width={225}
              height={150}
              onClick={() =>
                downloadFile("תצהיר יבוא אישי - ידני 22.4.21.pdf.pdf")
              }
              onError={error403}
            />
          </div>
        </div>
        <CardContent className="d-flex justify-content-center mt-3">
          <div className="w-100 text-center">
            Need an explanation?
            <Link to="/govil" className="cancel-underline m-lg-1">
              Click here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
