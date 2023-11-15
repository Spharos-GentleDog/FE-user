// @ts-nocheck
'use client'
import React, { FC, useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";
import { ProductList } from "@/types/product/productList";
import ProductCard from "@/components/ProductCard";

interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  heading?: string;
  subHeading?: string;
  category?: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading = "",
  subHeading = "",
  category = "new",
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [productData, setProductData] = useState<ProductList[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = category === "new" ? "https://653230c34d4c2e3f333dbc82.mockapi.io/product" : "https://653230c34d4c2e3f333dbc82.mockapi.io/products";
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error('Error Fetch: ', error.message);
      }
    };

    getData().then(() => {
      const OPTIONS: Partial<Glide.Options> = {
        perView: 4,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: { perView: 4 - 1 },
          1024: { gap: 20, perView: 4 - 1 },
          768: { gap: 20, perView: 4 - 2 },
          640: { gap: 20, perView: 1.5 },
          500: { gap: 20, perView: 1.3 },
        },
      };

      if (sliderRef.current) {
        const slider = new Glide(sliderRef.current, OPTIONS);
        slider.mount();
        setIsShow(true);
        return () => slider.destroy();
      }
    });

  }, [category]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {Array.isArray(productData) && productData.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
