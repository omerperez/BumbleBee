const yearsForSelect = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
];

function getCountByYears(dataByYears) {
  return {
    labels: Object.keys(dataByYears),
    datasets: [
      {
        label: "Cars Per Year",
        data: Object.values(dataByYears),
        backgroundColor: bgColor,
        borderColor: brColor,
        borderWidth: 1,
      },
    ],
  };
}

function getModelByYears(dataOfModels) {
  return {
    labels: Object.keys(dataOfModels),
    datasets: [
      {
        label: "Cars Per Model",
        data: Object.values(dataOfModels),
        backgroundColor: bgColor,
        borderColor: brColor,
        borderWidth: 1,
      },
    ],
  };
}

function getSpecificModel(dataOfSpecificModel) {
  return {
    labels: Object.keys(dataOfSpecificModel),
    datasets: [
      {
        label: "Cars Per Year & Model",
        data: Object.values(dataOfSpecificModel),
        backgroundColor: bgColor,
        borderColor: brColor,
        borderWidth: 1,
      },
    ],
  };
}

function getCategoriesOfUser(dataOfCategoriesOfUser){
  return{
    labels: Object.keys(dataOfCategoriesOfUser),
    datasets: [
      {
        label: 'Categories Per User',
        data: Object.values(dataOfCategoriesOfUser),
        backgroundColor:bgColor,
        borderColor: brColor,
        hoverOffset: 4
      },
    ],
  };
 }

 function getCategoriesPerUser(dataOfCategoriesPerUser){
  return{
    labels: Object.keys(dataOfCategoriesPerUser),
    datasets: [
      {
        label: 'Categories Per User',
        data: Object.values(dataOfCategoriesPerUser),
        backgroundColor:bgColor,
        borderColor: brColor,
        hoverOffset: 4
      },
    ],
  };
 }

export {
   getCountByYears,
   getModelByYears,
   getSpecificModel,
   getCategoriesOfUser,
   getCategoriesPerUser,
   yearsForSelect };

var bgColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

var brColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];
