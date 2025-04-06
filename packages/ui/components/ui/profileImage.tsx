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
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "cover",
      }}
      className={`rounded-full ${className ?? ""}`}
      unoptimized
    />
  );
};
