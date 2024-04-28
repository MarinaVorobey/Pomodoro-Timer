import { ActionCreator } from "@reduxjs/toolkit";

export const ADD_TASK = "ADD_TASK";
export type AddTaskAction = {
  type: typeof ADD_TASK;
  name: string;
};

export const addTask: ActionCreator<AddTaskAction> = (name: string) => ({
  type: ADD_TASK,
  name: name,
});

export const RENAME_TASK = "RENAME_TASK";
export type RenameTaskAction = {
  type: typeof RENAME_TASK;
  name: string;
  id: string;
};

export const renameTask: ActionCreator<RenameTaskAction> = (
  id: string,
  newName: string
) => ({
  type: RENAME_TASK,
  name: newName,
  id: id,
});

export const ADD_TOMATO = "ADD_TOMATO";
export type AddTomatoAction = {
  type: typeof ADD_TOMATO;
  id: string;
};

export const addTomato: ActionCreator<AddTomatoAction> = (id: string) => ({
  type: ADD_TOMATO,
  id: id,
});

export const REMOVE_TOMATO = "REMOVE_TOMATO";
export type RemoveTomatoAction = {
  type: typeof REMOVE_TOMATO;
  id: string;
};

export const removeTomato: ActionCreator<RemoveTomatoAction> = (
  id: string
) => ({
  type: REMOVE_TOMATO,
  id: id,
});

export const DELETE_TASK = "DELETE_TASK";
export type DeleteTaskAction = {
  type: typeof DELETE_TASK;
  id: string;
};

export const deleteTask: ActionCreator<DeleteTaskAction> = (id: string) => ({
  type: DELETE_TASK,
  id: id,
});

export type TaskActions =
  | AddTaskAction
  | RenameTaskAction
  | AddTomatoAction
  | RemoveTomatoAction
  | DeleteTaskAction;

// Timer actions
export const ADD_TIME = "ADD_TIME";
export type AddTimeAction = {
  type: typeof ADD_TIME;
};

export const addTime: ActionCreator<AddTimeAction> = () => ({
  type: ADD_TIME,
});

export const TIMER_COUNT = "TIMER_COUNT";
export type TimerCountAction = {
  type: typeof TIMER_COUNT;
};

export const timerCount: ActionCreator<TimerCountAction> = () => ({
  type: TIMER_COUNT,
});

export const PAUSE_TIMER = "PAUSE_TIMER";
export type PauseTimerAction = {
  type: typeof PAUSE_TIMER;
};

export const pauseTimer: ActionCreator<PauseTimerAction> = () => ({
  type: PAUSE_TIMER,
});

export const START_TIMER = "START_TIMER";
export type StartTimerAction = {
  type: typeof START_TIMER;
};

export const startTimer: ActionCreator<StartTimerAction> = () => ({
  type: START_TIMER,
});

export const COMPLETE_TIMER = "COMPLETE_TIMER";
export type CompleteTimerAction = {
  type: typeof COMPLETE_TIMER;
};

export const completeTimer: ActionCreator<CompleteTimerAction> = () => ({
  type: COMPLETE_TIMER,
});

export const STOP_TIMER = "STOP_TIMER";
export type StopTimerAction = {
  type: typeof STOP_TIMER;
};

export const stopTimer: ActionCreator<StopTimerAction> = () => ({
  type: STOP_TIMER,
});

export const SKIP_BREAK = "SKIP_BREAK";
export type SkipBreakAction = {
  type: typeof SKIP_BREAK;
};

export const skipBreak: ActionCreator<SkipBreakAction> = () => ({
  type: SKIP_BREAK,
});

export type TimerActions =
  | AddTimeAction
  | TimerCountAction
  | PauseTimerAction
  | StartTimerAction
  | CompleteTimerAction
  | StopTimerAction
  | SkipBreakAction;
