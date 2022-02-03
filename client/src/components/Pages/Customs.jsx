import React from "react";
import PageTitle from "../Layout/PageTitle";

export default function Customs() {
  return (
    <>
      <PageTitle page={"Customs Broker"} />
      <div className="justify-content-center d-flex m-4">
        <iframe
          className="col-6"
          src="https://randg.co.il/?gclid=Cj0KCQiAi9mPBhCJARIsAHchl1yMzOlP0RT74c79CgRdrxqiwioWQt1X9mhf0jql5TsUJ9WhMsiA7XQaAgNyEALw_wcB"
        ></iframe>
        <iframe
          className="col-6"
          height={"100%"}
          width={"100%"}
          src="https://randg.co.il/?gclid=Cj0KCQiAi9mPBhCJARIsAHchl1yMzOlP0RT74c79CgRdrxqiwioWQt1X9mhf0jql5TsUJ9WhMsiA7XQaAgNyEALw_wcB"
        ></iframe>
      </div>
      <div className="justify-content-center d-flex m-4">
        <iframe
          className="col-6"
          height={"100%"}
          width={"100%"}
          src="https://randg.co.il/?gclid=Cj0KCQiAi9mPBhCJARIsAHchl1yMzOlP0RT74c79CgRdrxqiwioWQt1X9mhf0jql5TsUJ9WhMsiA7XQaAgNyEALw_wcB"
        ></iframe>
        <iframe
          className="col-6"
          height={"100%"}
          width={"100%"}
          src="https://randg.co.il/?gclid=Cj0KCQiAi9mPBhCJARIsAHchl1yMzOlP0RT74c79CgRdrxqiwioWQt1X9mhf0jql5TsUJ9WhMsiA7XQaAgNyEALw_wcB"
        ></iframe>
      </div>
    </>
    //
  );
}
