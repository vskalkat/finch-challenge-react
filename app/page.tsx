"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [matters, setMatters] = useState<string[]>([]);
  const router = useRouter();

  const handleAddMatter = () => {
    setMatters([...matters, "" + (matters.length + 1)]);
  }

  const handleViewMatter = (index: number) => {
    router.push(`/matter/${index}`);
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen gap-8 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">Matters</h1>
          <button onClick={handleAddMatter} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer w-fit">New matter</button>
        </div>

        <div className="flex flex-col gap-3">
          {matters.map((matter, index) => (
            <button onClick={() => handleViewMatter(index + 1)} className="border border-gray-300 rounded-md p-3 hover:bg-gray-600 cursor-pointer" key={index}>Matter {matter}</button>
          ))}
        </div>

      </main>
    </div>
  );
}