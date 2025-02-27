"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Dashboard | Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>

      <p>or</p>
      
      <Link href="/neto/login?type=webstore">Authenticate</Link>

      <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          Error Report
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p className="break-words">{error.message}</p>
        </div>
      </details>
    </div>
  );
}
