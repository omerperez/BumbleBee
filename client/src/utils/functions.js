import axios from "axios";
import fileDownload from "js-file-download";

const downloadFiles = (filePath, folder) => {
  filePath.forEach((file) => downloadFile(file, folder));
};

function removeDuplicateCompany(cars) {
  console.log(cars)
  return (Array.from(new Set(cars.map((obj) => obj.companyEnglish))).map(
    (companyEnglish, key) => {
      return companyEnglish;
    }
  ).toString());
}

function getTimeAvailabilityFormat(activityArray){
  const startHour = activityArray.start; 
  const endtHour = activityArray.end; 
  return `${
    startHour.substring(0, startHour.lastIndexOf("0") - 2) +
    " " +
    startHour.substring(startHour.indexOf("M") - 1)
  } - ${
    endtHour.substring(0, startHour.lastIndexOf("0") - 2) +
    " " +
    endtHour.substring(startHour.indexOf("M") - 1) }`;
};

const downloadFile = (filePath, folder) => {
  axios
    .get(`${folder + filePath}`, {
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
  getTimeAvailabilityFormat,
  removeDuplicateCompany,
};