"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EntityTimeline({
  allEntities,
  title,
}: {
  allEntities: any[];
  title: string;
}) {
  const entityData = allEntities.map((entity) => {
    const date = entity.created_at;
    const day = new Date(date).getDate();
    return day;
  });
  const minDay = Math.min(...entityData);
  const maxDay = Math.max(...entityData);
  const allDays = [];
  for (let day = minDay; day <= maxDay; day++) {
    allDays.push(day);
  }
  const data = {
    labels: allDays,
    datasets: [
      {
        label: title,
        data: entityData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-1/2 m-8">
      <Line data={data} options={options} />
    </div>
  );
}
