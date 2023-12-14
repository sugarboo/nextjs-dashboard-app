'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  message: string | null,
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  },
}

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.'
  }),
  amount: z.coerce.number().gt(0, {
    message: 'Please enter an amount greater than $0.'
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please Select an invoice status.'
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod.
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      message: 'Missing Fields. Failed to Create Invoice',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for insertion into the database.
  const {
    customerId,
    amount,
    status,
  } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database.
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Create Invoice... ${error}`
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  // Validate Form using Zod.
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early, Otherwise, continue.
  if (!validatedFields.success) {
    return {
      message: 'Missing Fields. Failed to Update Invoice',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for updating the database.
  const {
    customerId,
    amount,
    status,
  } = validatedFields.data;
  const amountInCents = amount * 100;

  // Update the specific row in the database.
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Update Invoice... ${error}`
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Invoice... ${error}`
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
