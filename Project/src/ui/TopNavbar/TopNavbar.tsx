import { MainLink } from "./MainLink";
import { StatsLink } from "./StatsLink";

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
