import axios from "axios";
import fileDownload from "js-file-download";

const downloadFiles = (filePath) => {
  filePath.forEach((file) => downloadFile(file));
};

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

export {
  downloadFiles,
  downloadFile,
};