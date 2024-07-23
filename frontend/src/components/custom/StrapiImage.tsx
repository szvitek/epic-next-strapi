import { getStrapiMedia } from '@/lib/utils';
import Image from 'next/image';

type StrapiImageProps = {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
};

export default function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  if (!src) return null;
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
