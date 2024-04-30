import { Switch } from "../Switch/Switch";
import { MainLink } from "./MainLink/MainLink";
import { StatsLink } from "./StatsLink/StatsLink";

export function TopNavbar() {
  return (
    <header className="header">
      <nav className="header__nav">
        <MainLink />
        <div className="header__right-controls">
          <Switch />
          <StatsLink />
        </div>
      </nav>
    </header>
  );
}
