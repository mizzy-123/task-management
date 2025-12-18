"use client";

import { DataTable2 } from "@/components/commons/data-table/data-table2";

import SelectBasic from "@/components/commons/select/SelectBasic";
import { useContext, useEffect, useState, MouseEvent } from "react";
import useTask from "./useTask";
import { useRouter, useSearchParams } from "next/navigation";
import AddTaskAlertDialog from "@/components/commons/alert-dialog/AddTaskAlertDialog";
import TaskTableSkeleton from "@/components/skeletons/TaskTableSkeleton";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DialogContext } from "@/context/DialogContext";
import EditTaskAlertDialog from "@/components/commons/alert-dialog/EditTaskAlertDialog";
import { QuestionAlertDialog } from "@/components/commons/alert-dialog/QuestionAlertDialog";

export default function TaskView() {
  // Router
  const router = useRouter();

  // Search param
  const searchParams = useSearchParams();

  // React context API
  const { setDialogAddTask } = useContext(DialogContext);

  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "all"
  );
  const [selectedSortDeadline, setSelectedSortDeadline] = useState(
    searchParams.get("sortOrder") || "none"
  );

  const { dataTask, loadingTask } = useTask({
    status: selectedStatus === "all" ? "" : selectedStatus,
    sortOrder: selectedSortDeadline === "none" ? "" : selectedSortDeadline,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedStatus && selectedStatus !== "all")
      params.set("status", selectedStatus);
    if (selectedSortDeadline && selectedSortDeadline !== "none")
      params.set("sortOrder", selectedSortDeadline);

    const queryString = params.toString();
    router.push(`?${queryString}`, { scroll: false });
  }, [selectedStatus, selectedSortDeadline, router]);

  const handleAddTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDialogAddTask(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex justify-between items-center px-6">
          <div className="flex items-center gap-4">
            <SelectBasic
              placeholder="Filter status"
              groupLabel="Status"
              options={[
                { value: "all", label: "All" },
                { value: "to_do", label: "To Do" },
                { value: "in_progress", label: "In Progress" },
                { value: "done", label: "Done" },
              ]}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            />
            <SelectBasic
              placeholder="Sort deadline"
              groupLabel="Sort of deadline"
              options={[
                { value: "none", label: "None" },
                { value: "DESC", label: "DESC" },
                { value: "ASC", label: "ASC" },
              ]}
              value={selectedSortDeadline}
              onValueChange={(value) => setSelectedSortDeadline(value)}
            />
          </div>
          <div className="flex items-center">
            <Button className="cursor-pointer" onClick={handleAddTask}>
              <PlusIcon />
              Add task
            </Button>
          </div>
        </div>

        {loadingTask ? (
          <TaskTableSkeleton />
        ) : (
          <DataTable2 data={dataTask || []} />
        )}
      </div>

      {/* Alert Dialog */}
      <AddTaskAlertDialog />
      <EditTaskAlertDialog />
      <QuestionAlertDialog />
    </>
  );
}
