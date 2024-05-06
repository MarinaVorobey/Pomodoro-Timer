import { useFormContext } from "react-hook-form";

export function FrequencyInput() {
  const { register } = useFormContext();

  return (
    <div className="settings__input-block">
      <div className="settings__input-group">
        <span className="settings__time-input-label">
          Частота длинных перерывов: через каждый
        </span>
        <input
          className="settings__time-input"
          {...register("longBreakFrequency", {
            required: { value: true, message: "Заполните все поля" },
            pattern: {
              value: /^\d+$/,
              message: "Заполните количество с помощью цифр",
            },
            max: {
              value: 10,
              message: "Максимальное количество помидоров - 10",
            },
            min: { value: 1, message: "Минимальное количество помидоров - 1" },
          })}
        ></input>
        <span className="settings__time-input-label">помидор</span>
      </div>
    </div>
  );
}
