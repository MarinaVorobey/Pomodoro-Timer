import { Button } from "../../../../ui/Button";

const NOOP = () => {};

export function TimeBlock() {
  return (
    <div className="timer__time-block">
      <p className="timer__time">25:00</p>
      <Button
        action={NOOP}
        className="timer__add"
        iconName="plus"
        iconClass="timer__add-icon"
      />
    </div>
  );
}
