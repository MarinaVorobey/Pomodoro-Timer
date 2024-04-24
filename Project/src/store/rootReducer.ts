import { Reducer, createReducer } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  ADD_TOMATO,
  AddTaskAction,
  AddTomatoAction,
  DELETE_TASK,
  DeleteTaskAction,
  REMOVE_TOMATO,
  RENAME_TASK,
  RemoveTomatoAction,
  RenameTaskAction,
  TaskActions,
} from "./actions";

type TTask = {
  id: string;
  name: string;
  totamatoes: number;
};

type TDailyStats = {
  tomatoes: number;
  cancelled: number;
};

export type RootState = {
  totalTime: number;
  totalTomatoes: number;
  maxId: number;
  tasks: TTask[];
  currTask: {
    id: string;
    name: string;
    time: Date;
    tomatoesPassed: number;
    tomatoesLeft: number;
    isBreak: boolean;
  } | null;

  stats: {
    [N: string]: TDailyStats;
  };
};

const initialState: RootState = {
  totalTime: 0,
  totalTomatoes: 0,
  maxId: 1,
  tasks: [],
  currTask: null,
  stats: {},
};

export const rootReducer: Reducer<RootState, TaskActions> = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(ADD_TASK, (state, action: AddTaskAction) => {
        state.tasks.push({
          id: `${state.maxId}`,
          name: action.name,
          totamatoes: 1,
        });
        state.maxId++;
      })
      .addCase(RENAME_TASK, (state, action: RenameTaskAction) => {
        const task = state.tasks.find((x: TTask) => x.id == action.id);
        if (task) task.name = action.name;
      })
      .addCase(ADD_TOMATO, (state, action: AddTomatoAction) => {
        const task = state.tasks.find((x: TTask) => x.id == action.id);
        if (task) task.totamatoes++;
      })
      .addCase(REMOVE_TOMATO, (state, action: RemoveTomatoAction) => {
        const task = state.tasks.find((x: TTask) => x.id == action.id);
        if (task && task.totamatoes > 1) task.totamatoes--;
      })
      .addCase(DELETE_TASK, (state, action: DeleteTaskAction) => {
        state.tasks = state.tasks.filter((x: TTask) => x.id != action.id);
      });
  }
);
