import { TimeBlock } from "./TimeBlock/TimeBlock";
import { TimerControls } from "./TimerControls/TimerControls";
import "./timer.css";

export function Timer() {
  return (
    <div className="timer">
      <div className="timer__head">
        <h4 className="timer__name">Timer</h4>
        <span className="timer_num">Помидор 1</span>
      </div>
      <div className="timer__body">
        <TimeBlock />
        <p className="timer__task">
          <span className="timer__task-num">Задача 1 - </span>
          <span className="timer__task-name">Сверстать сайт</span>
        </p>
        <TimerControls />
      </div>
    </div>
  );
}
