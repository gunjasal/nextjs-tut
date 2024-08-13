'use client'

import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {queryOptions} from "@/service/photo/PhotoService";
import BackendService from "@/service/BackendService";

export default function MutateRandomTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data: random, isLoading, isError, isFetching, isFetched } = useQuery({
    queryKey: ["random"],
    queryFn: () => BackendService.request('GET', `http://localhost:8080/test/random`),
  });
  console.log("## random=", random);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError: isErrorMutate, isSuccess } = useMutation({
    mutationFn: () => BackendService.request('POST', `http://localhost:8080/test/random`),
    onSuccess: (data) => queryClient.invalidateQueries({queryKey: ["random"]}),
  });

  return (
    <div className="mt-6 flow-root">
      query and mutate
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div>
                test={JSON.stringify(random)}
          </div>
          <div>
            <button onClick={e => mutate()}>mutate random</button>
          </div>
        </div>
      </div>
    </div>
  );

  // const { data: photos, isLoading, isError, isFetching, isFetched } = useQuery(queryOptions.all(currentPage));
  //
  // return (
  //   <div className="mt-6 flow-root">
  //     <div className="inline-block min-w-full align-middle">
  //       <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
  //         <div className="md:hidden">
  //           {photos?.map((photo) => (
  //             <div
  //               key={photo.id}
  //               className="mb-2 w-full rounded-md bg-white p-4"
  //             >
  //               <div className="flex items-center justify-between border-b pb-4">
  //                 <div>
  //                   <div className="mb-2 flex items-center">
  //                     <Image
  //                       src={photo.url}
  //                       className="mr-2 rounded-full"
  //                       width={28}
  //                       height={28}
  //                       alt={`${photo.albumId}'s profile picture`}
  //                     />
  //                     <p>{photo.title}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <table className="hidden min-w-full text-gray-900 md:table">
  //           <thead className="rounded-lg text-left text-sm font-normal">
  //           <tr>
  //             <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
  //               Customer
  //             </th>
  //             <th scope="col" className="px-3 py-5 font-medium">
  //               Email
  //             </th>
  //             <th scope="col" className="px-3 py-5 font-medium">
  //               Amount
  //             </th>
  //             <th scope="col" className="px-3 py-5 font-medium">
  //               Date
  //             </th>
  //             <th scope="col" className="px-3 py-5 font-medium">
  //               Status
  //             </th>
  //             <th scope="col" className="relative py-3 pl-6 pr-3">
  //               <span className="sr-only">Edit</span>
  //             </th>
  //           </tr>
  //           </thead>
  //           <tbody className="bg-white">
  //           {photos?.map((photo) => (
  //             <tr
  //               key={photo.id}
  //               className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
  //             >
  //               <td className="whitespace-nowrap py-3 pl-6 pr-3">
  //                 <div className="flex items-center gap-3">
  //                   <Image
  //                     src={photo.url}
  //                     className="rounded-full"
  //                     width={28}
  //                     height={28}
  //                     alt={`${photo.albumId}'s profile picture`}
  //                   />
  //                   <p>{photo.title}</p>
  //                 </div>
  //               </td>
  //               <td className="whitespace-nowrap px-3 py-3">
  //                 <p>{photo.albumId}</p>
  //                 {/*<InvoiceStatus status={photo.status} />*/}
  //               </td>
  //               <td className="whitespace-nowrap py-3 pl-6 pr-3">
  //                 <div className="flex justify-end gap-3">
  //                   <p>{photo.id}</p>
  //                   {/*<UpdateInvoice id={photo.id} />*/}
  //                   {/*<DeleteInvoice id={photo.id} />*/}
  //                 </div>
  //               </td>
  //             </tr>
  //           ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
}
