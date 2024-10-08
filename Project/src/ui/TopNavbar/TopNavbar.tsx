import { useDispatch, useSelector } from "react-redux";
import { useLoadTheme } from "../../hooks/useLoadTheme";
import { Icon } from "../Icon/Icon";
import { Switch } from "../Switch/Switch";
import { MainLink } from "./MainLink/MainLink";
import { SettingsLink } from "./SettingsLink/SettingsLink";
import { StatsLink } from "./StatsLink/StatsLink";
import { RootState } from "../../store/rootReducer";
import { switchTheme } from "../../store/actions/globalActions";

export function TopNavbar() {
  const dispatch = useDispatch();
  useLoadTheme();

  const currTheme = useSelector((state: RootState) => state.theme);
  const sunIcon = <Icon type="sun" className="switch-icon" />;
  const moonIcon = <Icon type="moon" className="switch-icon" />;

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
