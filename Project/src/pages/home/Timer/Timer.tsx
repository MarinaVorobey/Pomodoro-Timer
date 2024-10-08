import { useSelector } from "react-redux";
import { TimeBlock } from "./TimeBlock/TimeBlock";
import { TimerControls } from "./TimerControls/TimerControls";
import { RootState, TCurrentTask } from "../../../store/rootReducer";
import "./timer.css";

export function Timer() {
  const currTask: TCurrentTask | null = useSelector(
    (state: RootState) => state.currTask
  );
  const totalTomatoes: number = useSelector((state: RootState) =>
    state.stats[state.currDay] ? state.stats[state.currDay].tomatoes : 0
  );

  return (
    <div className="timer">
      <div
        className={`timer__head ${
          !currTask || currTask.isStopped
            ? "timer__head--stopped"
            : currTask.mode === "work"
            ? "timer__head--work"
            : "timer__head--break"
        }`}
      >
        <h4 className="timer__name">
          {currTask ? currTask.name : "У вас пока нет задач"}
        </h4>
        <span className="timer_num">
          {!currTask
            ? ""
            : currTask.mode !== "break"
            ? `Помидор ${currTask.tomatoesPassed + 1}`
            : `Перерыв ${totalTomatoes}`}
        </span>
      </div>
      <div className="timer__body">
        <TimeBlock taskData={currTask} />
        {currTask ? (
          <p className="timer__task">
            <span className="timer__task-num">{`Задача ${currTask.taskNum} - `}</span>
            <span className="timer__task-name">{currTask.name}</span>
          </p>
        ) : null}
        <TimerControls taskData={currTask} />
      </div>
    </div>
  );
}
