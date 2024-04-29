import { RootState } from "../store/rootReducer";

export function saveToStorage(state: RootState) {
  localStorage.setItem("pomodoro_box_data", JSON.stringify(state));
}
