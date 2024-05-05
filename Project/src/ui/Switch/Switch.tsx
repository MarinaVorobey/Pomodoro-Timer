import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TSwitchProps = {
  mode: string;
  leftNode: ReactNode | string;
  rightNode: ReactNode | string;
  onChange?: (e: unknown) => void;
  register?: UseFormRegisterReturn;
  checked: boolean;
};

export function Switch({
  mode,
  leftNode,
  rightNode,
  onChange,
  register,
  checked,
}: TSwitchProps) {
  return (
    <div className="switch-block">
      {leftNode}
      <input
        {...register}
        onChange={onChange}
        type="checkbox"
        id={`switch-${mode}`}
        className="switch"
        checked={checked}
      />
      <label htmlFor={`switch-${mode}`} className="toggle"></label>
      {rightNode}
    </div>
  );
}
