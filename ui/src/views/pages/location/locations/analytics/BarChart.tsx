import Chart from "chart.js/auto";
import React, { useEffect } from "react";

interface BarChartProps {
  data: number[];
  labels: string[];
  title: string;
  color: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, title, color }) => {
  useEffect(() => {
    const ctx = document.getElementById(
      `barChart-${title.replace(/\s/g, "")}`
    ) as HTMLCanvasElement;
    const myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: title,
            data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myBarChart.destroy();
    };
  }, [data, labels, title, color]);

  return <canvas id={`barChart-${title.replace(/\s/g, "")}`} />;
};

export default BarChart;
