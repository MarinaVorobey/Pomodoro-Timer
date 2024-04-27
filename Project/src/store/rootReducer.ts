import { Reducer, createReducer } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  ADD_TIME,
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
  TimerActions,
} from "./actions";

type TTask = {
  id: string;
  name: string;
  tomatoes: number;
};

type TDailyStats = {
  tomatoes: number;
  cancelled: number;
};

export type TCurrentTask = {
  id: string;
  name: string;
  time: number;
  tomatoesPassed: number;
  tomatoesLeft: number;
  isPaused: boolean;
  mode: "work" | "break" | "stopped";
};

export type RootState = {
  totalTime: number;
  totalTomatoes: number;
  maxId: number;
  tasks: TTask[];
  currTask: TCurrentTask | null;

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

const TOMATO_TIME = 1500000;

export const rootReducer: Reducer<RootState, TaskActions | TimerActions> =
  createReducer(initialState, (builder) => {
    builder
      .addCase(ADD_TASK, (state, action: AddTaskAction) => {
        state.tasks.push({
          id: `${state.maxId}`,
          name: action.name,
          tomatoes: 1,
        });
        state.maxId++;
        state.totalTime += TOMATO_TIME;
        if (!state.currTask) {
          state.currTask = {
            id: state.tasks[0].id,
            name: action.name,
            time: TOMATO_TIME,
            tomatoesPassed: 0,
            tomatoesLeft: 1,
            isPaused: false,
            mode: "stopped",
          };
        }
      })
      .addCase(RENAME_TASK, (state, action: RenameTaskAction) => {
        const task = state.tasks.find((x: TTask) => x.id === action.id);
        if (task) task.name = action.name;
        if (action.id === state.currTask?.id) {
          state.currTask.name = action.name;
        }
      })
      .addCase(ADD_TOMATO, (state, action: AddTomatoAction) => {
        const task = state.tasks.find((x: TTask) => x.id === action.id);
        if (!task) return;
        task.tomatoes++;
        state.totalTime += TOMATO_TIME;
        if (action.id === state.currTask?.id) {
          state.currTask.tomatoesLeft++;
        }
      })
      .addCase(REMOVE_TOMATO, (state, action: RemoveTomatoAction) => {
        const task = state.tasks.find((x: TTask) => x.id === action.id);
        if (!task || task.tomatoes <= 1) return;
        task.tomatoes--;
        state.totalTime -= TOMATO_TIME;
        if (action.id === state.currTask?.id) {
          state.currTask.tomatoesLeft--;
        }
      })
      .addCase(DELETE_TASK, (state, action: DeleteTaskAction) => {
        state.tasks = state.tasks.filter((x: TTask) => x.id !== action.id);
        if (action.id === state.currTask?.id) {
          state.totalTime -= TOMATO_TIME * state.currTask.tomatoesLeft;
          if (!state.tasks.length) {
            state.currTask = null;
          } else {
            state.currTask = {
              id: state.tasks[0].id,
              name: state.tasks[0].name,
              time: TOMATO_TIME,
              tomatoesPassed: 0,
              tomatoesLeft: state.tasks[0].tomatoes,
              isPaused: false,
              mode: "stopped",
            };
          }
        }
      })
      .addCase(ADD_TIME, (state) => {
        if (!state.currTask) return;
        state.currTask.time += 60000;
      });
  });
