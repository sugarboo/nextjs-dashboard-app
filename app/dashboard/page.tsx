import {
  fetchCardData,
  fetchLatestInvoices,
  fetchRevenue
} from "@/app/lib/data";

import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";

import { lusitana } from "@/app/ui/fonts";

const DashboardPage = async () => {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers
  } = await fetchCardData();
  
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Collected"
          value={totalPaidInvoices}
          type="collected"
        />
        <Card
          title="Pending"
          value={totalPendingInvoices}
          type="pending"
        />
        <Card
          title="Total Invoices"
          value={numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 lg:grid-cols-8 mt-6">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
 
export default DashboardPage;