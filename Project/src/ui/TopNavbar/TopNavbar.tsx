import { Icon } from "../Icon/Icon";
import { Switch } from "../Switch/Switch";
import { MainLink } from "./MainLink/MainLink";
import { SettingsLink } from "./SettingsLink/SettingsLink";
import { StatsLink } from "./StatsLink/StatsLink";

export function TopNavbar() {
  const sunIcon = <Icon type="sun" className="switch-icon" />;
  const moonIcon = <Icon type="moon" className="switch-icon" />;

  return (
    <header className="header">
      <nav className="header__nav">
        <MainLink />
        <div className="header__right-controls">
          <Switch leftNode={sunIcon} rightNode={moonIcon} />
          <SettingsLink />
          <StatsLink />
        </div>
      </nav>
    </header>
  );
}
