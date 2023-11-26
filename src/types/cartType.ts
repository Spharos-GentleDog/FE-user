// 장바구니의 타입을 정의
export interface ProductCartType {
  productDetailId: number;
  count: number;
  checked: boolean;
  productInCartId: number;
}

export interface CartType {
  productDetailId: number;
  count: number;
  checked: boolean;
  productInCartId: number;
  key: string;
  productId: number;
  productName: string;
  price: number;
  imgUrl: string;
  brandName: string;
  color: string;
  size: string;
  isChecked: boolean;
  productStock: number;
  discountRate: number;
  discountType: number;
  discountAmount: number;
  discountedPrice: number;
}

export interface CartPriceType {
  originalTotalPrice: number; // 할인전 전체 가격 합계
  deliveryFee: number;
  discountTotal: number;
  totalPrice: number;
}

export interface BrandCartType {
  [brand: string]: CartType[] | CartPriceType;
}

export interface CartStockType {
  productDetailId: number;
  salesCount: number;
  displayStatus: number;
}
