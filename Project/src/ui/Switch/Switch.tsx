import { Icon } from "../Icon/Icon";

export function Switch() {
  return (
    <div className="switch-block">
      <Icon type="sun" className="switch-icon" />
      <input type="checkbox" id="switch" className="switch" />
      <label htmlFor="switch" className="toggle"></label>
      <Icon type="moon" className="switch-icon" />
    </div>
  );
}
