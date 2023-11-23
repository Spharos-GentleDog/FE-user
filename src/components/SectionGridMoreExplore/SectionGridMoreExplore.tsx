"use client";

import React, { FC, useState } from "react";
import CardCategory4 from "@/components/CardCategories/CardCategory4";
import CategoryHeading from "../CategoryHeading";
import { ChildCategory, ChildCategoryWithProductCount } from "@/types/product/category";

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


  const renderCard = (item: ChildCategoryWithProductCount, index: number) => {
    return (
      <CardCategory4
        key={index}
        categoryId={item.childCategoryId}
        categoryName={item.childCategoryName}
        categoryProductCount={item.productCount}
      />
    );
  };

  const [category, setCategory] = useState<ChildCategoryWithProductCount[]>([]);
  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      <CategoryHeading setCategory={setCategory} />
      <div className={`grid gap-4 md:gap-7 ${gridClassName}`}>
        {
          category ?
            category.map((item, index) => renderCard(item, index))
            : null
        }
      </div>
    </div>
  );
};

export default SectionGridMoreExplore;
