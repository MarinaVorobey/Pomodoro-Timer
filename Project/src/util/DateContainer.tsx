import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { useEffect } from "react";
import { updateCurrDate } from "../store/actions";
import { getWeekStart } from "./getWeekStart";

type TDateContainer = {
  children: React.ReactNode;
};

export function DateContainer({ children }: TDateContainer) {
  const dispatch = useDispatch();
  const dates = useSelector((state: RootState) => state.stats);

  const todayFormatted = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : "0" + (new Date().getMonth() + 1).toString()
  }-${
    new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate()
  }`;

  useEffect(() => {
    const today = new Date();
    const weekDay = today.getDay();
    const cleaned: Array<keyof typeof dates> = [];

    if (!Object.keys(dates).includes(todayFormatted)) {
      const twoWeeksAgo = getWeekStart(today, weekDay, 2);

      const dateKeys: Array<keyof typeof dates> = Object.keys(dates);
      for (const key of dateKeys) {
        const date = new Date(key);
        if (date < twoWeeksAgo) {
          cleaned.push(key);
        }
      }
    }

    dispatch(updateCurrDate(todayFormatted, weekDay, cleaned));
  }, []);

  return <>{children}</>;
}
