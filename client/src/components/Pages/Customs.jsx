import React from "react";
import CustomsCard from "../CustomsComponents/CustomsCard";
import PageTitle from "../Layout/PageTitle";
import { costumsList } from "../CustomsComponents/customItems";

export default function Customs() {
  return (
    <div>
      <PageTitle page={"Customs Broker"} />
      <div className="pl-1 mt-4 pr-1 w-75 f-lighter">
        <h4> Why do you need a customs broker? </h4>A customs broker is
        responsible for filling out existing forms in import and export
        processes. It serves as an agent and trustee of an importer or exporter
        towards the customs authorities.
      </div>
      <div className="mt-4 broker-grid pl-1 pr-1">
        {costumsList.map((customs, key) => {
          return (
            <CustomsCard
              name={customs.name}
              image={customs.image}
              link={customs.link}
              color={customs.color}
              key={customs.name}
            />
          );
        })}
      </div>
      <div className="pl-1 pr-1 d-flex justify-content-center mt-5">
        <h4 className="mr-10px">Need more Information?</h4>
        <a
          href={
            "https://www.gov.il/he/departments/topics/customs_israel_tax_authority/govil-landing-page"
          }
          className="cancel-underline"
          target="_blank"
        >
          <h4>Click to Gov IL </h4>
        </a>
      </div>
    </div>
  );
}