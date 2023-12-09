import Chart from "chart.js/auto";
import React, { useEffect } from "react";

interface PieChartProps {
  data: number[];
  labels: string[];
  title: string;
  colors: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels, title, colors }) => {
  useEffect(() => {
    const ctx = document.getElementById(
      `pieChart-${title.replace(/\s/g, "")}`
    ) as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      },
    });
    return () => {
      myPieChart.destroy();
    };
  }, [data, labels, title, colors]);
  return <canvas id={`pieChart-${title.replace(/\s/g, "")}`} />;
};

export default PieChart;
