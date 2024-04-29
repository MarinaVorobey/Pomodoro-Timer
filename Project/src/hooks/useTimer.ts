import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { completeTimer, timerCount } from "../store/actions";

export function useTimer(time: number, working: boolean) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!working) {
      return;
    }
    if (time <= 0) {
      dispatch(completeTimer());
      return;
    }

    const interval = setInterval(() => {
      dispatch(timerCount());
    }, 1000);

    return () => clearInterval(interval);
  }, [time, dispatch, working]);

  return time;
}
