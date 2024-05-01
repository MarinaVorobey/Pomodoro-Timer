import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colorsLight } from "../../../../globalConstants";
import { formatTimeTasks } from "../../../../util/formatTimeTasks";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const TOMATO_TIME = 150000;

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      left: 50,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: colorsLight.grey99,
        font: {
          family: "SFUIDisplay",
          size: 24,
          weight: 400,
        },
      },
    },
    y: {
      border: {
        display: false,
      },
      position: "right",
      grid: {
        color: colorsLight.greyE4,
      },
      suggestedMax: TOMATO_TIME * 5,
      ticks: {
        padding: 32,
        count: 5,
        stepSize: TOMATO_TIME,
        color: colorsLight.black,
        callback: function (val, index) {
          return val !== 0 && typeof val == "number"
            ? formatTimeTasks(TOMATO_TIME * index)
            : "";
        },
        font: {
          family: "SFUIDisplay",
          size: 12,
          weight: 400,
        },
      },
    },
  },
};

const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const dataMock = [
  TOMATO_TIME,
  TOMATO_TIME - 1000,
  TOMATO_TIME * 5,
  TOMATO_TIME * 3,
  TOMATO_TIME * 9,
  TOMATO_TIME,
  0,
];

const data: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dataMock,
      minBarLength: 5,
      backgroundColor: colorsLight.lightRed,
      hoverBackgroundColor: colorsLight.red,
    },
  ],
};

export function Chart() {
  return <Bar options={options} data={data} />;
}
