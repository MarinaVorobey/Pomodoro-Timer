import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button";

const NOOP = () => {};

type TTimerControlProps = {
  taskData: TCurrentTask | null;
};

export function TimerControls({ taskData }: TTimerControlProps) {
  return (
    <div className="timer__controls">
      <Button
        action={NOOP}
        className="timer__btn timer__start"
        text="Старт"
        disabled={!taskData}
      />
      <Button
        action={NOOP}
        className="timer__btn timer__stop"
        text="Стоп"
        disabled={!taskData}
      />
    </div>
  );
}
