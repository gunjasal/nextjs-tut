'use client';

import { useForm } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod"; // todo ymkim really have to use this?

import { useActionState } from 'react'; // todo ymkim not works with react-hook-form
import {CustomerField, Invoice} from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';

export default function HookForm({ customers }: { customers: CustomerField[] }) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Invoice>({
    // resolver: zodResolver(UserSchema),
    // mode: "onChange",
  });
  const initialState: State = { message: null, errors: {} };
  // const [state, formAction] = useActionState(createInvoice, initialState);

  const onSubmit = (data: Invoice) => {
    console.log(data);
  };

  console.log("@@ errors=", errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
              {...register('customerId', {
                required: 'Customer required',
                validate: (value) => {
                  console.log("## cumssss", value);
                  return !value || value.trim() !== '' || 'Ccccustomer Required'
                }
              })}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"/>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {errors?.customerId && (
              <p className="mt-2 text-sm text-red-500" key={errors.customerId.message}>
                {errors.customerId.message}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                {...register('amount', {
                  required: 'Amount required',
                  validate: (value) => {
                    console.log("## ammmm", value);
                    return !value || value > 0 || 'Aaamount Required'
                  }
                })}
              />
              <CurrencyDollarIcon
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {errors?.amount && (
                <p className="mt-2 text-sm text-red-500" key={errors.amount.message}>
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  {...register('status', {
                    required: 'Status111 required',
                    validate: (value) => value.trim() !== '' || 'Ssss11tatus Required'
                  })}
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4"/>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  {...register('status', {
                    required: 'Statu22s required',
                    validate: (value) => value.trim() !== '' || 'Ssss22tatus Required'
                  })}
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4"/>
                </label>
              </div>
              <div id="status-error" aria-live="polite" aria-atomic="true">
                {errors?.status && (
                  <p className="mt-2 text-sm text-red-500" key={errors.status.message}>
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
