var _ = require('lodash');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


axios
  .get(process.env.GOVIL_CARS_API)
  .then(response => {
    console.time('one');

    console.log(response.data.result.records.length);
    cars = response.data.result.records.filter((car) => car.shnat_yitzur == 2021);

    console.log(_.countBy(cars,'tozeret_nm'));

    console.timeEnd('one');
  })
  .catch(error => {
    console.log(error);
  });