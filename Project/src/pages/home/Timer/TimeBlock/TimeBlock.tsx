import { useDispatch } from "react-redux";
import { formatTimeTimer } from "../../../../util/format/formatTimeTimer";
import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button/Button";
import { addTime } from "../../../../store/actions";
import { calculateCircleDasharray } from "../../../../util/calculateCircleDasharray";

type TTimeBlockProps = {
  taskData: TCurrentTask | null;
};

export function TimeBlock({ taskData }: TTimeBlockProps) {
  const dispatch = useDispatch();

  const time = taskData ? taskData.time : 0;
  const passedTime = taskData ? taskData.passed : 0;
  const circle = calculateCircleDasharray(time, passedTime);
  const formattedTime = formatTimeTimer(time);

  return (
    <div className="timer__time-block">
      <svg
        className="timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="timer__circle">
          <circle
            className="timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            className={`timer__path-remaining timer__path-remaining--${
              !taskData || taskData.isStopped
                ? "stopped"
                : taskData.mode === "work"
                ? "work"
                : "break"
            }`}
            strokeDasharray={circle}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <p
        className={`timer__time ${
          !taskData || taskData.isPaused || taskData.isStopped
            ? "timer__time--stopped"
            : taskData.mode === "work"
            ? "timer__time--work"
            : "timer__time--break"
        }`}
      >
        {formattedTime}
      </p>
      <Button
        action={() => dispatch(addTime())}
        className="timer__add"
        iconName="plus"
        iconClass="timer__add-icon"
        disabled={!taskData}
      />
    </div>
  );
}
