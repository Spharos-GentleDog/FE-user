"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { ProductList } from "@/types/product/productList";
import ProductCard from "./ProductCard";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  category?: string;
}

/**
 * 상품 이미지 카드 슬라이더
 * @param className
 * @param itemClassName
 * @param headingFontClassName 큰 글씨 폰트
 * @param headingClassName 큰 글씨 클래스
 * @param heading 큰 글씨
 * @param subHeading 작은 글씨
 * @param data 상품 데이터
 * @returns 
 */
const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "",
  category = "new",
}) => {
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(false);
  const [productData, setProductData] = useState<ProductList[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/product-find?categoryType=${category}&isDiscount=false&page=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setProductData(data.result);
    }

    getData().then(() => {
      const OPTIONS: Partial<Glide.Options> = {
        // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
        perView: 4,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: {
            perView: 4 - 1,
          },
          1024: {
            gap: 20,
            perView: 4 - 1,
          },
          768: {
            gap: 20,
            perView: 4 - 2,
          },
          640: {
            gap: 20,
            perView: 1.5,
          },
          500: {
            gap: 20,
            perView: 1.3,
          },
        },
      };
      if (!sliderRef.current) return;

      let slider = new Glide(sliderRef.current, OPTIONS);
      slider.mount();
      setIsShow(true);
      return () => {
        slider.destroy();
      };
    });

    getData();

  }, [sliderRef]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || ``}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {
              productData
                ?
                productData.map((item, index) => (
                  <li key={index} className={`glide__slide ${itemClassName}`}>
                    <ProductCard data={item} />
                  </li>
                ))
                :
                ""
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
