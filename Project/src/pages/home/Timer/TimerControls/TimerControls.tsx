import { Button } from "../../../../ui/Button";

const NOOP = () => {};

export function TimerControls() {
  return (
    <div className="timer__controls">
      <Button action={NOOP} className="timer__start" text="Старт" />
      <Button action={NOOP} className="timer__stop" text="Стоп" />
    </div>
  );
}
