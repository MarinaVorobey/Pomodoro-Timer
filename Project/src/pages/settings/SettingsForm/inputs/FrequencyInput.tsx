import { useForm } from "react-hook-form";
import { TFormInput } from "../SettingsForm";

export function FrequencyInput() {
  const { register } = useForm<TFormInput>();

  return (
    <div className="settings__input-group">
      <span className="settings__time-input-label">
        Частота длинных перерывов: каждые{" "}
      </span>
      <input
        {...register("longBreakFrequency", {
          required: true,
          max: 10,
          min: 1,
        })}
      ></input>
      <span className="settings__time-input-label">помидора</span>
    </div>
  );
}
