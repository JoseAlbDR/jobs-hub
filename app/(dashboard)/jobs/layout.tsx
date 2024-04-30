import SearchForm from '@/components/SearchForm';
import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SearchForm />
      {children}
    </>
  );
};

export default layout;
