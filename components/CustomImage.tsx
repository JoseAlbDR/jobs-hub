// CustomImage.tsx
import React from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...rest }) => {
  return <Image src={src} alt={alt} {...rest} />;
};

export default CustomImage;
