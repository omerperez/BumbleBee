import React ,{useState, useEffect} from "react";
import PageTitle from "../Layout/PageTitle";
import Container from "@mui/material/Container";
import SmartTable from "../TableComponents/SmartTable";
import TableNoResults from "../TableComponents/TableNoResults";
import UserCells from "../TableComponents/UserCells";

const smallLabel = {  minHeight: '50px !important', width: "15%", marginTop: "21px" };
const medWidth = { minHeight: "50px", width: "20%" };
const noBorder = { minHeight: "50px", width: "17%", border: 'none !important' };

export default function ManageUserPage() {
  const [usersToPresent, setUsersToPresent] = useState([]);
  const [results, setResults] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user`)
      .then((response) => response.json())
      .then((data) => setUsersToPresent(data));
  }, []);

  const headCells = [
    {
      id: "User Id",
      numeric: false,
      disablePadding: true,
      label: "User ID",
      style: medWidth,
      hasborder: true,
    },
    {
      id: "First Name",
      numeric: false,
      disablePadding: true,
      label: "First Name",
      style: smallLabel,
      hasborder: true,
    },
    {
      id: "Last Name",
      numeric: false,
      disablePadding: true,
      label: "Last Name",
      style: smallLabel,
      hasborder: true,
    },
    {
      id: "Email",
      numeric: false,
      disablePadding: true,
      label: "Email Address",
      style: medWidth,
      hasborder: true,
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: true,
      label: "Mobile",
      style: noBorder,
      hasborder: true,
    },
    {
      id: "role",
      numeric: false,
      disablePadding: true,
      label: "User Type",
      style: noBorder,
      hasborder: true,
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Action",
      style: noBorder,
      hasborder: true,
    },
  ];

  return (
    <>
      <PageTitle page={"Users Information"} />
      <div className="pl-1 pr-1">
        <div className="justify-content-center d-flex">
          <Container component="main">
            <SmartTable
              data={usersToPresent}
              headCells={headCells}
              cells={<UserCells />}
              topNum={40}
            />
            {results && (
              <TableNoResults
                clearFilters={setUsersToPresent}
                data={usersToPresent}
                setReset={setReset}
                value={reset}
              />
            )}
          </Container>
        </div>
      </div>
    </>
  );
}
