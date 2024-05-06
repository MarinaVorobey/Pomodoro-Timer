import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { formatSplitTime } from "../../../util/format/formatSplitTime";
import { TimeInput } from "./inputs/TimeInput";
import { FrequencyInput } from "./inputs/FrequencyInput";
import { Switch } from "../../../ui/Switch/Switch";
import { changeSettings } from "../../../store/actions";
import { formatJoinTime } from "../../../util/format/formatJoinTime";
import { SettingsControls } from "./SettingsControls/SettingsControls";
import { useState } from "react";

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

  const methods = useForm<TFormInput>({
    mode: "onBlur",
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
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    dispatch(
      changeSettings({
        tomatoTime: formatJoinTime(
          +data.tomatoTimeMinutes,
          +data.tomatoTimeSeconds
        ),
        breakTime: formatJoinTime(
          +data.breakTimeMinutes,
          +data.breakTimeSeconds
        ),
        longBreakTime: formatJoinTime(
          +data.longBreakTimeMinutes,
          +data.longBreakTimeSeconds
        ),
        longBreakFrequency: +data.longBreakFrequency,
        notify: data.notifications,
      })
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="form settings__form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <TimeInput type="tomato" label="Время помидора: " />
        <TimeInput type="break" label="Время короткого перерыва: " />
        <TimeInput type="longBreak" label="Время длинного перерыва: " />
        <FrequencyInput />

        <div className="settings__input-group">
          <span className="settings__time-input-label">Уведомления:</span>
          <Switch
            mode="notify"
            checked={methods.watch("notifications")}
            onChange={() => {
              methods.setValue(
                "notifications",
                !methods.getValues("notifications")
              );
            }}
            leftNode="OFF"
            rightNode="ON"
            register={methods.register("notifications")}
          />
        </div>
        <SettingsControls submitted={submitted} />
      </form>
    </FormProvider>
  );
}
