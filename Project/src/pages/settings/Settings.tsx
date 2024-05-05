import { SettingsForm } from "./SettingsForm/SettingsForm";
import "./settings.css";

export function Settings() {
  return (
    <main className="settings">
      <h3 className="settings__title">Настройки</h3>
      <SettingsForm />
    </main>
  );
}
