import Link from 'next/link';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  // CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 dark:bg-neutral-700 p-2 md:pt-0">
              <div className="md:hidden">
                {customers && customers.length
                  ? customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="mb-2 w-full rounded-md bg-white dark:bg-neutral-600 p-4"
                    >
                      <div className="flex items-center justify-between border-b dark:border-neutral-700 pb-4">
                        <div>
                          <div className="mb-2 flex items-center">
                            <div className="flex items-center gap-3">
                              <Image
                                src={customer.image_url}
                                className="rounded-full"
                                alt={`${customer.name}'s profile picture`}
                                width={28}
                                height={28}
                              />
                              <p>{customer.name}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-white/50">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between border-b dark:border-neutral-700 py-5">
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs">Pending</p>
                          <p className="font-medium">{customer.total_pending}</p>
                        </div>
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs">Paid</p>
                          <p className="font-medium">{customer.total_paid}</p>
                        </div>
                      </div>
                      <div className="pt-4 text-sm">
                        <Link
                          href={`/dashboard/invoices?query=${customer.name}`}
                          className="text-blue-600 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-200"
                        >
                          {customer.total_invoices} invoices
                        </Link>
                      </div>
                    </div>
                  )) 
                  : (
                    <div className="mb-2 w-full h-12 rounded-md bg-gray-50 dark:bg-neutral-700 p-4 text-center text-gray-400">
                      No Data.
                    </div>
                  )
                }
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 dark:text-white/80 dark:bg-neutral-700 md:table">
                <thead className="rounded-md bg-gray-50 dark:bg-neutral-700 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 text-gray-900 dark:text-white/80">
                  {customers && customers.length
                    ? customers.map((customer) => (
                      <tr key={customer.id} className="group">
                        <td className="whitespace-nowrap bg-white dark:bg-neutral-600 py-5 pl-4 pr-3 text-sm text-black dark:text-white/80 group-first-of-type:rounded-tl-md group-last-of-type:rounded-bl-md sm:pl-6">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap bg-white dark:bg-neutral-600 px-4 py-5 text-sm">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap bg-white dark:bg-neutral-600 px-4 py-5 text-sm">
                          <Link
                            href={`/dashboard/invoices?query=${customer.name}`}
                            className="text-blue-600 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-200 hover:underline hover:underline-offset-4"
                          >
                            {customer.total_invoices}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap bg-white dark:bg-neutral-600 px-4 py-5 text-sm">
                          {customer.total_pending}
                        </td>
                        <td className="whitespace-nowrap bg-white dark:bg-neutral-600 px-4 py-5 text-sm group-first-of-type:rounded-tr-md group-last-of-type:rounded-br-md">
                          {customer.total_paid}
                        </td>
                      </tr>
                    ))
                    :(
                      <tr className="group">
                        <td
                          colSpan={5}
                          className="w-full h-12 text-center text-gray-400"
                        >
                          No Data.
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
