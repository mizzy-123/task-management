import DashboardView from "@/components/views/task";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <DashboardView />
    </Suspense>
  );
}
