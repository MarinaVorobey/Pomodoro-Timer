import { useFormContext } from "react-hook-form";
import { Button } from "../../../../ui/Button/Button";

type TSettingsControlsProps = {
  submitted: boolean;
};

export function SettingsControls({ submitted }: TSettingsControlsProps) {
  const methods = useFormContext();
  const { errors, isValid } = methods.formState;

  return (
    <div className="settings__form-controls">
      <Button
        action={() => {}}
        className="settings__submit"
        type="submit"
        text="Сохранить"
      />
      <p className="settings__error">
        {Object.values(errors)[0] && `${Object.values(errors)[0]?.message}`}
      </p>
      <p className="settings__form-submitted">
        {isValid && submitted && "Сохранено"}
      </p>
    </div>
  );
}
