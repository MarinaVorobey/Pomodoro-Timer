import { useDispatch } from "react-redux";
import { useFormatTimeTimer } from "../../../../hooks/useFormatTimeTimer";
import { TCurrentTask } from "../../../../store/rootReducer";
import { Button } from "../../../../ui/Button";
import { addTime } from "../../../../store/actions";

type TTimeBlockProps = {
  taskData: TCurrentTask | null;
};

export function TimeBlock({ taskData }: TTimeBlockProps) {
  const dispatch = useDispatch();
  const time: number = taskData ? taskData.time : 0;
  const formattedTime = useFormatTimeTimer(time);

  return (
    <div className="timer__time-block">
      <p className="timer__time">{formattedTime}</p>
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
