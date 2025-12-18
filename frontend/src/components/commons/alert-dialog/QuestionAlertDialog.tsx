import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogContext } from "@/context/DialogContext";
import useTask from "@/components/views/task/useTask";
import { useContext } from "react";

export function QuestionAlertDialog() {
  const { dialogDeleteTask, setDialogDeleteTask } = useContext(DialogContext);
  const { handleDeleteTask, isPendingDeleteTask } = useTask();

  return (
    <AlertDialog open={!!dialogDeleteTask}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            <span className="font-semibold">
              {" "}
              &quot;{dialogDeleteTask?.title}&quot;
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setDialogDeleteTask(null)}
            disabled={isPendingDeleteTask}
            className="cursor-pointer"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTask}
            disabled={isPendingDeleteTask}
            className="cursor-pointer"
          >
            {isPendingDeleteTask ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
