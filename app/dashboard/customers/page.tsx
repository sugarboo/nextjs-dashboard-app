import { Metadata } from "next";

import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: 'Customers'
}

const DashboardCustomersPage = async({
  searchParams,
}: {
  searchParams?: {
    query?: string,
  }
}) => {
  const query = searchParams?.query || '';
  // fetch customers data
  const customers = await fetchFilteredCustomers(query);

  return (
    <>
      <CustomersTable customers={customers} />
    </>
  );
}
 
export default DashboardCustomersPage;
