import React from "react";
import CreateCarForm from "../CarComponents/CreateCarForm";
import PageTitle from "../Layout/PageTitle";


export default function CreateCarPage() {

return(
    <>
        <PageTitle page={"Create New Car"} />
        <CreateCarForm />
    </>
    );
}