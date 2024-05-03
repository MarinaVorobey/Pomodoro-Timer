import { useDispatch } from "react-redux";
import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button";
import {
  pauseTimer,
  skipBreak,
  skipTask,
  startTimer,
  stopTimer,
} from "../../../../store/actions";

type TTimerControlProps = {
  taskData: TCurrentTask | null;
};

export function TimerControls({ taskData }: TTimerControlProps) {
  const dispatch = useDispatch();

  const startTime = () => {
    dispatch(startTimer());
  };

  const pauseTime = () => {
    dispatch(pauseTimer());
  };

  const stopTime = () => {
    dispatch(stopTimer());
  };

  const skipBreakTime = () => {
    dispatch(skipBreak());
  };

  const skipTaskDispatch = () => {
    dispatch(skipTask());
  };

  return (
    <div className="timer__controls">
      <Button
        action={
          !taskData || taskData.isStopped || taskData.isPaused
            ? startTime
            : pauseTime
        }
        className="timer__btn timer__start"
        text={
          !taskData || taskData.isStopped
            ? "Старт"
            : taskData.isPaused
            ? "Продолжить"
            : "Пауза"
        }
        disabled={!taskData}
      />
      <Button
        action={
          taskData && taskData.isPaused && taskData.mode === "work"
            ? skipTaskDispatch
            : taskData?.mode == "work" && taskData?.isStopped
            ? () => {}
            : taskData?.mode == "work"
            ? stopTime
            : skipBreakTime
        }
        className="timer__btn timer__stop"
        text={
          taskData && taskData.isPaused && taskData.mode === "work"
            ? "Сделано"
            : taskData && taskData.mode === "break"
            ? "Пропустить"
            : "Стоп"
        }
        disabled={!taskData}
      />
    </div>
  );
}
