import { useSelector } from "react-redux";
import { RootState, TCurrentTask } from "../../store/rootReducer";
import { useTimer } from "../../hooks/useTimer";

type TTimerContainer = {
  children: React.ReactNode;
};

export function TimerContainer({ children }: TTimerContainer) {
  const taskData: TCurrentTask | null = useSelector(
    (state: RootState) => state.currTask
  );
  const stopped = !taskData || taskData.isStopped;
  const paused = taskData?.isPaused === true;
  const time = taskData ? taskData.time : 0;
  useTimer(time, stopped, paused);

  return <>{children}</>;
}
