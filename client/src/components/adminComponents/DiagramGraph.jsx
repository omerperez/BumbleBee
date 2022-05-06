import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function DiagramGraph({ data, title }) {
  return (
    <div className="m-auto">
      <h4 className="text-center">{title}</h4>
      <Bar data={data} />
    </div>
  );
}