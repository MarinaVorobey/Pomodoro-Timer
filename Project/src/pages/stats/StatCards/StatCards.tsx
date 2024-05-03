import { TDailyStats } from "../../../store/rootReducer";
import { GenericList, TGenericItem } from "../../../util/GenericList";
import { formatTimePauseCard } from "../../../util/format/formatTimePauseCard";
import { StatCard } from "./StatCard/StatCard";
import "./statCards.css";

const NOOP = () => {};

type TStatCardsProps = {
  statsInfo: TDailyStats | null;
};

export function StatCards({ statsInfo }: TStatCardsProps) {
  const cards: TGenericItem[] = [
    {
      onClick: NOOP,
      element: (
        <StatCard
          title="Фокус"
          iconType="focus"
          text={
            !statsInfo || statsInfo.workTime === 0
              ? "0%"
              : `${Math.floor(
                  (statsInfo.tomatoesCompletedTime / statsInfo.workTime) * 100
                )}%`
          }
          hasInfo={statsInfo !== null}
        />
      ),
      className: "cards__item",
      id: "1",
      As: "li",
    },
    {
      onClick: NOOP,
      element: (
        <StatCard
          title="Время на паузе"
          iconType="alarm-clock"
          text={
            !statsInfo || statsInfo.pausedTime === 0
              ? "0м"
              : formatTimePauseCard(statsInfo.pausedTime)
          }
          hasInfo={statsInfo !== null}
        />
      ),
      className: "cards__item",
      id: "2",
      As: "li",
    },
    {
      onClick: NOOP,
      element: (
        <StatCard
          title="Остановки"
          iconType="cancel"
          text={!statsInfo ? "0" : statsInfo.cancelled.toString()}
          hasInfo={statsInfo !== null}
        />
      ),
      className: "cards__item",
      id: "3",
      As: "li",
    },
  ];

  return (
    <ul className="stats__cards list-reset">
      <GenericList list={cards} />
    </ul>
  );
}
