import Image from "next/image";
import utilStyles from "../../../styles/utils.module.css";

interface ImagesProps {
  src: string;
  name: string;
  size: ImageSize;
}

export enum ImageSize {
  Small = 108,
  Medium = 144,
}

export default function ImageCircle({ src, name, size }: ImagesProps) {
  return (
    <Image
      priority
      src={src}
      className={utilStyles.borderCircle}
      height={size}
      width={size}
      alt={name}
    />
  );
}
