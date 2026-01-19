"use client";

import { TaskController } from "@/components/modules/task-controller";
import { useParams } from "next/navigation";

export default function MatterPage() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Matter {id}</h1>
        <TaskController />
      </main>
    </div>
  );
}
