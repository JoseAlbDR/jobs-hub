import Image from 'next/image';
import React from 'react';
import Light from '@/assets/horizontal-black.svg';

const LightLogo = () => {
  return (
    <Image
      src={Light}
      alt="app logo"
      className="my-5 self-center block dark:hidden"
      width={250}
      height={100}
    />
  );
};

export default LightLogo;
