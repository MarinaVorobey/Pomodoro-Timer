import { Icon, TIconNames } from "../../../../ui/Icon/Icon";

type TStatCardProps = {
  title: string;
  iconType: TIconNames;
  text: string;
  hasInfo: boolean;
};

export function StatCard({ title, iconType, text, hasInfo }: TStatCardProps) {
  return (
    <div
      className={`stats-card ${iconType}${
        hasInfo ? " stats-card--default" : ""
      }`}
    >
      <div className="stats-card__text-block">
        <h5 className="stats-card__title">{title}</h5>
        <p className="stats-card__text">{text}</p>
      </div>
      <Icon
        type={iconType}
        className={
          hasInfo ? "stats-card__icon--default" : `stats-card__icon ${iconType}`
        }
      />
    </div>
  );
}
