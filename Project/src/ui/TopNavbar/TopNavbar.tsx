import { MainLink } from "./MainLink/MainLink";
import { StatsLink } from "./StatsLink/StatsLink";

export function TopNavbar() {
  return (
    <header className="header">
      <nav className="header__nav">
        <MainLink />
        <StatsLink />
      </nav>
    </header>
  );
}
