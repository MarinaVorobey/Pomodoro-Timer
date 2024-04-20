import { Icon } from "../Icon/Icon";

export function StatsLink() {
  return (
    <a href="#" className="stats-link header__stats-link">
      <Icon type="stats" className="stats-link__icon" />
      Статистика
    </a>
  );
}
