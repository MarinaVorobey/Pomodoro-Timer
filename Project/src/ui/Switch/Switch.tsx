import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../store/actions";
import { RootState } from "../../store/rootReducer";
import { useLoadTheme } from "../../hooks/useLoadTheme";

type TSwitchProps = {
  leftNode: ReactNode;
  rightNode: ReactNode;
};

export function Switch({ leftNode, rightNode }: TSwitchProps) {
  const dispatch = useDispatch();
  useLoadTheme();
  const currTheme = useSelector((state: RootState) => state.theme);

  return (
    <div className="switch-block">
      {leftNode}
      <input
        onChange={() => dispatch(switchTheme())}
        type="checkbox"
        id="switch"
        className="switch"
        checked={currTheme === "dark"}
      />
      <label htmlFor="switch" className="toggle"></label>
      {rightNode}
    </div>
  );
}
