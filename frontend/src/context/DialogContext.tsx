import { createContext, useState } from "react";
import { ReactNode } from "react";

type EditTaskItem = {
  task_id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
} | null;

type DeleteTaskItem = {
  task_id: string;
  title: string;
} | null;

interface IDialogState {
  dialogAddTask: boolean;
  setDialogAddTask: (dialogAddTask: boolean) => void;

  dialogEditTask: EditTaskItem;
  setDialogEditTask: (editTaskItem: EditTaskItem) => void;

  dialogDeleteTask: DeleteTaskItem;
  setDialogDeleteTask: (deleteTaskItem: DeleteTaskItem) => void;
}

const DialogContext = createContext<IDialogState>({
  dialogAddTask: false,
  setDialogAddTask: () => {},

  dialogEditTask: null,
  setDialogEditTask: () => {},

  dialogDeleteTask: null,
  setDialogDeleteTask: () => {},
});

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogAddTask, setDialogAddTask] = useState<boolean>(false);

  const [dialogEditTask, setDialogEditTask] = useState<EditTaskItem>(null);

  const [dialogDeleteTask, setDialogDeleteTask] =
    useState<DeleteTaskItem>(null);

  return (
    <DialogContext.Provider
      value={{
        dialogAddTask,
        setDialogAddTask,

        dialogEditTask,
        setDialogEditTask,

        dialogDeleteTask,
        setDialogDeleteTask,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };
export type { IDialogState };
