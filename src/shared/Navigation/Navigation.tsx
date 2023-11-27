'use client'
import React, { useEffect } from "react";
import NavigationItem from "./NavigationItem";
import { ParentCategoryType } from "@/types/product/category";
import Link from "next/link";

/**
 * 네비게이션 중앙에 있는 메뉴들을 렌더링합니다.
 */
function Navigation() {
  const [parentCategoryData, setParentCategoryData] = React.useState<ParentCategoryType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        setParentCategoryData(data.result.parentCategoryDtoList);

      } catch (error) {
        console.log('Error Fetch : ', error);
      }
    }

    getData();
  }, []);

  return (
    <ul className="nc-Navigation flex items-center">
      <div className="h-20 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-2 xl:px-3 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: `/collection`,
            query: {
              categoryType: 'all',
              categoryName: '전체',
              isDiscount: false,
              page: 1
            }
          }}
        >
          전체
        </Link>
      </div>
      <div className="h-20 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-2 xl:px-3 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: `/collection`,
            query: {
              categoryType: 'new',
              categoryName: '신상',
              isDiscount: false,
              page: 1
            }
          }}
        >
          신상
        </Link>
      </div>
      {parentCategoryData.map((item, index) => (
        <NavigationItem key={index} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;

