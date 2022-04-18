var _ = require('lodash');
const axios = require('axios');
// set url as constant
const URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=03adc637-b6fe-402b-9937-7c3d3afc9140&limit=1000'

axios
  .get(URL)
  .then(response => {
    console.log(response.data.result.records);
    cars = response.data.result.records;
   c = cars.filter((car) => car.shnat_yitzur >= 2020);
   console.log(c);
    console.log(_.countBy(c,'shnat_yitzur'));

    
  })
  .catch(error => {
    console.log(error);
  });

  // fetch(process.env.REACT_APP_GOVIL_CARS_API + company.hebrew)
  // .then((response) => response.json())
  // .then((data) =>
  //   setDataFromApi(
  //     data.result.records.filter((car) => car.shnat_yitzur >= 2020)
  //   )
  // );

