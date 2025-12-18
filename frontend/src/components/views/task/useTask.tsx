import instance from "@/lib/axios";
import { ITask } from "@/types/task/task";
import { useQuery } from "@tanstack/react-query";

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

  const buildEndpoint = () => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (sortOrder) params.append("sortOrder", sortOrder);
    const queryString = params.toString();
    return `${BASE}${queryString ? `?${queryString}` : ""}`;
  };

  const getTask = async () => {
    const res = await instance.get(buildEndpoint());

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

  return {
    dataTask,
    loadingTask,
    isErrorTask,
    errorTask,
  };
};

export default useTask;
