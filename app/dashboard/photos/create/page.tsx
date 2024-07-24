import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import PhotoForm from "@/app/ui/photos/create-form";

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Photos', href: '/dashboard/photos' },
          {
            label: 'Create Photo',
            href: '/dashboard/photos/create',
            active: true,
          },
        ]}
      />
      <PhotoForm photos={[]} />
    </main>
  );
}