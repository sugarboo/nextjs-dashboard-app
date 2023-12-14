import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

const DashboardInvoicesCreatePage = async() => {
  const breadcrumbs = [
    {
      label: 'Invoices',
      href: '/dashboard/invoices'
    },
    {
      label: 'Create Invoice',
      href: '/dashboard/invoices/create',
      active: true
    }
  ];

  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form customers={customers} />
    </main>
  );
}
 
export default DashboardInvoicesCreatePage;
