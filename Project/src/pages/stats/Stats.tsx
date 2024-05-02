import { useSelector } from "react-redux";
import { MainStatsBlock } from "./MainStatsBlock/MainStatsBlock";
import { StatCards } from "./StatCards/StatCards";
import { TimePeriodMenu } from "./TimePeriodMenu/TimePeriodMenu";
import "./stats.css";
import { RootState, TDailyStats } from "../../store/rootReducer";

export function Stats() {
  const targetDate = useSelector(
    (state: RootState) => state.statsControls.targetDate
  );
  let statsInfo: TDailyStats | null = useSelector(
    (state: RootState) => state.stats[targetDate]
  );
  if (statsInfo.workTime === 0) {
    statsInfo = null;
  }

  return (
    <main className="stats">
      <div className="stats__top">
        <h3 className="stats__title">Ваша активность</h3>
        <TimePeriodMenu />
      </div>
      <MainStatsBlock statsInfo={statsInfo} targetDate={targetDate} />
      <StatCards statsInfo={statsInfo} />
    </main>
  );
}
