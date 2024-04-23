import { GenericList, TGenericItem } from "../../../../util/GenericList";

type TTaskListProps = {
  list: TGenericItem[];
};

export function TaskList({ list }: TTaskListProps) {
  return (
    <ul className="tasks__list">
      <GenericList list={list} />
    </ul>
  );
}
