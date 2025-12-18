import instance from "@/lib/axios";
import { CreateTaskErrorResponse, ITask } from "@/types/task/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addTaskSchema, AddTaskSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useContext, useEffect } from "react";
import { DialogContext } from "@/context/DialogContext";
import { AxiosError } from "axios";

interface UseTaskParams {
  status?: string;
  sortOrder?: string;
}

interface TaskResponse {
  id: number;
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  deadline: string;
  status: "in_progress" | "to_do" | "done";
  created_by: string;
  created_at: string;
}

const useTask = ({ status, sortOrder }: UseTaskParams = {}) => {
  const BASE = "/task";

  const ENDPOINT = {
    buildEndpoint: () => {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (sortOrder) params.append("sortOrder", sortOrder);
      const queryString = params.toString();
      return `${BASE}${queryString ? `?${queryString}` : ""}`;
    },
    addTask: BASE,
    updateTask: (taskId: string) => `${BASE}/${taskId}`,
    deleteTask: (taskId: string) => `${BASE}/${taskId}`,
  };

  // React Context API
  const {
    setDialogAddTask,
    setDialogEditTask,
    dialogEditTask,
    dialogDeleteTask,
    setDialogDeleteTask,
  } = useContext(DialogContext);

  // Query Client untuk invalidate/refetch
  const queryClient = useQueryClient();

  /*---------------------------------Get task----------------------------------- */
  const getTask = async () => {
    const res = await instance.get(ENDPOINT.buildEndpoint());

    // Normalize data
    const normalizedData: TaskResponse[] = res.data.data.map(
      (task: ITask, index: number) => ({
        id: index + 1,
        task_id: task.task_id,
        user_id: task.user_id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        created_by: task.created_by,
        created_at: task.created_at,
      })
    );

    return normalizedData;
  };

  const {
    data: dataTask,
    isPending: loadingTask,
    isError: isErrorTask,
    error: errorTask,
  } = useQuery<TaskResponse[]>({
    queryKey: ["task", status, sortOrder],
    queryFn: getTask,
    enabled: true,
    staleTime: 0,
    refetchOnMount: "always",
  });

  /*-------------------------------------------------------------------- */

  /*---------------------------------Add task----------------------------------- */
  const {
    register: registerAddTask,
    handleSubmit: handleSubmitAddTask,
    formState: { errors: errorAddTask },
    control: controlAddTask,
    reset: resetAddTask,
  } = useForm<AddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      status: "",
      deadline: undefined,
    },
  });

  const addTaskService = async (payload: AddTaskSchema) => {
    const res = await instance.post(ENDPOINT.addTask, {
      title: payload.title,
      description: payload.description,
      status: payload.status,
      deadline: payload.deadline,
    });

    return res;
  };

  const { mutate: mutateAddTask, isPending: isPendingAddTask } = useMutation({
    mutationFn: addTaskService,
    onError: (e: AxiosError<CreateTaskErrorResponse>) => {
      toast.error(e.response?.data?.message ?? e.message ?? "Something Wrong");
    },
    onSuccess: () => {
      toast.success("Task has been added");
      // Invalidate query untuk auto-refresh data
      queryClient.invalidateQueries({ queryKey: ["task"] });
      // Reset form
      resetAddTask();
      setDialogAddTask(false);
    },
  });

  const handleAddTask = (data: AddTaskSchema) => mutateAddTask(data);
  /*-------------------------------------------------------------------- */

  /*---------------------------------Edit task----------------------------------- */
  const {
    register: registerEditTask,
    handleSubmit: handleSubmitEditTask,
    formState: { errors: errorEditTask },
    control: controlEditTask,
    reset: resetEditTask,
    setValue: setValueEditTask,
  } = useForm<AddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      status: "",
      deadline: undefined,
    },
  });

  // Populate form saat dialogEditTask berubah
  useEffect(() => {
    if (dialogEditTask) {
      setValueEditTask("title", dialogEditTask.title);
      setValueEditTask("description", dialogEditTask.description);
      setValueEditTask("status", dialogEditTask.status);
      setValueEditTask("deadline", new Date(dialogEditTask.deadline));
    }
  }, [dialogEditTask, setValueEditTask]);

  const updateTaskService = async (
    payload: AddTaskSchema & { task_id: string }
  ) => {
    const res = await instance.put(ENDPOINT.updateTask(payload.task_id), {
      title: payload.title,
      description: payload.description,
      status: payload.status,
      deadline: payload.deadline,
    });

    return res;
  };

  const { mutate: mutateEditTask, isPending: isPendingEditTask } = useMutation({
    mutationFn: updateTaskService,
    onError: (e: AxiosError<CreateTaskErrorResponse>) => {
      toast.error(e.response?.data?.message ?? e.message ?? "Something Wrong");
    },
    onSuccess: () => {
      toast.success("Task has been updated");
      // Invalidate query untuk auto-refresh data
      queryClient.invalidateQueries({ queryKey: ["task"] });
      // Reset form
      resetEditTask();
      setDialogEditTask(null);
    },
  });

  const handleEditTask = (data: AddTaskSchema) => {
    if (dialogEditTask?.task_id) {
      mutateEditTask({ ...data, task_id: dialogEditTask.task_id });
    }
  };
  /*-------------------------------------------------------------------- */

  /*---------------------------------Delete task----------------------------------- */
  const deleteTaskService = async (taskId: string) => {
    const res = await instance.delete(ENDPOINT.deleteTask(taskId));
    return res;
  };

  const { mutate: mutateDeleteTask, isPending: isPendingDeleteTask } =
    useMutation({
      mutationFn: deleteTaskService,
      onError: (e: AxiosError<CreateTaskErrorResponse>) => {
        toast.error(
          e.response?.data?.message ?? e.message ?? "Something Wrong"
        );
      },
      onSuccess: () => {
        toast.success("Task has been deleted");
        // Invalidate query untuk auto-refresh data
        queryClient.invalidateQueries({ queryKey: ["task"] });
        // Close dialog
        setDialogDeleteTask(null);
      },
    });

  const handleDeleteTask = () => {
    if (dialogDeleteTask?.task_id) {
      mutateDeleteTask(dialogDeleteTask.task_id);
    }
  };
  /*-------------------------------------------------------------------- */

  return {
    dataTask,
    loadingTask,
    isErrorTask,
    errorTask,

    registerAddTask,
    handleSubmitAddTask,
    errorAddTask,
    controlAddTask,
    handleAddTask,
    isPendingAddTask,
    resetAddTask,

    registerEditTask,
    handleSubmitEditTask,
    errorEditTask,
    controlEditTask,
    handleEditTask,
    isPendingEditTask,
    resetEditTask,

    handleDeleteTask,
    isPendingDeleteTask,
  };
};

export default useTask;
