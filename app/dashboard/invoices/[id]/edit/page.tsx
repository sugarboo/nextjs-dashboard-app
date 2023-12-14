import { notFound } from "next/navigation";

import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";

const DashboardInvoiceIdEditPage = async({
  params,
}: {
  params: {
    id: string,
  }
}) => {
  const id = params.id;

  const breadcrumbs = [
    {
      href: '/dashboard/invoices',
      label: 'Invoices',
    },
    {
      href: `/dashboard/invoices/${id}/edit`,
      label: 'Edit invoices',
      active: true,
    },
  ];

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
 
export default DashboardInvoiceIdEditPage;
