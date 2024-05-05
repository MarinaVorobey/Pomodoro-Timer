import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { formatSplitTime } from "../../../util/format/formatSplitTime";
import { TimeInput } from "./inputs/TimeInput";
import { FrequencyInput } from "./inputs/FrequencyInput";
import { Switch } from "../../../ui/Switch/Switch";

export type TFormInput = {
  tomatoTimeMinutes: number;
  tomatoTimeSeconds: number;

  breakTimeMinutes: number;
  breakTimeSeconds: number;

  longBreakTimeMinutes: number;
  longBreakTimeSeconds: number;

  longBreakFrequency: number;

  notifications: boolean;
};

export function SettingsForm() {
  const currSettings = useSelector((state: RootState) => state.globalControls);
  const splitTimeTomato = formatSplitTime(currSettings.tomatoTime);
  const splitTimeBreak = formatSplitTime(currSettings.breakTime);
  const splitTimeLongBreak = formatSplitTime(currSettings.longBreakTime);

  const { register, setValue, getValues, handleSubmit } = useForm<TFormInput>({
    defaultValues: {
      tomatoTimeMinutes: splitTimeTomato[0],
      tomatoTimeSeconds: splitTimeTomato[1],

      breakTimeMinutes: splitTimeBreak[0],
      breakTimeSeconds: splitTimeBreak[1],

      longBreakTimeMinutes: splitTimeLongBreak[0],
      longBreakTimeSeconds: splitTimeLongBreak[1],

      longBreakFrequency: currSettings.longBreakFrequency,

      notifications: currSettings.notify,
    },
  });
  const onSubmit: SubmitHandler<TFormInput> = (data) => console.log(data);

  return (
    <form className="form settings__form" onSubmit={handleSubmit(onSubmit)}>
      <TimeInput type="tomato" label="Время помидора: " />
      <TimeInput type="break" label="Время короткого перерыва: " />
      <TimeInput type="longBreak" label="Время длинного перерыва: " />
      <FrequencyInput />
      <Switch
        mode="notify"
        checked={currSettings.notify}
        onChange={() => {
          setValue("notifications", !getValues("notifications"));
        }}
        leftNode="OFF"
        rightNode="ON"
        register={register("notifications")}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
