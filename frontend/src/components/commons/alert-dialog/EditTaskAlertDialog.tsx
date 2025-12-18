"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import SelectBasic from "../select/SelectBasic";
import { MouseEvent, useContext, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogContext } from "@/context/DialogContext";
import useTask from "@/components/views/task/useTask";
import { Controller } from "react-hook-form";

export default function EditTaskAlertDialog() {
  // React context API
  const { dialogEditTask, setDialogEditTask } = useContext(DialogContext);

  // Tanstack Query
  const {
    registerEditTask,
    handleSubmitEditTask,
    errorEditTask,
    controlEditTask,
    handleEditTask,
    isPendingEditTask,
    resetEditTask,
  } = useTask();

  const [openDate, setOpenDate] = useState(false);

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetEditTask();
    setDialogEditTask(null);
  };
  return (
    <AlertDialog open={!!dialogEditTask}>
      <AlertDialogContent>
        <form onSubmit={handleSubmitEditTask(handleEditTask)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Task</AlertDialogTitle>
            <FieldGroup>
              {/* ... Field Title ... */}
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  {...registerEditTask("title")}
                  id="title"
                  type="text"
                  placeholder="Input task titles"
                />
                {errorEditTask.title && (
                  <FieldDescription className="text-red-500">
                    {errorEditTask.title.message}
                  </FieldDescription>
                )}
              </Field>

              {/* ... Field Description ... */}
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  {...registerEditTask("description")}
                  id="description"
                  placeholder="Input task description"
                />
                {errorEditTask.description && (
                  <FieldDescription className="text-red-500">
                    {errorEditTask.description.message}
                  </FieldDescription>
                )}
              </Field>

              {/* ... Field Status ... */}
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Controller
                  name="status"
                  control={controlEditTask}
                  render={({ field }) => (
                    <SelectBasic
                      placeholder="Filter status"
                      groupLabel="Status"
                      options={[
                        { value: "to_do", label: "To Do" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "done", label: "Done" },
                      ]}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {errorEditTask.status && (
                  <FieldDescription className="text-red-500">
                    {errorEditTask.status.message}
                  </FieldDescription>
                )}
              </Field>

              {/* ... Field Deadline ... */}
              <Field>
                <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
                <Controller
                  name="deadline"
                  control={controlEditTask}
                  render={({ field }) => (
                    <Popover open={openDate} onOpenChange={setOpenDate}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="deadline" // ID disamakan
                          className={`w-48 justify-between font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(val) => {
                            field.onChange(val);
                            setOpenDate(false);
                          }}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errorEditTask.deadline && (
                  <FieldDescription className="text-red-500">
                    {errorEditTask.deadline.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPendingEditTask}
            >
              {isPendingEditTask ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button
              onClick={handleCancel}
              className="cursor-pointer"
              variant="destructive"
              type="button"
            >
              Batal
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
