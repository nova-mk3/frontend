import Image from "next/image";

interface ProfileImageProps {
  src: string;
  size: number;
  alt?: string;
  className?: string;
}

export const ProfileImage = ({
  src,
  size,
  alt = "Profile Image",
  className,
}: ProfileImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover h-[${size}px] w-[${size}px] ${className}`}
      unoptimized
    />
  );
};
