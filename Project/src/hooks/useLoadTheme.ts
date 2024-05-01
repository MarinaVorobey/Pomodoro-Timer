import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

export function useLoadTheme() {
  const theme = useSelector((state: RootState) => state.theme);
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}
