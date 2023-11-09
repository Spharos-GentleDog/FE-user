import React from "react";
import logoImg from '@/images/logo.svg'
import logoDarkImg from '@/images/logo-dark.svg'
import logoFootImg from '@/images/footprint.svg'
import logoFootDarkImg from '@/images/footprint-dark.svg'
import logoNameImg from '@/images/logo-name.svg'
import Image from "next/image";

export interface LogoProps {
  img?: string;
  imgDark?: string;
  className?: string;
  isFootprint?: boolean;
  isLogoName?: boolean;
  footimg?: string;
  footimgDark?: string;
  LogoName?: string;
  LogoNameDark?: string;
}

/**
 * 
 * @param isFootprint 발바닥 로고
 * @param isLogoName 이름 붙은 로고
 * @returns 로고를 렌더링합니다. SSR
 */
const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgDark = logoDarkImg,
  footimg = logoFootImg,
  footimgDark = logoFootDarkImg,
  className,
  isFootprint = false,
  isLogoName = false,
  LogoName = logoNameImg,
  LogoNameDark = logoNameImg,
}) => {
  if (isFootprint) {
    return (
      <>
        {footimg ? (
          <Image
            className={`block h-8 sm:h-10 w-auto ${footimgDark ? "dark:hidden" : ""}`}
            src={footimg}
            alt="Logo"
            sizes="200px"
            priority
          />
        ) : (
          "Logo Here"
        )}
        {footimgDark && (
          <Image
            className={`hidden h-8 sm:h-10 w-auto dark:block`}
            src={footimgDark}
            alt="Logo-Light"
            sizes="200px"
            priority
          />
        )}
      </>
    );
  } else if (isLogoName) {
    return (
      <>
        {LogoName ? (
          <Image
            className={`block ${className} w-auto ${LogoNameDark ? "dark:hidden" : ""}`}
            src={LogoName}
            alt="Logo"
            sizes="200px"
            priority
          />
        ) : (
          "Logo Here"
        )}
        {LogoNameDark && (
          <Image
            className={`hidden ${className} w-auto dark:block`}
            src={LogoNameDark}
            alt="Logo-Light"
            sizes="200px"
            priority
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {img ? (
          <Image
            className={`block ${className} sm:h-10 w-auto ${imgDark ? "dark:hidden" : ""}`}
            src={img}
            alt="Logo"
            sizes="200px"
            priority
          />
        ) : (
          "Logo Here"
        )}
        {imgDark && (
          <Image
            className={`hidden ${className} sm:h-10 w-auto dark:block`}
            src={imgDark}
            alt="Logo-Light"
            sizes="200px"
            priority
          />
        )}
      </>
    );
  }
};

export default Logo;