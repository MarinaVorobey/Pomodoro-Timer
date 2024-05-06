import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  completeTimer,
  pauseCount,
  timerCount,
} from "../store/actions/timerActions";

export function useTimer(time: number, stopped: boolean, paused: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (stopped) {
      return;
    }
    if (time <= 0) {
      dispatch(completeTimer());
      return;
    }

    const interval = setInterval(() => {
      if (paused) {
        dispatch(pauseCount());
      } else {
        dispatch(timerCount());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, dispatch, stopped, paused]);
}
