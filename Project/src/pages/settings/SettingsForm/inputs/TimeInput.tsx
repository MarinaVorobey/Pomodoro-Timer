import { useForm } from "react-hook-form";
import { TFormInput } from "../SettingsForm";

type TTimeInputProps = {
  type: "tomato" | "break" | "longBreak";
  label: string;
};

export function TimeInput({ type, label }: TTimeInputProps) {
  const { register } = useForm<TFormInput>();

  return (
    <div className="settings__input-group">
      <span className="settings__time-input-label">{label}</span>
      <div className="settings__time-input-block">
        <input
          className="settings__time-input"
          {...register(`${type}TimeMinutes`, {
            required: true,
            max: 99,
            min: 1,
          })}
        />
        <span className="settings__time-label">минут</span>
      </div>
      <div className="settings__time-input-block">
        <input
          className="settings__time-input"
          {...register(`${type}TimeSeconds`, {
            required: true,
            max: 99,
            min: 1,
          })}
        />
        <span className="settings__time-label">секунд</span>
      </div>
    </div>
  );
}
