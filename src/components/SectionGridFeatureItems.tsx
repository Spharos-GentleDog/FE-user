'use client'

import React, { FC, useEffect, useState } from "react";
import HeaderFilterSection from "@/components/HeaderFilterSection";
import ProductCard from "@/components/ProductCard";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product, PRODUCTS } from "@/data/data";
import { ParentCategoryType } from "@/types/product/category";
import { ProductList } from "@/types/product/productList";

//
export interface SectionGridFeatureItemsProps {
  data?: Product[];
}

const SectionGridFeatureItems: FC<SectionGridFeatureItemsProps> = ({
}) => {

  const [tabActive, setTabActive] = useState(1);
  const [categoryData, setCategoryData] = useState<ParentCategoryType[]>([]);
  const [data, setData] = useState<ProductList[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const parentCategory = await res.json();
        setCategoryData(parentCategory.result.parentCategoryDtoList);

        if (parentCategory) {
          const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/product-find?categoryType=all&CategoryId=${tabActive}&isDiscount=false&page=1`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const result = await res.json();
          setData(result.result);
        }

      } catch (error) {
        console.log('Error Fetch : ', error);
      }
    }

    getData();
  }, [tabActive]);

  return (
    <div className="nc-SectionGridFeatureItems relative">
      <HeaderFilterSection categoryData={categoryData} tabActive={tabActive} setTabActive={setTabActive} />
      <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {data.map((item, index) => (
          <ProductCard data={item} key={index} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        {
          data.length >= 10
            ?
            <ButtonPrimary>더보기</ButtonPrimary>
            :
            ""
        }
      </div>
    </div>
  );
};

export default SectionGridFeatureItems;
