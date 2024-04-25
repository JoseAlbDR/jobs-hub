import Image from 'next/image';
import React from 'react';
import Dark from '@/assets/horizontal-white.svg';

const DarkLogo = () => {
  return (
    <Image
      src={Dark}
      alt="app logo"
      className="my-5 self-center hidden dark:block"
      width={250}
      height={100}
    />
  );
};

export default DarkLogo;
