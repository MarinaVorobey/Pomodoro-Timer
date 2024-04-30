import { GenericList, TGenericItem } from "../../../util/GenericList";
import { StatCard } from "./StatCard/StatCard";
import "./statCards.css";

const NOOP = () => {};

export function StatCards() {
  const cards: TGenericItem[] = [
    {
      onClick: NOOP,
      element: (
        <StatCard title="Фокус" iconType="focus" text="27%" hasInfo={false} />
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
          text="2ч 30м"
          hasInfo={false}
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
          text="14"
          hasInfo={false}
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
