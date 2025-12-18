"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import SelectBasic from "../select/SelectBasic";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AddTaskAlertDialog() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Task</AlertDialogTitle>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" type="text" placeholder="Input task titles" />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea id="description" placeholder="Input task description" />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Status</FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Deadline</FieldLabel>
              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpenDate(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button className="cursor-pointer">Simpan</Button>
          <Button className="cursor-pointer" variant="destructive">
            Batal
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
