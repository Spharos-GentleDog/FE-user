'use client'
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= imagePaths.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= imagePaths.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return imagePaths.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };

  const imagePaths = [
    '/assets/images/icons/banner01.png',
    '/assets/images/icons/banner02.png',
    // '/assets/images/icons/banner01.png',
    // Add more image paths as needed
  ];

  const mobileImagePaths = [
    '/assets/images/icons/mobilebanner01.png',
    '/assets/images/icons/mobilebanner01.png'
  ];

  const renderItem = () => {
    const item = imagePaths[indexActive];
    const mobileItem = mobileImagePaths[indexActive];
    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
      >
        <Prev
          className="absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />

        <div className="h-auto bg-black hidden md:block overflow-hidden object-cover"
          // style={{
          //   backgroundImage: `url(${item})`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          //   backgroundRepeat: 'no-repeat'
          // }}
        >
          <Image
            width={1920}
            height={1080}
            src={item}
            alt={`Image ${indexActive + 1}`}
            placeholder="blur"
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGPIrOzOqWhbuHYvw7yNBxK9w/7/+s+g7xSiJaG+eeNBBgY2UUev6LKyZgByfxCvAnvQuAAAAABJRU5ErkJggg=="}  
          />
        </div>

        <div className="h-auto max-h-[1024px] bg-black block md:hidden overflow-hidden object-contain">
          <Image
            width={1920}
            height={1080}
            src={mobileItem}
            alt={`Image ${indexActive + 1}`}
            placeholder="blur"
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGPIrOzOqWhbuHYvw7yNBxK9w/7/+s+g7xSiJaG+eeNBBgY2UUev6LKyZgByfxCvAnvQuAAAAABJRU5ErkJggg=="}  
          />
        </div>
      </div>

    );
  };


  return <>{renderItem()}</>;
};

export default SectionHero2;
