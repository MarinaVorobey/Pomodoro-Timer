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
import { colorsDark, colorsLight } from "../../../../globalConstants";
import { formatTimeTasks } from "../../../../util/format/formatTimeTasks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { getWeekStart } from "../../../../util/getWeekStart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const TOMATO_TIME = 150000;
const MILLISECONDS_IN_A_DAY = 86400000;

type TChartProps = {
  weekShift: 0 | 1 | 2;
  targetDate: string;
};

export function Chart({ weekShift, targetDate }: TChartProps) {
  const theme = useSelector((state: RootState) => state.theme);
  const stats = useSelector((state: RootState) => state.stats);

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
          color:
            theme === "light" ? colorsLight.textColor : colorsDark.textColor,
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

  const weekData: Array<number | null> = [];
  const date = new Date(targetDate);
  const weekStart = getWeekStart(date, date.getDay(), weekShift);
  for (let i = 0; i < 7; i++) {
    const currDate = new Date(weekStart.getTime() + MILLISECONDS_IN_A_DAY * i);
    const dayFormatted = `${currDate.getFullYear()}-${
      currDate.getMonth() + 1 > 9
        ? currDate.getMonth() + 1
        : "0" + (currDate.getMonth() + 1).toString()
    }-${
      currDate.getDate() > 9 ? currDate.getDate() : "0" + currDate.getDate()
    }`;
    if (dayFormatted in stats) {
      weekData.push(stats[dayFormatted].totalWorkTime);
    } else {
      weekData.push(0);
    }
  }

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: weekData,
        minBarLength: 5,
        backgroundColor: colorsLight.lightRed,
        hoverBackgroundColor: colorsLight.red,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
