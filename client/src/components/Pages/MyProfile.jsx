import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import UserCard from "../ProfileComponents/UserCard";
import UserFilesCard from "../ProfileComponents/UserFilesCard";

export default function MyProfile() {

  return (
    <>
      <PageTitle />
      <div className="justify-content-center">
        <div
          className="row mt-5"
        >
          <div className="col-5 mt-3">
            <UserCard />
          </div>
          <div className="col-7 mt-3">
            <div>
              <UserFilesCard />
            </div>
            <div className="mt-3 mb-3">
              <UserFilesCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
