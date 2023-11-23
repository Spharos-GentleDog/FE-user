'use client'
import React, { useEffect } from "react";
import NavigationItem from "./NavigationItem";
import { ParentCategoryType } from "@/types/product/category";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";

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
      {parentCategoryData.map((item, index) => (
        <NavigationItem key={index} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;

