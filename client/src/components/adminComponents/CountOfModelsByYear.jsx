import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function CountOfModelsByYear({ data }) {

    return (
      <div style={{}}>
        <h4 className="text-center">cars per year</h4>
        <Bar
          data={data}
          options={{
            maintanAspectRatio: false,
            plugins: {},
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    );
}