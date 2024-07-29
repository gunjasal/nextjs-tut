// 'use client'

import {fetchInvoicesPages} from "@/app/lib/data";
import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {CreateInvoice} from "@/app/ui/invoices/buttons";
import {Suspense} from "react";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import Table from "@/app/ui/photos/table";
import Pagination from "@/app/ui/invoices/pagination";
import {CreatePhoto} from "@/app/ui/photos/buttons";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 50;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Photoos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..."/>
        <CreatePhoto/>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}