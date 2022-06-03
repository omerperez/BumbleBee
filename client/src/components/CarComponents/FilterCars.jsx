import React, { useEffect, useState } from "react";
import {
  handleChangeSelect,
  handleChangeValueNumber,
} from "./CarsFilterFunctions";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import NoResultsAlert from "../Layout/NoResultsAlert";
import { useAuth } from "../../contexts/AuthContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function FilterCars({ carsState, carsSetState }) {
  const { currency, currencyValue } = useAuth();
  const [filters, setFilters] = useState(false);
  const [allCarsObjects, setAllCarsObjects] = useState(null);
  const [companyList, setCompanyList] = useState(["All"]);
  const [engineList, setEngineList] = useState(["All"]);
  const [gearboxList, setGearboxList] = useState(["All"]);
  const [company, setCompany] = useState(null);
  const [engine, setEngine] = useState(null);
  const [gearbox, setGearbox] = useState(null);
  const [minKm, setMinKm] = useState(0);
  const [maxKm, setMaxKm] = useState(10000000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [error, setError] = useState("");

  useEffect(() => {
    if (company === null && engine === null) {
      setAllCarsObjects(carsState);
      setCompanyList([
        ...Array.from(new Set(carsState.map((obj) => obj.companyEnglish))),
        "All",
      ]);
      setCompany([
        ...Array.from(new Set(carsState.map((obj) => obj.companyEnglish))),
        "All",
      ]);
      setEngineList([
        ...Array.from(new Set(carsState.map((obj) => obj.engine))),
        "All",
      ]);
      setEngine([
        ...Array.from(new Set(carsState.map((obj) => obj.engine))),
        "All",
      ]);
      setGearboxList([
        ...Array.from(new Set(carsState.map((obj) => obj.gearbox))),
        "All",
      ]);
      setGearbox([
        ...Array.from(new Set(carsState.map((obj) => obj.gearbox))),
        "All",
      ]);
    } else {
      console.log(maxPrice);
      console.log(currencyValue);
      carsSetState(
        allCarsObjects.filter((car) => {
          console.log(car.price);
          return (
            company.indexOf(car.companyEnglish) != -1 &&
            engine.indexOf(car.engine) != -1 &&
            gearbox.indexOf(car.gearbox) != -1 &&
            car.km >= minKm &&
            car.km <= maxKm &&
            car.price * currencyValue >= minPrice &&
            car.price * currencyValue <= maxPrice
          );
        })
      );
    }
  }, [
    company,
    engine,
    gearbox,
    minKm,
    maxKm,
    minPrice,
    maxPrice,
    currency,
    currencyValue,
  ]);

  const clearFilters = () => {
     setCompany(null);
     setEngine(null);
     setGearbox(null);
     setMinKm(0);
     setMaxKm(10000000);
     setMinPrice(0);
     setMaxPrice(10000000);
     carsSetState(allCarsObjects);
  }

  return (
    <>
      <div className="filters-grid mt-4 mb-2">
        <Button
          onClick={() => setFilters(!filters)}
          className="filter-car-btn m-1 mr-2 ml-2"
          variant="contained"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
        {filters ? (
          <>
            <Button
              onClick={clearFilters}
              className="app-background capital-letter ls-1 m-1 mr-2 ml-2"
              variant="contained"
              startIcon={<ClearAllIcon />}
            >
              Clear
            </Button>
            <FormControl fullWidth className="m-1 plr-10px">
              <InputLabel>Manufacturer</InputLabel>
              <Select
                size="small"
                label="company"
                value={company?.length === 1 ? company : "All"}
                onChange={(e) =>
                  setCompany(handleChangeSelect(e.target.value, companyList))
                }
              >
                {companyList.sort().map((company) => {
                  return (
                    <MenuItem key={company.id} value={company}>
                      {company}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <InputLabel>Engine</InputLabel>
              <Select
                size="small"
                label="Engine"
                value={engine?.length === 1 ? engine : "All"}
                onChange={(e) =>
                  setEngine(handleChangeSelect(e.target.value, engineList))
                }
              >
                {engineList
                  .sort()
                  .reverse()
                  .map((engine) => {
                    return (
                      <MenuItem key={engine.id} value={engine}>
                        {engine}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <InputLabel>Gearbox</InputLabel>
              <Select
                size="small"
                label="Gearbox"
                value={gearbox?.length === 1 ? gearbox : "All"}
                onChange={(e) =>
                  setGearbox(handleChangeSelect(e.target.value, gearboxList))
                }
              >
                {gearboxList.sort().map((gearType) => {
                  return (
                    <MenuItem key={gearType.id} value={gearType}>
                      {gearType}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <TextField
                size="small"
                label="Min Price"
                value={minPrice && minPrice !== 0 ? minPrice : ""}
                type="number"
                onChange={(e) => {
                  if (e.target.value < 0) {
                    setError("Please enter only positive numbers");
                    setMinPrice(handleChangeValueNumber(e.target.value, 0));
                  } else {
                    setError("");
                    setMinPrice(handleChangeValueNumber(e.target.value, 0));
                  }
                }}
              ></TextField>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <TextField
                size="small"
                label="Max Price"
                type="number"
                value={maxPrice && maxPrice !== 10000000 ? maxPrice : ""}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    setError("Please enter only positive numbers");
                    setMaxPrice(
                      handleChangeValueNumber(e.target.value, 10000000)
                    );
                  } else {
                    setError("");
                    setMaxPrice(
                      handleChangeValueNumber(e.target.value, 10000000)
                    );
                  }
                }}
              ></TextField>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <TextField
                size="small"
                label="Min Kilometer"
                type="number"
                value={minKm && minKm !== 0 ? minKm : ""}
                onChange={(e) => {
                  if (e.target.value < 0) {
                    setError("Please enter only positive numbers");
                    setMinKm(handleChangeValueNumber(e.target.value, 0));
                  } else {
                    setError("");
                    setMinKm(handleChangeValueNumber(e.target.value, 0));
                  }
                }}
              ></TextField>
            </FormControl>
            <FormControl fullWidth className="m-1 plr-10px">
              <TextField
                size="small"
                label="Max Kilometer"
                value={maxKm && maxKm !== 10000000 ? maxKm : ""}
                type="number"
                onChange={(e) => {
                  if (e.target.value < 0) {
                    setError("Please enter only positive numbers");
                    setMaxKm(handleChangeValueNumber(e.target.value, 10000000));
                  } else {
                    setError("");
                    setMaxKm(handleChangeValueNumber(e.target.value, 10000000));
                  }
                }}
              ></TextField>
            </FormControl>
          </>
        ) : null}
      </div>

      {error ? (
        <div className="p-1">
          <Alert sx={{ mb: 2, mt: 2 }} severity="info">
            {error}
          </Alert>
        </div>
      ) : carsState.length == 0 ? (
        <NoResultsAlert />
      ) : null}
    </>
  );
}
