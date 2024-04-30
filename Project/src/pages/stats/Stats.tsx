import { MainStatsBlock } from "./MainStatsBlock/MainStatsBlock";
import { StatCards } from "./StatCards/StatCards";
import { TimePeriodMenu } from "./TimePeriodMenu/TimePeriodMenu";
import "./stats.css";

export function Stats() {
  return (
    <main className="stats">
      <div className="stats__top">
        <h3 className="stats__title">Ваша активность</h3>
        <TimePeriodMenu />
      </div>
      <MainStatsBlock />
      <StatCards />
    </main>
  );
}
