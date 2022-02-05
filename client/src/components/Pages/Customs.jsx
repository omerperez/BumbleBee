import React from "react";
import CustomsCard from "../CustomsComponents/CustomsCard";
import PageTitle from "../Layout/PageTitle";

export default function Customs() {
  return (
    <>
      <PageTitle page={"Customs Broker"} />
      <div className="d-flex justify-content-center mt-3">
        <CustomsCard
          name={"R.G.A"}
          image={"/rga.jpeg"}
          link={
            "https://randg.co.il/?gclid=Cj0KCQiA3fiPBhCCARIsAFQ8QzW-Cy52nC_3KZF4ppHCXGQ-5IZH66ffDhJFZeNrVPiU5ef65swarYYaAsbPEALw_wcB"
          }
        />
        <CustomsCard
          name={"Gaash"}
          image={"/gash.jpeg"}
          link={"https://gaash-customs.co.il/customs-clearance/"}
        />
      </div>
      <div className="d-flex justify-content-center">
        <CustomsCard
          name={"Orian"}
          image={"/orian.jpeg"}
          link={
            "https://www.orian.com/article/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F/%D7%A2%D7%9E%D7%99%D7%9C%D7%95%D7%AA-%D7%9E%D7%9B%D7%A1-09-12-2019/"
          }
        />
        <CustomsCard
          name={"Noach - Niv"}
          image={"/niv.jpeg"}
          link={
            "https://www.orian.com/article/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99-%D7%90%D7%95%D7%A8%D7%99%D7%99%D7%9F/%D7%A2%D7%9E%D7%99%D7%9C%D7%95%D7%AA-%D7%9E%D7%9B%D7%A1-09-12-2019/"
          }
        />
      </div>
    </>
    //
  );
}
