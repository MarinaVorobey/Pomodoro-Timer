import { useDispatch } from "react-redux";
import { FormatTimeTimer } from "../../../../util/FormatTimeTimer";
import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button";
import { addTime } from "../../../../store/actions";
import { useTimer } from "../../../../hooks/useTimer";

type TTimeBlockProps = {
  taskData: TCurrentTask | null;
};

export function TimeBlock({ taskData }: TTimeBlockProps) {
  const dispatch = useDispatch();
  const time: number = taskData ? taskData.time : 0;
  const working = taskData ? !taskData.isPaused && !taskData.isStopped : false;
  const timer = useTimer(time, working);
  const formattedTime = FormatTimeTimer(timer);

  return (
    <div className="timer__time-block">
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
