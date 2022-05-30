import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function ProfileBodyMobile({car}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function checkHideStatus(page,rowsPerPage, position){
    return !(
      page * rowsPerPage < position &&
      position <= (page * rowsPerPage + rowsPerPage)
    );
  }
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 1)}>
                Company
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 1)}>
                {car.companyEnglish}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 2)}>
                Model
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 2)}>
                {car.model}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1} key={3}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 3)}>
                Year
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 3)}>
                {car.year}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1} key={4}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 4)}>
                Type Of Engine
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 4)}>
                {car.engine}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1} key={5}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 5)}>
                Mileage
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 5)}>
                {car.km + " km"}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 6)}>
                Category
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 6)}>
                {car.category}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1} key={7}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 7)}>
                Owners
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 7)}>
                {car.numberOfVehicleOwners}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 8)}>
                Price (Net)
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 8)}>
                {`${car.price}$ (${
                  car.netPrice ?? (car.price * 0.7).toString().substring(0, 8)
                }$)`}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 9)}>
                Fuel Consumption
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 9)}>
                {car.fuelConsumption}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 10)}>
                Seats
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 10)}>
                {car.numberOfSeats}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 11)}>
                Door Count
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 11)}>
                {car.doorCount}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 12)}>
                Gearbox
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 12)}>
                {car.gearbox}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 13)}>
                Emission Class
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 13)}>
                {car.emissionClass}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 14)}>
                First Registration
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 14)}>
                {Date(car.firstRegistration)
                  .toString()
                  .substring(
                    0,
                    Date(car.firstRegistration).toString().indexOf(":") - 2
                  )
                  .substring(
                    Date(car.firstRegistration).toString().indexOf(" ")
                  )}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 15)}>
                Colour
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 15)}>
                {car.colour}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 16)}>
                Interior Design
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 16)}>
                {car.interiorDesign}
              </TableCell>
            </TableRow>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 17)}>
                Views <VisibilityIcon className="ml-10" color="primary" />{" "}
              </TableCell>
              <TableCell hidden={checkHideStatus(page, rowsPerPage, 17)}>
                {car.clicksCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 17]}
        component="div"
        count={17}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
