export interface ITask {
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  deadline: string; // Format ISO 8601 Date String
  status: "in_progress" | "to_do" | "done";
  created_by: string;
  created_at: string; // Format ISO 8601 Date String
}

// Interface untuk detail error per field
export interface TaskValidationError {
  field: string; // misal: 'title', 'description'
  message: string;
}

// Interface utama response error
export interface CreateTaskErrorResponse {
  code: number;
  message: string;
  error: TaskValidationError[];
}
