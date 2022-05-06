import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function CarsPerYearAndModel({ data }) {
    if (data.labels && data.labels.length === 0) {
      return "No Data Availble";
    }
  return (
    <Bar
      data={data}
      options={{
        maintanAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "cars per year and model",
            fontSize: 40,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
    />
  );
}
