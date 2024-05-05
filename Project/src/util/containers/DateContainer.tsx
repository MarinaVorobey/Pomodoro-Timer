import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useEffect } from "react";
import { updateCurrDate } from "../../store/actions";
import { getWeekStart } from "../getWeekStart";
import { formatDateToString } from "../format/formatDateToString";

type TDateContainer = {
  children: React.ReactNode;
};

export function DateContainer({ children }: TDateContainer) {
  const dispatch = useDispatch();
  const dates = useSelector((state: RootState) => state.stats);

  const today = new Date();
  const todayFormatted = formatDateToString(today);

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
