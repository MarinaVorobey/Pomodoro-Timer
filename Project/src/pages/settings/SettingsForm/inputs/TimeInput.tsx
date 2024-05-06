import { useFormContext } from "react-hook-form";

type TTimeInputProps = {
  type: "tomato" | "break" | "longBreak";
  label: string;
};

export function TimeInput({ type, label }: TTimeInputProps) {
  const { register } = useFormContext();

  return (
    <div className="settings__input-group">
      <span className="settings__time-input-label">{label}</span>
      <div className="settings__time-input-block">
        <input
          className="settings__time-input"
          {...register(`${type}TimeMinutes`, {
            required: { value: true, message: "Заполните все поля" },
            pattern: {
              value: /^\d+$/,
              message: "Заполните время с помощью цифр",
            },
            max: {
              value: 99,
              message: "Максимальное число минут - 99",
            },
            min: { value: 1, message: "Минимальное число минут - 1" },
          })}
        />
        <span className="settings__time-label">минут</span>
      </div>
      <div className="settings__time-input-block">
        <input
          className="settings__time-input"
          {...register(`${type}TimeSeconds`, {
            required: { value: true, message: "Заполните все поля" },
            pattern: {
              value: /^\d+$/,
              message: "Заполните время с помощью цифр",
            },
            max: {
              value: 99,
              message: "Максимальное число секунд - 59",
            },
            min: { value: 0, message: "Минимальное число секунд - 0" },
          })}
        />
        <span className="settings__time-label">секунд</span>
      </div>
    </div>
  );
}
