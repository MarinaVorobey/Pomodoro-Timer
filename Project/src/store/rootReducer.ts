import { Reducer, createReducer } from "@reduxjs/toolkit";
import {
  ADD_TASK,
  ADD_TIME,
  ADD_TOMATO,
  AddTaskAction,
  AddTomatoAction,
  COMPLETE_TIMER,
  DELETE_TASK,
  DeleteTaskAction,
  LOAD_SAVED_STATE,
  LoadSavedStateAction,
  PAUSE_TIMER,
  REMOVE_TOMATO,
  RENAME_TASK,
  RemoveTomatoAction,
  RenameTaskAction,
  SKIP_BREAK,
  SKIP_TASK,
  START_TIMER,
  STOP_TIMER,
  TIMER_COUNT,
  TaskActions,
  TimerActions,
} from "./actions";
import { saveToStorage } from "../util/saveToStorage";

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
  passed: number;
  tomatoesPassed: number;
  tomatoesLeft: number;
  isPaused: boolean;
  isStopped: boolean;
  mode: "work" | "break";
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

const TOMATO_TIME = 150000;
const BREAK_TIME = 300000;

export const rootReducer: Reducer<
  RootState,
  TaskActions | TimerActions | LoadSavedStateAction
> = createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_SAVED_STATE, (state, action: LoadSavedStateAction) => {
      const loadedState = action.savedState;
      Object.assign(state, loadedState);
    })
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
          passed: 0,
          tomatoesPassed: 0,
          tomatoesLeft: 1,
          isPaused: false,
          isStopped: true,
          mode: "work",
        };
      }
      saveToStorage(state);
    })
    .addCase(RENAME_TASK, (state, action: RenameTaskAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (task) task.name = action.name;
      if (action.id === state.currTask?.id) {
        state.currTask.name = action.name;
      }
      saveToStorage(state);
    })
    .addCase(ADD_TOMATO, (state, action: AddTomatoAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (!task) return;
      task.tomatoes++;
      state.totalTime += TOMATO_TIME;
      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft++;
      }
      saveToStorage(state);
    })
    .addCase(REMOVE_TOMATO, (state, action: RemoveTomatoAction) => {
      const task = state.tasks.find((x: TTask) => x.id === action.id);
      if (!task || task.tomatoes <= 1) return;
      task.tomatoes--;
      state.totalTime -= TOMATO_TIME;
      if (action.id === state.currTask?.id) {
        state.currTask.tomatoesLeft--;
      }
      saveToStorage(state);
    })
    .addCase(DELETE_TASK, (state, action: DeleteTaskAction) => {
      const task = state.tasks.find((x) => x.id === action.id);
      if (task) {
        state.totalTime -= TOMATO_TIME * task.tomatoes;
      }
      state.tasks = state.tasks.filter((x: TTask) => x.id !== action.id);
      if (action.id === state.currTask?.id) {
        state.totalTime += TOMATO_TIME - state.currTask.time;
        if (!state.tasks.length) {
          state.currTask = null;
        } else {
          state.currTask = {
            id: state.tasks[0].id,
            name: state.tasks[0].name,
            time: TOMATO_TIME,
            passed: 0,
            tomatoesPassed: 0,
            tomatoesLeft: state.tasks[0].tomatoes,
            isPaused: false,
            isStopped: true,
            mode: "work",
          };
        }
      }
      saveToStorage(state);
    })
    .addCase(ADD_TIME, (state) => {
      if (!state.currTask) return;
      state.currTask.time += 60000;
      state.totalTime += 60000;
      saveToStorage(state);
    })
    .addCase(TIMER_COUNT, (state) => {
      if (!state.currTask) return;
      state.currTask.time -= 1000;
      state.currTask.passed += 1000;
      state.totalTime -= 1000;
    })
    .addCase(PAUSE_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = true;
      saveToStorage(state);
    })
    .addCase(START_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = false;
      saveToStorage(state);
    })
    .addCase(COMPLETE_TIMER, (state) => {
      if (!state.currTask) return;
      const task = state.currTask;
      if (task.mode === "work") {
        task.tomatoesLeft--;
        state.tasks[0].tomatoes--;
        task.tomatoesPassed++;

        if (task.tomatoesLeft === 0) {
          state.tasks.splice(0, 1);
          if (!state.tasks.length) {
            state.currTask = null;
          } else {
            state.currTask = {
              id: state.tasks[0].id,
              name: state.tasks[0].name,
              time: BREAK_TIME,
              passed: 0,
              tomatoesPassed: 0,
              tomatoesLeft: state.tasks[0].tomatoes,
              isPaused: false,
              isStopped: false,
              mode: "break",
            };
          }
        } else {
          task.mode = "break";
          task.time = BREAK_TIME;
        }
      } else {
        task.mode = "work";
        task.time = TOMATO_TIME;
      }
      saveToStorage(state);
    })
    .addCase(STOP_TIMER, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.totalTime -= state.currTask.time;
      state.totalTime += TOMATO_TIME;
      state.currTask.time = TOMATO_TIME;
    })
    .addCase(SKIP_BREAK, (state) => {
      if (!state.currTask) return;
      state.currTask.isPaused = false;
      state.currTask.isStopped = true;
      state.currTask.time = TOMATO_TIME;
      state.currTask.mode = "work";
    })
    .addCase(SKIP_TASK, (state) => {
      if (!state.currTask) return;
      state.totalTime -= TOMATO_TIME * (state.currTask.tomatoesLeft - 1);
      state.totalTime -= state.currTask.time;
      state.tasks.splice(0, 1);
      if (!state.tasks.length) {
        state.currTask = null;
      } else {
        state.currTask = {
          id: state.tasks[0].id,
          name: state.tasks[0].name,
          time: TOMATO_TIME,
          passed: 0,
          tomatoesPassed: 0,
          tomatoesLeft: state.tasks[0].tomatoes,
          isPaused: false,
          isStopped: true,
          mode: "work",
        };
      }
      saveToStorage(state);
    });
});
