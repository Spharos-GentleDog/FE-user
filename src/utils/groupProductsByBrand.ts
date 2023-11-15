import { CartBrandProductsType, CartProductType, Product, ProductDetailType } from '@/types/productType';

type GeneralProductType = Product | ProductDetailType | CartProductType;

/**
 * 상품을 브랜드 별로 묶어주는 함수
 * @param products value의 타입, 추가적인 타입이 필요할 수도 있음
 * @returns brandName을 key로 하는 객체
 */
export function groupProductsByBrand(products: GeneralProductType[]) {
  return products.reduce((acc, product) => {
    // 'brandName' 속성이 모든 타입에 존재한다고 가정
    const brand = 'brandName' in product ? product.brandName : undefined;
    if (brand) {
      if (!acc[brand]) {
        acc[brand] = [];
      }
      acc[brand].push(product);
    }
    return acc;
  }, {} as { [brand: string]: GeneralProductType[] });
}
