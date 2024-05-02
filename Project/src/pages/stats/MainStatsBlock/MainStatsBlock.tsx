import { TDailyStats } from "../../../store/rootReducer";
import { formatTimeStatsMain } from "../../../util/format/formatTimeStatsMain";
import { Chart } from "./Chart/Chart";
import "./mainStatsBlock.css";

type TMainStatsBlockProps = {
  statsInfo: TDailyStats | null;
  targetDate: string;
};

const numsToWeekdays = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  0: "Воскресенье",
};

export function MainStatsBlock({
  statsInfo,
  targetDate,
}: TMainStatsBlockProps) {
  return (
    <div className="stats__main-block">
      <div className="stats__left">
        <div className="stats__curr-day curr-day">
          <h4 className="curr-day__title">
            {statsInfo
              ? numsToWeekdays[statsInfo.weekDay as keyof typeof numsToWeekdays]
              : numsToWeekdays[
                  new Date(targetDate).getDay() as keyof typeof numsToWeekdays
                ]}
          </h4>
          <p className="curr-day__paragraph">
            {statsInfo ? (
              <>
                Вы&nbsp;работали над задачами в&nbsp;течение
                <span className="curr-day__time">
                  {" " + formatTimeStatsMain(statsInfo.workTime)}
                </span>
              </>
            ) : (
              "Нет данных"
            )}
          </p>
        </div>

        <div className="stats__curr-tomatoes curr-tomatoes">
          <div
            className={`curr-tomatoes__image-block${
              !statsInfo ? " curr-tomatoes__image--no-data" : ""
            }`}
          >
            {statsInfo ? (
              <>
                <img
                  className="curr-tomatoes__img"
                  src="/img/tomato1.png"
                ></img>
                <span className="curr-tomatoes__count1">
                  х&nbsp;{statsInfo.tomatoes}
                </span>
              </>
            ) : (
              <img className="curr-tomatoes__img" src="/img/tomato2.png"></img>
            )}
          </div>
          {statsInfo ? (
            <p className="curr-tomatoes__count2">
              {statsInfo.tomatoes} помидор
              {statsInfo.tomatoes === 1
                ? ""
                : statsInfo.tomatoes === 2 ||
                  statsInfo.tomatoes === 3 ||
                  statsInfo.tomatoes === 4
                ? "а"
                : "ов"}
            </p>
          ) : null}
        </div>
      </div>
      <div className="stats__right">
        <Chart />
      </div>
    </div>
  );
}
