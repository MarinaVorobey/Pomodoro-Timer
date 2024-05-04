import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  ChartData,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colorsDark, colorsLight } from "../../../../globalConstants";
import { formatTimeTasks } from "../../../../util/format/formatTimeTasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { getWeekStart } from "../../../../util/getWeekStart";
import { RefObject, useRef } from "react";
import { changeTargetDate } from "../../../../store/actions";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const TOMATO_TIME = 150000;

type TChartProps = {
  weekShift: 0 | 1 | 2;
  targetDate: string;
};

export function Chart({ weekShift, targetDate }: TChartProps) {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme);
  const stats = useSelector((state: RootState) => state.stats);
  const currDate = useSelector((state: RootState) => state.currDay);

  const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const dates: Array<string> = [];
  const weekData: Array<number> = [];
  const colors: Array<string> = [];

  let targetIndex = 0;
  const date = new Date(currDate);
  const weekStart = getWeekStart(date, date.getDay(), weekShift);

  for (let i = 0; i < 7; i++) {
    const currDate = new Date(weekStart.getTime() + 86400000 * i);
    const dayFormatted = `${currDate.getFullYear()}-${
      currDate.getMonth() + 1 > 9
        ? currDate.getMonth() + 1
        : "0" + (currDate.getMonth() + 1).toString()
    }-${
      currDate.getDate() > 9 ? currDate.getDate() : "0" + currDate.getDate()
    }`;
    dates.push(dayFormatted);

    if (dayFormatted === targetDate) {
      targetIndex = i;
    }

    if (dayFormatted in stats && stats[dayFormatted].totalWorkTime > 0) {
      weekData.push(stats[dayFormatted].totalWorkTime);
      colors.push(
        dayFormatted === targetDate ? colorsLight.red : colorsLight.lightRed
      );
    } else {
      weekData.push(0);
      colors.push(colorsLight.greyC4);
    }
  }

  const chartRef: RefObject<ChartJS<"bar"> | null> = useRef(null);
  function handleBarClick(_: ChartEvent, element: ActiveElement[]) {
    if (element.length > 0) {
      const i = element[0].index;
      dispatch(changeTargetDate(dates[i]));
    }
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    onClick: handleBarClick,
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
          color: function (context) {
            const index = context.index;
            return index === targetIndex ? colorsLight.red : colorsLight.greyC4;
          },
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

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Timer statistics",
        data: weekData,
        minBarLength: 5,
        backgroundColor: colors,
        hoverBackgroundColor: colorsLight.red,
      },
    ],
  };

  return <Bar ref={chartRef} options={options} data={data} />;
}
