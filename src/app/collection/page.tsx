'use client'

import React, { useEffect, useState } from "react";
import Pagination from "@/shared/Pagination/Pagination";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import TabFilters from "@/components/TabFilters";
import { useSearchParams } from "next/navigation";
import { ProductList } from "@/types/product/productList";

const PageCollection = () => {
  const [productDatas, setProductDatas] = useState<ProductList[]>([]); // [
  const param = useSearchParams();
  const categoryTypeParam = param.get('categoryType');
  const categoryIdParam = param.get('categoryId');
  const isDiscountParam = param.get('isDiscount');
  const pageParam = param.get('page');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/product-find?categoryType=${categoryTypeParam}&${categoryIdParam ? `CategoryId=${categoryIdParam}` : ""}&isDiscount=${isDiscountParam}&page=${pageParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      console.log("data : ", data);
      setProductDatas(data.result);
    }

    getData();
  }, [])


  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {productDatas.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <Pagination />
              <ButtonPrimary loading>Show me more</ButtonPrimary>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
