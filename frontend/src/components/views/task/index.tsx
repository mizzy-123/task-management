"use client";

import { DataTable2 } from "@/components/commons/data-table/data-table2";

import SelectBasic from "@/components/commons/select/SelectBasic";
import { useEffect, useState } from "react";
import useTask from "./useTask";
import { useRouter, useSearchParams } from "next/navigation";
import AddTaskAlertDialog from "@/components/commons/alert-dialog/AddTaskAlertDialog";
import TaskTableSkeleton from "@/components/skeletons/TaskTableSkeleton";

export default function TaskView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const [selectedSortDeadline, setSelectedSortDeadline] = useState(
    searchParams.get("sortOrder") || ""
  );

  const { dataTask, loadingTask } = useTask({
    status: selectedStatus,
    sortOrder: selectedSortDeadline,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedStatus) params.set("status", selectedStatus);
    if (selectedSortDeadline) params.set("sortOrder", selectedSortDeadline);

    const queryString = params.toString();
    router.push(`?${queryString}`, { scroll: false });
  }, [selectedStatus, selectedSortDeadline, router]);

  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="w-full flex justify-end px-6 gap-4">
          <SelectBasic
            placeholder="Filter status"
            groupLabel="Status"
            options={[
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
              { value: "DESC", label: "DESC" },
              { value: "ASC", label: "ASC" },
            ]}
            value={selectedSortDeadline}
            onValueChange={(value) => setSelectedSortDeadline(value)}
          />
        </div>

        {loadingTask ? (
          <TaskTableSkeleton />
        ) : (
          <DataTable2 data={dataTask || []} />
        )}
      </div>

      {/* Alert Dialog */}
      <AddTaskAlertDialog />
    </>
  );
}
