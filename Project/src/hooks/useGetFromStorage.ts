import { useDispatch } from "react-redux";
import { RootState } from "../store/rootReducer";
import { loadSavedState } from "../store/actions";

export function useGetFromStorage() {
  const dispatch = useDispatch();
  const savedState = localStorage.getItem("pomodoro_box_data");
  if (savedState) {
    const state: RootState = JSON.parse(savedState);
    dispatch(loadSavedState(state));
  }
}
