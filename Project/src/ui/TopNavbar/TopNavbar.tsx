import { useDispatch, useSelector } from "react-redux";
import { useLoadTheme } from "../../hooks/useLoadTheme";
import { Icon } from "../Icon/Icon";
import { Switch } from "../Switch/Switch";
import { MainLink } from "./MainLink/MainLink";
import { SettingsLink } from "./SettingsLink/SettingsLink";
import { StatsLink } from "./StatsLink/StatsLink";
import { switchTheme } from "../../store/actions";
import { RootState } from "../../store/rootReducer";

export function TopNavbar() {
  const sunIcon = <Icon type="sun" className="switch-icon" />;
  const moonIcon = <Icon type="moon" className="switch-icon" />;
  const dispatch = useDispatch();
  useLoadTheme();
  const currTheme = useSelector((state: RootState) => state.theme);

  return (
    <header className="header">
      <nav className="header__nav">
        <MainLink />
        <div className="header__right-controls">
          <Switch
            mode="theme"
            checked={currTheme === "dark"}
            leftNode={sunIcon}
            rightNode={moonIcon}
            onChange={() => dispatch(switchTheme())}
          />
          <SettingsLink />
          <StatsLink />
        </div>
      </nav>
    </header>
  );
}
