import { Button } from "../../../../../ui/Button";

type TTaskItemProps = {
  order: number | string;
  name: string;
};

const NOOP = () => {};

export function TaskItem({ order, name }: TTaskItemProps) {
  return (
    <>
      <div className="task__text-block">
        <span className="task__order">{order}</span>
        <span className="task__name">{name}</span>
      </div>
      <Button action={NOOP} className="task__options" iconName="dots" />
    </>
  );
}
