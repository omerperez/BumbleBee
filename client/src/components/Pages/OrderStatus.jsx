import React from "react";
import PageTitle from "../Layout/PageTitle";
import { CircularProgress } from "@mui/material";
import AccessDenied from "../authComponents/AccessDenied";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertLayout from "../AlertsComponents/AlertLayout";
import TotalAlertStatistic from "../AlertsComponents/TotalAlertStatistic";

export default function OrderStatus() {
   const { currentUser } = useAuth();
   const navigate = useNavigate();
   
  // if (loading) {
  //   return (
  //     <div
  //       style={{ marginTop: "15%" }}
  //       className="d-flex justify-content-center"
  //     >
  //       <CircularProgress size={200} />
  //     </div>
  //   );
  // }

  const alert = {
    car: "6237838cf4784fc6a46f817e",
    client: "62373983d3d01059e218a3b2",
    dealer: "62373a47edc909d7c3c84bba",
    isCancelRequest: false,
    lastUpdateDate: "20.01.2022",
    dateOfCreated: "20.01.2022",
    step: 1,
    dealerComment:
      "Hi, here are the car licenses. If something is missing you will contact us.",
    paymentFiles: ["/files/dhl.svg", "/files/gov.svg"],
    carLicenseFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlFile: ["/files/dhl.svg", "/files/gov.svg"],
    dhlFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlRef: "asoindiniu1239871829jnaklnsad",
    dhlRef: "asoindiniu1239871829jnaklnsad",
    containerNumber: "ASP - 1953F3 MO",
    containerFiles: ["/files/dhl.svg", "/files/gov.svg"],
    dateOfDealerResponse: "28.01.2022",
    dateOfAttachFiles: "30.01.2022",
    dateOfContainerNumber: "02.02.2022",
  };

  const alert5 = {
    car: "6237838cf4784fc6a46f817e",
    client: "62373983d3d01059e218a3b2",
    dealer: "62373a47edc909d7c3c84bba",
    isCancelRequest: false,
    lastUpdateDate: "20.01.2022",
    dateOfCreated: "20.01.2022",
    step: 2,
    dealerComment:
      "Hi, here are the car licenses. If something is missing you will contact us.",
    paymentFiles: ["/files/dhl.svg", "/files/gov.svg"],
    carLicenseFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlFile: ["/files/dhl.svg", "/files/gov.svg"],
    dhlFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlRef: "asoindiniu1239871829jnaklnsad",
    dhlRef: "asoindiniu1239871829jnaklnsad",
    containerNumber: "ASP - 1953F3 MO",
    containerFiles: ["/files/dhl.svg", "/files/gov.svg"],
    dateOfDealerResponse: "28.01.2022",
    dateOfAttachFiles: "30.01.2022",
    dateOfContainerNumber: "02.02.2022",
  };

  const alert1 = {
    car: "6237838cf4784fc6a46f817e",
    client: "62373983d3d01059e218a3b2",
    dealer: "62373a47edc909d7c3c84bba",
    isCancelRequest: true,
    lastUpdateDate: "20.01.2022",
    dateOfCreated: "20.01.2022",
    step: 2,
    dealerComment:
      "Hi, here are the car licenses. If something is missing you will contact us.",
    paymentFiles: ["/files/dhl.svg", "/files/gov.svg"],
    carLicenseFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlFile: ["/files/dhl.svg", "/files/gov.svg"],
    dhlFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlRef: "asoindiniu1239871829jnaklnsad",
    dhlRef: "asoindiniu1239871829jnaklnsad",
    containerNumber: "ASP - 1953F3 MO",
    containerFiles: ["/files/dhl.svg", "/files/gov.svg"],
    dateOfDealerResponse: "28.01.2022",
    dateOfAttachFiles: "30.01.2022",
    dateOfContainerNumber: "02.02.2022",
  };

  const alert2 = {
    car: "6237838cf4784fc6a46f817e",
    client: "62373983d3d01059e218a3b2",
    dealer: "62373a47edc909d7c3c84bba",
    isCancelRequest: false,
    lastUpdateDate: "20.01.2022",
    dateOfCreated: "20.01.2022",
    step: 3,
    dealerComment:
      "Hi, here are the car licenses. If something is missing you will contact us.",
    paymentFiles: ["/files/dhl.svg", "/files/gov.svg"],
    carLicenseFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlFile: ["/files/dhl.svg", "/files/gov.svg"],
    dhlFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlRef: "asoindiniu1239871829jnaklnsad",
    dhlRef: "asoindiniu1239871829jnaklnsad",
    containerNumber: "ASP - 1953F3 MO",
    containerFiles: ["/files/dhl.svg", "/files/gov.svg"],
    dateOfDealerResponse: "28.01.2022",
    dateOfAttachFiles: "30.01.2022",
    dateOfContainerNumber: "02.02.2022",
  };

  const alert3 = {
    car: "6237838cf4784fc6a46f817e",
    client: "62373983d3d01059e218a3b2",
    dealer: "62373a47edc909d7c3c84bba",
    isCancelRequest: false,
    lastUpdateDate: "20.01.2022",
    dateOfCreated: "20.01.2022",
    step: 4,
    dealerComment:
      "Hi, here are the car licenses. If something is missing you will contact us.",
    carLicenseFile: ["/files/dhl.svg", "/files/gov.svg"],
    paymentFiles: ["/files/dhl.svg", "/files/gov.svg"],
    govIlFile: ["/files/dhl.svg", "/files/gov.svg"],
    dhlFile: ["/files/dhl.svg", "/files/gov.svg"],
    govIlRef: "asoindiniu1239871829jnaklnsad",
    dhlRef: "asoindiniu1239871829jnaklnsad",
    containerNumber: "ASP - 1953F3 MO",
    containerFiles: ["/files/dhl.svg", "/files/gov.svg"],
    dateOfDealerResponse: "28.01.2022",
    dateOfAttachFiles: "30.01.2022",
    dateOfContainerNumber: "02.02.2022",
  };

  const alerts = [
    alert,
    alert,
    alert1,
    alert1,
    alert2,
    alert2,
    alert3,
    alert3,
    alert5,
    alert5,
    alert5,
    alert5,
    alert5,
    alert5,
  ];

  if (currentUser && currentUser.role !== 2) {
    return (
      <>
        <PageTitle page={"Access Denied"} />
        <AccessDenied />
      </>
    );
  }
  return (
    <>
      <PageTitle page={"Order Status"} />
      <TotalAlertStatistic alerts={alerts} />
      <div>
        {alerts
          .sort((a, b) => {
            return a.step - b.step;
          })
          .map((alt, inx) => {
            return (
              // className="col-6"
              <div>
                <AlertLayout alert={alt} isDealer={currentUser.role == 2} />
              </div>
            );
          })}
      </div>
    </>
  );
}
