"use client";

import React, { FC, useState } from "react";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import { ExploreType } from "./data";
import CategoryHeading from "../CategoryHeading";
import { ChildCategory } from "@/types/product/category";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
}

/**
 * 카테고리 별 상품
 * @param boxCard box4 default 가장 무난함 box1 작은 아이콘 box6 중앙 정렬
 */
const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  gridClassName = "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
}) => {


  const renderCard = (item: ChildCategory) => {
    return (
      <CardCategory4
        key={item.categoryId}
        categoryId={item.categoryId}
        categoryName={item.categoryName}
        categoryProductCount={item.categoryProductCount}
      />
    );
  };

  const [category, setCategory] = useState<ChildCategory[]>([]);

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      <CategoryHeading setCategory={setCategory} />
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {category.map((item) => renderCard(item))}
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
