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

export interface BrandCartType {
  [brand: string]: CartType[];
}
