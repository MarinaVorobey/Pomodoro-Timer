import { useSelector } from "react-redux";
import { TimeBlock } from "./TimeBlock/TimeBlock";
import { TimerControls } from "./TimerControls/TimerControls";
import "./timer.css";
import { RootState } from "../../../store/rootReducer";

export function Timer() {
  const currTask = useSelector((state: RootState) => state.currTask);
  const totalTomatoes = useSelector((state: RootState) => state.totalTomatoes);

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
            <span className="timer__task-num">{`Задача ${currTask.id} - `}</span>
            <span className="timer__task-name">{currTask.name}</span>
          </p>
        ) : null}
        <TimerControls taskData={currTask} />
      </div>
    </div>
  );
}
