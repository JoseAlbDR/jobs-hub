'use client';
import { getParamsFromUrl } from '@/utils/getParamsFromUrl';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import React from 'react';
import { Button } from './ui/button';

interface ButtonContainerProps {
  currentPage: number;
  totalPages: number;
}

const ButtonContainer = ({ currentPage, totalPages }: ButtonContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const { search, status, mode, type } = getParamsFromUrl(searchParams);

    let params = new URLSearchParams({
      search,
      status,
      mode,
      type,
      page: String(page),
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-x-2 mt-4">
      {pageButtons.map((page) => {
        return (
          <Button
            key={page}
            size="icon"
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonContainer;
