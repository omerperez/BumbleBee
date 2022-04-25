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


  // axios
  // .get(process.env.GOVIL_CARS_API)
  // .then(response => {
  //   console.time('two');

  //   cars = response.data.result.records.filter((car) => car.shnat_yitzur >= 2020);
  //   console.log(_.countBy(cars,'shnat_yitzur'));

  //   console.timeEnd('two');
  // })
  // .catch(error => {
  //   console.log(error);
  // });



  // axios
  // .get(process.env.GOVIL_CARS_API)
  // .then(response => {
  //   console.time('three');

  //   cars = response.data.result.records.filter((car) => car.shnat_yitzur >= 2020&&car.tozeret_nm=='לנד רובר');
  //   console.log(_.countBy(cars,'degem_nm'));

  //   console.timeEnd('three');
  // })
  // .catch(error => {
  //   console.log(error);
  // });




