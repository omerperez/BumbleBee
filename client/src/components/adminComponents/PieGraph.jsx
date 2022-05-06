import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieGraph({ data, title, mobileWidth }) {
  return (
    <div className={mobileWidth ? "m-auto" : "m-auto mw-450"}>
      <h4 className="text-center">{title}</h4>
      <Pie
        data={data}
        options={{
          maintanAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  var sum = 0;
                  for (const data of context.dataset.data) {
                    sum = sum + data;
                  }
                  const pers = Math.floor((context.parsed * 100) / sum);
                  return context.label + ": " + pers + "%";
                },
                afterLabel: (context) => {
                  return "Number: " + context.parsed;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}