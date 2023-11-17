import { GeneralProductType } from "./groupProductsByBrand";

/**
 * 할인율 적용 함수
 * @returns 상품 정보에 할인 계산 추가
 */
export const applyDiscounts = (products: GeneralProductType[]) => {
  return products.map(product => {
    /**
     * 할인율이 존재하는 경우, 할인율 계산
     */
    if (product.discountRate || product.discountRate === 0) {
      /**
       * 할인할 금액 계산, 1의 자리에서 내림
       */
      const discountAmount = Math.floor(product.price * product.discountRate * 0.01);
      /**
       * 할인된 가격 계산
       */
      const discountedPrice = product.price - discountAmount;
      return {
        ...product,
        discountedPrice,
        discountAmount
      };
    }
    return product; // 할인율이 없는 경우, 상품 정보 변경 없이 반환
  });
};


