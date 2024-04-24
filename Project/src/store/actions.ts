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
