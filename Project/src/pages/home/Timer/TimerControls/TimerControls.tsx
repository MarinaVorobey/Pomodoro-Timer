import { useDispatch } from "react-redux";
import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button";
import { pauseTimer, startTimer } from "../../../../store/actions";

type TTimerControlProps = {
  taskData: TCurrentTask | null;
};

export function TimerControls({ taskData }: TTimerControlProps) {
  const dispatch = useDispatch();

  return (
    <div className="timer__controls">
      <Button
        action={() => {
          dispatch(startTimer());
        }}
        className="timer__btn timer__start"
        text="Старт"
        disabled={!taskData}
      />
      <Button
        action={() => {
          dispatch(pauseTimer());
        }}
        className="timer__btn timer__stop"
        text="Стоп"
        disabled={!taskData}
      />
    </div>
  );
}
