// 장바구니의 타입을 정의
export interface ProductCartType {
  productDetailId: number;
  count: number;
  checked: boolean;
  productInCartId: number;
}

export interface CartType {
  brandName: string;
  productId: number;
  productDetailId: number;
  productName: string;
  color: string;
  size: string;
  discountRate?: number;
  productPrice: number;
  discountedPrice?: number;
  imgUrl: string;
  imgName: string;
}

export interface CartPriceType {
  originalTotalPrice: number; // 할인전 전체 가격 합계
  deliveryFee: number;
  discountTotal: number;
  totalPrice: number;
}

export interface BrandCartType {
  [brand: string]: CartType[];
}

export interface CartIdType {
  [brand: string]: ProductCartType[];
}

export interface CartStockType {
  productDetailId: number;
  salesCount: number;
  displayStatus: number;
}

export interface BrandProductDto {
  brandName: string;
  productDetailDtoList: CartType[];
}

export interface ProductCartDto {
  brandName: string;
  productId: number;
  productDetailId: number;
  productName: string;
  color: string;
  size: string;
  discountRate?: number;
  productPrice: number;
  discountedPrice?: number;
  imgUrl: string;
  imgName: string;
  count: number;
  checked: boolean;
  productInCartId: number;
}

export interface BrandProductCartDto {
  [brand: string]: ProductCartDto[];
}

export interface CheckCartType {
  productDetailId: number;
  count: number;
  checked: boolean;
  productInCartId: number;
}

export interface DropdownCartType {
  cart: CheckCartType[];
  totalCount: number;
}
