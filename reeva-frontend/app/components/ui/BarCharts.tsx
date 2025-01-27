"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the chart props interface
interface BarChartProps {
  labels: string[];
  dataValues: number[];
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  dataValues,
  title = "Tasks per project",
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tasks per project",
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="flex justify-center w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
