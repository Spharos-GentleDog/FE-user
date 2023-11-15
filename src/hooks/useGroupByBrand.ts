import { Product } from '@/data/data';
import { useState, useEffect } from 'react';

interface groupedProducts {
  [key: string]: Product[];
}

/**
 * 상품 데이터를 그룹별로 묶어주는 훅
 * @param brand 브랜드 이름
 * @param product
 * @returns JSON 형태의 상품 그룹 ex) { "브랜드1": [상품1, 상품2], "브랜드2": [상품3, 상품4] }
 */
export default function useGroupByBrand(products: Product[]) {
  const [groupedProducts, setGroupedProducts] = useState<groupedProducts>({});

  useEffect(() => {
    const grouped = products.reduce((acc: groupedProducts, product) => {
      const brand = product.brandName;
      if (brand) {
        if (!acc[brand]) {
          acc[brand] = [];
        }
        acc[brand].push(product);
      }
      return acc;
    }, {} as groupedProducts);
    setGroupedProducts(grouped);
  }, [products]);

  return groupedProducts;
}
