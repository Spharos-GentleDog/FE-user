"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CATS_DISCOVER } from "./CardCategories/data";

/**
 * 슬라이더 카드 
 */
const DiscoverMoreSlider = () => {
// 여기에서는 1번의 경우를 사용합니다.
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    /**
     * 글라이드 옵션
     * @param direction 방향
     * @param perView 한번에 보여줄 슬라이드 개수
     * @param gap 슬라이드 사이의 간격
     * @param bound 슬라이드의 경계를 부드럽게 만들지 여부
     * @param breakpoints 반응형 브레이크포인트
     * @see https://www.notion.so/e-genius/FE-9aa4403e2ae0478fa6fe192ebb5d8dfb
     */
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    /**
     * 슬라이더 생성
     */
    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    // 실제 DOM에 접근할 때는 ref를 사용합니다.
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider nc-p-l-container ${
        isShow ? "" : "invisible"
      }`}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText="좋은 제품들이 당신을 기다리고 있습니다."
        hasNextPrev
      >
        더 많은 제품 보기
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">
          {/* todo: 데이터 패칭 필요 */}
          {CATS_DISCOVER.map((item, index) => (
            <li key={index} className={`glide__slide`}>
              <CardCategory3
                name={item.name}
                desc={item.desc}
                featuredImage={item.featuredImage}
                color={item.color}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
