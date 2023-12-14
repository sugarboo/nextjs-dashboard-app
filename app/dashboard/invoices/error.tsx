'use client';

import { useEffect } from "react";

const DashboardInvoicesErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string },
  reset: () => void,
}) => {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <main className="flex flex-col justify-center items-center h-full">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-400 transition-colors"
        onClick={() => {
          // Attempt to recover by trying to re-render the invoices route
          reset()
        }}
      >
        Try again
      </button>
    </main>
  );
}
 
export default DashboardInvoicesErrorPage;
