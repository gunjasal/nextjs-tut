'use client'

import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import {usePhotos} from "@/service/photo/usePhotoService";
import {useEffect, useState} from "react";

// todo ymkim:
//  - without async no suspense fallback
//  - with async screen re-renders with same content twice
//    A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.
export default function PhotosTable({
// export default async function PhotosTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // todo ymkim: isStale makes loading infinite
  // const { data: photos, isLoading, isError, isFetching, isFetched, isStale } = usePhotos(currentPage);
  // console.log("### currentPage", currentPage, isLoading, isError, isFetching, isFetched, isStale);

  const { data: photos, isLoading, isError, isFetching, isFetched } = usePhotos(currentPage);
  console.log("### currentPage", currentPage, isLoading, isError, isFetching, isFetched);


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // todo ymkim errorBoundary
  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {photos?.map((photo) => (
              <div
                key={photo.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={photo.url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${photo.albumId}'s profile picture`}
                      />
                      <p>{photo.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Customer
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Email
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Amount
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Status
              </th>
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {photos?.map((photo) => (
              <tr
                key={photo.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={photo.url}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${photo.albumId}'s profile picture`}
                    />
                    <p>{photo.title}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <p>{photo.albumId}</p>
                  {/*<InvoiceStatus status={photo.status} />*/}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    <p>{photo.id}</p>
                    {/*<UpdateInvoice id={photo.id} />*/}
                    {/*<DeleteInvoice id={photo.id} />*/}
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
