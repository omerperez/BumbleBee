import { FilledInput, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useForm from "../../utils/useForm";
import { carsCompany } from "./exportForSelect";

export default function FilterCars({ labelName, formName, data }) {
  const [values, carChange] = useForm();
  const [cars, setCars] = useState([]);

  return (
    <FormControl fullWidth className="pl-1 pr-1">
      <InputLabel>{labelName}</InputLabel>
      <Select
        label={labelName}
        name={formName}
        value={values.company ? values.company : "All"}
        onChange={(e) => carChange(e)}
      >
        {Array.from(new Set(data.map((obj) => obj.companyEnglish))).map(
          (companyEnglish, key) => {
            return (
              <MenuItem key={companyEnglish.id} value={companyEnglish}>
                {companyEnglish}
              </MenuItem>
            );
          }
        )}
      </Select>
    </FormControl>

    // <div className="cars-grid mt-4 mb-2" value={values}>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <InputLabel>Manufacturer</InputLabel>
    //     <Select
    //       label="company"
    //       name="company"
    //       value={values.company ? values.company : "All"}
    //       onChange={(e) => carChange(e)}
    //     >
    //       {Array.from(new Set(data.map((obj) => obj.companyEnglish))).map(
    //         (companyEnglish, key) => {
    //           return (
    //             <MenuItem key={companyEnglish.id} value={companyEnglish}>
    //               {companyEnglish}
    //             </MenuItem>
    //           );
    //         }
    //       )}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <InputLabel>Minumim Price</InputLabel>
    //     <Select
    //       label="Minimum price"
    //       name="minPrice"
    //       value={values.minPrice ? values.minPrice : 0}
    //       onChange={(e) => carChange(e)}
    //     >
    //       {Array.from(new Set(data.map((obj) => obj.price))).map(
    //         (price, key) => {
    //           return (
    //             <MenuItem key={price.id} value={price}>
    //               {price}
    //             </MenuItem>
    //           );
    //         }
    //       )}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <InputLabel>Max Price</InputLabel>
    //     <Select
    //       label="Max Price"
    //       name="maxPrice"
    //       value={values.maxPrice ? values.maxPrice : null}
    //       onChange={(e) => carChange(e)}
    //     >
    //       {Array.from(new Set(data.map((obj) => obj.price))).map(
    //         (price, key) => {
    //           return (
    //             <MenuItem key={price.id} value={price}>
    //               {price}
    //             </MenuItem>
    //           );
    //         }
    //       )}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <InputLabel>Engine</InputLabel>
    //     <Select
    //       label="Engine"
    //       name="engine"
    //       value={values.engine ? values.engine : null}
    //       onChange={(e) => carChange(e)}
    //     >
    //       {Array.from(new Set(data.map((obj) => obj.engine))).map(
    //         (engine, key) => {
    //           return (
    //             <MenuItem key={engine.id} value={engine}>
    //               {engine}
    //             </MenuItem>
    //           );
    //         }
    //       )}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <InputLabel>Gearbox</InputLabel>
    //     <Select
    //       label="Gearbox"
    //       name="gearbox"
    //       value={values.gearbox ? values.gearbox : "All"}
    //       onChange={(e) => carChange(e)}
    //     >
    //       {Array.from(new Set(data.map((obj) => obj.gearbox))).map(
    //         (gearbox, key) => {
    //           return (
    //             <MenuItem key={gearbox.id} value={gearbox}>
    //               {gearbox}
    //             </MenuItem>
    //           );
    //         }
    //       )}
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <TextField
    //       label="Minimum KM"
    //       name="minKm"
    //       value={values.minKm ? values.minKm : null}
    //       type="number"
    //       onChange={(e) => carChange(e)}
    //     ></TextField>
    //   </FormControl>
    //   <FormControl fullWidth className="pl-1 pr-1">
    //     <TextField
    //       label="Maximun KM"
    //       name="maxKm"
    //       value={values.maxKm ? values.maxKm : null}
    //       type="maxKm"
    //       onChange={(e) => carChange(e)}
    //     ></TextField>
    //   </FormControl>
    // </div>
  );
}
