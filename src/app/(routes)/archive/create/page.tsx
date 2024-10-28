import { CreateArchiveForm } from './components/create-archive-form';
import { FormStatus } from './components/form-status';
import MobileNotification from './components/mobile-notification';
import { ArchiveFormProvider } from './hooks/use-create-archive-form';

interface PageProps {
  searchParams: { v?: string };
}

const Page = ({ searchParams }: PageProps) => {
  return (
    <>
      <ArchiveFormProvider>
        <main className="flex items-start gap-6 mobile:hidden">
          <CreateArchiveForm className="h-[650px] w-[486px]" />
          <FormStatus
            className="mb-4 h-full w-[690px]"
            version={searchParams?.v}
          />
        </main>
      </ArchiveFormProvider>
      <MobileNotification />
    </>
  );
};

export default Page;
