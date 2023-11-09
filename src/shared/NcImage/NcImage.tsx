import React, { FC } from "react";
import Image, { ImageProps } from "next/image";

export interface NcImageProps extends Omit<ImageProps, "alt"> {
  containerClassName?: string;
  alt?: string;
}

/**
 * 이미지 갤러리의 이미지
 * @param containerClassName 컨테이너 클래스
 * @param alt 대체 텍스트
 * @param className 이미지 클래스
 * @param args 이미지 props
 * @returns 
 */
const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-image",
  className = "object-cover w-full h-full",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image className={className} alt={alt} {...args} />
    </div>
  );
};

export default NcImage;
