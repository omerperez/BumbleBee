import React, { useEffect, useState } from "react";
import useForm from "../../utils/useForm";
import { useAuth } from "../../contexts/AuthContext";
import { carsProperties } from "./exportForSelect";
import { checkCarsFields, CheckDisableStatus } from "./carFunctions";
import ChangeCurrency from "../Layout/ChangeCurrency"
import {
  uploadMultipleEmpty,
  uploadMainEmpty,
  error403,
} from "../images/projectImages";
import useLocalStorage from "../../utils/useLocalStorage";
import AlertInfoCarForm from "../Layout/AlertInfoCarForm";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Carousel } from "react-bootstrap";
import {
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  AlertTitle,
  Alert,
  useMediaQuery,
} from "@mui/material";

export default function CarForm() {
  
  const [values, carChange] = useForm();
  const { createNewCar } = useAuth();
  const [dataFromApi, setDataFromApi] = useState([]);
  const [dataFromSecApi, setDataFromSecApi] = useState([]);
  const [company, setCompany] = useState({});
  const [error, setError] = useState("");
  const [firstStatus, setFirstStatus] = useState(true);
  const [model, setModel] = useState("");
  const [secondStatus, setSecondStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [carMain, setCarMain] = useState(null);
  const matches = useMediaQuery("(max-width:800px)");
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [usdToeur, setUsdToeur] = useState(true);
  const [changeToEUR, setChangeToEUR] = useLocalStorage("usdToeur", true);

  useEffect(() => {

    fetch(process.env.REACT_APP_GOVIL_CARS_API + company.hebrew)
       .then((response) => response.json())
       .then((data) =>
         setDataFromApi(
           data.result.records.filter((car) => car.shnat_yitzur >= 2020)
         )
       );       
       const where = encodeURIComponent(
         JSON.stringify({
           Make: company.english ? company.english.charAt(0).toUpperCase() + company.english.slice(1) : '',
           Year: {
             $gte: 2015,
           },
         })
       );
      fetch(
        `https://parseapi.back4app.com/classes/Car_Model_List?order=Model&keys=Make,Model&where=${where}`,
        {
          headers: {
            "X-Parse-Application-Id":
              "hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z",
            "X-Parse-Master-Key": "SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW",
          },
        }
      ).then((response) => response.json())
        .then((data) => {
          setDataFromSecApi(data.results);
        });;
   }, [company]);

   useEffect(() => {
     if (!usdToeur){
       fetch(
         "https://v6.exchangerate-api.com/v6/df683e595d6e03131da42fee/latest/EUR"
       )
         .then((response) => response.json())
         .then((data) => {
           setChangeToEUR(data.conversion_rates.USD);
         })
         .catch((error) => {
           setChangeToEUR(0.96);
           console.log("error", error);
         });
     } else {
       setChangeToEUR(1)
     }
   }, [usdToeur]);

   const userSelectCompany = (e) => {
    setCompany(e.target.value); 
    setFirstStatus(false);
    carChange(e);
   }

   const userSelectModel = (e) =>{
    setModel(e.target.value)
    setSecondStatus(false);
    carChange(e);
   }

  const handleClickSubmit = async (e) => {
    e.preventDefault();
       if (values.image.length < 3) {
         setError("Minimum 3 Other files");
       }else{
         try {
           const changeDateFormat = values.firstRegistrationDate.replaceAll(
             "-",
             "/"
           );
           values.firstRegistrationDate = changeDateFormat;
           values.netPrice = values.price * 0.7;
           values.price = values.price * changeToEUR;
           setLoading(true);
           const status = await createNewCar(values);
           if (status !== "Success") {
             setError(status);
           }
         } catch {
           setError("Please Fill All Fields");
         }
         setLoading(false);
       }
  }

  const ImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCarMain(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length > 2) {
      setImageFiles(validImageFiles);
      return;
    }
    else {
      setError("3 Images Minimum");  
      return;
    }
    setError("Selected images are not of valid type!");
  };
  
  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  return (
    <div>
      {error ? (
        <Alert severity="error" className="mt-3 m-4 alert-border">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ) : (
        <AlertInfoCarForm />
      )}
      <div className="d-flex row mt-3">
        <h5>General Information</h5>
        <div className="col-12 col-sm-3 col-lg-2">
          <FormControl fullWidth className="mt-3">
            <InputLabel>Manufacturer</InputLabel>
            <Select
              label="company"
              name="company"
              value={values.company ? values.company : ""}
              onChange={userSelectCompany}
              required
            >
              {carsProperties.makes.map((make, key) => (
                <MenuItem key={make.id} value={make}>
                  {make.english}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-lg-2">
          <FormControl fullWidth disabled={firstStatus} className="mt-3">
            <InputLabel>Model</InputLabel>
            <Select
              label="model"
              name="model"
              value={values.model ? values.model : ""}
              onChange={userSelectModel}
              required
            >
              {Array.from(new Set(dataFromSecApi.map((obj) => obj.Model))).map(
                (Model, key) => {
                  return (
                    <MenuItem key={Model.id} value={Model}>
                      {Model}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-lg-2">
          <FormControl fullWidth disabled={secondStatus} className="mt-3">
            <InputLabel>Year</InputLabel>
            <Select
              label="year"
              name="year"
              value={values.year ? values.year : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.Year.map((year, key) => {
                return (
                  <MenuItem key={year.id} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-lg-2">
          <FormControl fullWidth disabled={secondStatus} className="mt-3">
            <InputLabel>Category</InputLabel>
            <Select
              label="category"
              name="category"
              value={values.category ? values.category : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.CategoriesTypes.map((category, key) => {
                return (
                  <MenuItem key={category.id} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-lg-2">
          <FormControl fullWidth disabled={secondStatus} className="mt-3">
            <InputLabel>Engine</InputLabel>
            <Select
              label="engine"
              name="engine"
              value={values.engine ? values.engine : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.engines.map((engine, key) => {
                return (
                  <MenuItem key={engine.id} value={engine}>
                    {engine}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-lg-2 mt-3">
          <FormControl fullWidth>
            <TextField
              disabled={firstStatus}
              label="Registration Date"
              name="firstRegistrationDate"
              type="date"
              value={
                values.firstRegistrationDate ? values.firstRegistrationDate : ""
              }
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                carChange(e);
                if (
                  (Date.now() - new Date(e.target.value)) /
                    (1000 * 60 * 60 * 24) >
                    700 ||
                  (Date.now() - new Date(e.target.value)) /
                    (1000 * 60 * 60 * 24) <
                    0
                ) {
                  setError(
                    error.includes(
                      "Date of Registration need to be 2 years from now maxium "
                    )
                      ? error
                      : "Date of Registration need to be 2 years from now maxium " +
                          error
                  );
                } else {
                  setError("");
                }
              }}
              required
            />
          </FormControl>
        </div>
      </div>
      <div className="row mt-4">
        <h5>Performance Specs</h5>
        <div className="col-12 col-sm-3 col-xl-2 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Condition</InputLabel>
            <Select
              label="condition"
              name="condition"
              value={values.condition ? values.condition : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.Condition.map((cond, key) => {
                return (
                  <MenuItem key={cond.id} value={cond}>
                    {cond}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-2 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Fuel Type</InputLabel>
            <Select
              label="fuel"
              name="fuel"
              value={values.fuel ? values.fuel : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.FuelTypes.map((fuel, key) => {
                return (
                  <MenuItem key={fuel.id} value={fuel}>
                    {fuel}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-2 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Gearbox</InputLabel>
            <Select
              label="gearbox"
              name="gearbox"
              value={values.gearbox ? values.gearbox : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.gearBoxesList.map((gearboxOption) => {
                return (
                  <MenuItem key={gearboxOption.id} value={gearboxOption}>
                    {gearboxOption}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-2 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Owners</InputLabel>
            <Select
              label="Owners"
              name="numberOfVehicleOwners"
              value={
                values.numberOfVehicleOwners ? values.numberOfVehicleOwners : ""
              }
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.NumberOfOwners.map((num, key) => {
                return (
                  <MenuItem key={num.id} value={num}>
                    {num}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-1 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Doors</InputLabel>
            <Select
              label="doors"
              name="doorCount"
              value={values.doorCount ? values.doorCount : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.doorCountOptions.map((doorOption, key) => {
                return (
                  <MenuItem key={doorOption.id} value={doorOption}>
                    {doorOption}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-1 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Seats</InputLabel>
            <Select
              label="seats"
              name="numberOfSeats"
              value={values.numberOfSeats ? values.numberOfSeats : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.countOfSeatsOptions.map((seatsOption, key) => {
                return (
                  <MenuItem key={seatsOption.id} value={seatsOption}>
                    {seatsOption}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-3 col-xl-2 mt-3">
          <FormControl fullWidth disabled={CheckDisableStatus(values)}>
            <InputLabel>Color</InputLabel>
            <Select
              label="color"
              name="colour"
              value={values.colour ?? ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.colorList.map((color, i) => {
                return (
                  <MenuItem key={color.id} value={color}>
                    {color}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row mt-4">
        <h5>Others</h5>
        <div className="col-12 col-sm-4">
          <FormControl
            fullWidth
            className="mt-3"
            disabled={CheckDisableStatus(values)}
          >
            <TextField
              label="km"
              name="km"
              min="0"
              type="number"
              value={values.km}
              onChange={(e) => {
                carChange(e);
                if (e.target.value < 0) {
                  setError(
                    error.includes("Please Enter Positive Number ")
                      ? error
                      : "Please Enter Positive Number " + error
                  );
                } else {
                  setError("");
                }
              }}
              required
            />
          </FormControl>
        </div>
        <div className="col-12 col-sm-4">
          <FormControl
            fullWidth
            className="mt-3"
            disabled={CheckDisableStatus(values)}
          >
            <InputLabel>Interior Design</InputLabel>
            <Select
              label="interior design"
              name="interiorDesign"
              value={values.interiorDesign ? values.interiorDesign : ""}
              onChange={(e) => carChange(e)}
              required
            >
              {carsProperties.InteriorDesign.map((designOption) => {
                return (
                  <MenuItem key={designOption.id} value={designOption}>
                    {designOption}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-12 col-sm-4 row mt-3">
          <div className="col-8 col-sm-9">
            <FormControl fullWidth>
              <TextField
                disabled={CheckDisableStatus(values)}
                label="Price"
                name="price"
                type="number"
                value={values.price ?? ""}
                onChange={(e) => {
                  carChange(e);
                  if (e.target.value <= 0) {
                    setError(
                      error.includes("Please Enter Positive Number ")
                        ? error
                        : "Please Enter Positive Number " + error
                    );
                  } else {
                    setError("");
                  }
                }}
              />
            </FormControl>{" "}
          </div>
          <div className="col-4 col-sm-3">
            <ChangeCurrency flag={usdToeur} setFlag={setUsdToeur} />
          </div>
        </div>
        <div className={"d-flex row"}>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-4 justify-content-center d-flex">
            <label htmlFor={"main"}>
              <img
                alt="main_image"
                className="cur-pointer br-15"
                width={matches ? "100%" : 300}
                height={matches ? "100%" : 200}
                src={values.main ? carMain : uploadMainEmpty}
                onError={error403}
              />
            </label>
            <input
              id="main"
              type="file"
              accept="image/png, image/jpeg"
              name="main"
              aria-required="true"
              className="display-none"
              onChange={(e) => {
                carChange(e);
                ImageHandler(e);
              }}
            />
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 justify-content-center d-flex mt-4">
            {images.length > 0 ? (
              <Carousel fade interval={null} className="mr-2">
                {images.map((image, key) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="cover-back br-15"
                        src={image}
                        width={matches ? 200 : 300}
                        height={200}
                        alt={"Car image"}
                        onError={error403}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : null}
            <label
              htmlFor={"image"}
              style={images.length > 0 ? { maxHeight: 20, width: 60 } : null}
            >
              {images.length > 0 ? (
                <div className="ml-2 text-center cur-pointer p-5 br-10 border-1-black app-background color-white">
                  Edit
                </div>
              ) : (
                <img
                  alt="other_images"
                  className={matches ? "cur-pointer" : "cur-pointer ml-25"}
                  width={matches ? "100%" : 300}
                  height={matches ? "100%" : 200}
                  src={uploadMultipleEmpty}
                  onError={error403}
                />
              )}
            </label>
            <input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              name="image"
              multiple
              aria-required="true"
              className="display-none"
              onChange={(e) => {
                if (e.target.files.length > 2) {
                  carChange(e);
                  changeHandler(e);
                } else {
                  changeHandler(e);
                }
              }}
            />
          </div>
          <div
            className={
              matches
                ? "m-auto col text-center mt-3 mb-2"
                : "jc-end mt-3 col text-end"
            }
          >
            {loading ? (
              <LoadingButton
                className="creat-car-btn"
                size="large"
                color="secondary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Creating...
              </LoadingButton>
            ) : (
              <Button
                className={
                  checkCarsFields(values)
                    ? "creat-car-btn"
                    : "creat-car-btn-dis"
                }
                variant="contained"
                disabled={!checkCarsFields(values)}
                onClick={handleClickSubmit}
                startIcon={<SaveIcon />}
              >
                Create
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}