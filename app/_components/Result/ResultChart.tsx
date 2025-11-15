import { ResultsModel } from "@/models/stats.model";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
export const TypeAreaChart = ({
  results,
}: {
  results: ResultsModel[];
}) => {
  console.log(results);
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time (seconds)",
        },
      },
      yLeft: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Word Per Minutes",
        },
      },

      // RIGHT Y axis
      yRight: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // prevents double-grid overlap
        },
        title: {
          display: true,
          text: "Errors",
        },
      },
    },
  };

  const labels = Array.from({ length: results.length }).map(
    (_, i) => i + 1 + ""
  );

  const dataaa: ChartData<"line", (number | null)[], string> = {
    labels,
    datasets: [
      {
        showLine: false,
        label: "Errors",
        data: results.map((item) => item.errors),
        borderColor: "#ca4754",
        backgroundColor: "#ca4754",
        yAxisID: "yRight",
        pointStyle: "cross",
        pointRadius: 3, // size of the cross (optional)
        pointBorderWidth: 2, // thickness (optional)
        pointRotation: 45,
      },
      {
        label: "wpm",
        data: results.map((item) => item.totalWpm),
        borderColor: "#e2b714",
        yAxisID: "yLeft",
        backgroundColor: "#e2b714",
        tension: 0.4,
      },
      {
        label: "raw",
        data: results.map((item) => item.totalRaw),
        borderColor: "#646669",
        fill: true,
        backgroundColor: "#2c2e31",

        yAxisID: "yLeft",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="h-52 w-full">
      <Line options={options} data={dataaa} className="!w-full" />
    </div>
  );
};
