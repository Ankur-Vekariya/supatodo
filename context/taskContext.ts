import { createContext, useContext, useState } from "react";

export const taskContext = createContext({
  task: "",
  setTask: (newTask: string) => {},
});
