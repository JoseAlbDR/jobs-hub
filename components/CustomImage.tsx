// CustomImage.tsx
import React from 'react';
import Image, { ImageProps } from 'next/image';

interface CustomImageProps extends ImageProps {
  // Puedes agregar propiedades personalizadas aquí si es necesario
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, ...rest }) => {
  return <Image src={src} alt={alt} {...rest} />;
};

export default CustomImage;
