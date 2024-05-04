import { Icon } from "../../Icon/Icon";

export function SettingsLink() {
  return (
    <a href="/settings" className="settings-link header__stats-link">
      <Icon type="gear" className="settings-link__icon" />
      Настройки
    </a>
  );
}
