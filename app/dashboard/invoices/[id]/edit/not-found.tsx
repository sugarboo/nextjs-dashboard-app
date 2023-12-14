import Link from "next/link";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

const DashboardInvoicesIdEditNotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-2 h-full">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice...</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 px-4 py-2 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-400 transition-colors"
      >
        Go Back
      </Link>
    </main>
  );
}
 
export default DashboardInvoicesIdEditNotFoundPage;
