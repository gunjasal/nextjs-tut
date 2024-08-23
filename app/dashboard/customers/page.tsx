import {lusitana} from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import {CreatePhoto} from "@/app/ui/photos/buttons";
import {Suspense} from "react";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import MutateRandomTable from "@/app/ui/customers/mutate-random-table";
import Pagination from "@/app/ui/invoices/pagination";
import { auth } from "@/auth";

export default async function Page({
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

  const session = await auth();
  const user = session?.user;

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        session={JSON.stringify(session)}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        user={JSON.stringify(user)}
      </div>

      <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>customers page</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..."/>
        <CreatePhoto/>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
        <MutateRandomTable query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}