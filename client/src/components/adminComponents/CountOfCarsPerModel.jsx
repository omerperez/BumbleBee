import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function CountOfCarsPerModel({ modelsByYear }) {
    console.log(modelsByYear);
    return (
      <Bar
        data={modelsByYear}
        options={{
          maintanAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "cars per year",
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