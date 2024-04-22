import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="grid lg:grid-cols-[250px,repeat(4,1fr)] ">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </div>
      <div className="lg:col-span-4">
        <Navbar />
        <div className="py-0 px-0 sm:px-8 lg:px-5 ">{children}</div>
      </div>
    </main>
  );
};

export default layout;
