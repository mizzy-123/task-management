"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogContext } from "@/context/DialogContext";
import { IconDotsVertical } from "@tabler/icons-react";
import { MouseEvent, useContext } from "react";

type ItemDataDatable = {
  id: number;
  task_id: string;
  user_id: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  created_by: string;
};

export default function DropDownMenuDataTable({
  item,
}: {
  item: ItemDataDatable;
}) {
  // React Context API
  const { setDialogEditTask, setDialogDeleteTask } = useContext(DialogContext);

  const handleEditTask = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDialogEditTask({
      task_id: item.task_id,
      title: item.title,
      description: item.description,
      deadline: item.deadline,
      status: item.status,
    });
  };

  const handleDeleteTask = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDialogDeleteTask({
      task_id: item.task_id,
      title: item.title,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem className="cursor-pointer" onClick={handleEditTask}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={handleDeleteTask}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
