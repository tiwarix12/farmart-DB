import { Title, Text, Card } from '@tremor/react';
import Search from './components/search';
import LoadingDots from './components/loading-dots';

export default function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Uploaded Files</Title>
      <Text>A list of files retrieved from a Postgres database.</Text>
      <Search disabled />
     <Card className='mt-6 flex justify-center items-center'>
       <LoadingDots/>
     </Card>
      <div className="tremor-base tr-relative tr-w-full tr-mx-auto tr-text-left tr-ring-1 tr-mt-6 tr-max-w-none tr-bg-white tr-shadow tr-border-blue-400 tr-ring-gray-200 tr-pl-6 tr-pr-6 tr-pt-6 tr-pb-6 tr-rounded-lg h-[360px]" />
    </main>
  );
}
