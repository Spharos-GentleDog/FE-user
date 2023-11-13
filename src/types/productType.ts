// 상품 옵션 타입
export interface ProductOptionType {
  productDetailId: number;
  color: string;
  size: string;
}

// 상품 세부 정보 타입
export interface ProductDetailType {
  productId: number;
  productName: string;
  price: number;
  imgUrl: string[];
  explainImgUrl: string[];
  brandName: string;
  brandLogoUrl: string;
  discount: number;
  discountType: number;
  option: ProductOptionType[];
  totalFavorite: number;
  productStock: number;
}

// 장바구니 상품 정보 타입
export interface CartProductType {
  productId: number;
  productName: string;
  price: number;
  imgUrl: string;
  brandName: string;
  color: string;
  size: string;
  count: number;
  isChecked: boolean;
  productStock: number;
  discount: number;
  discountType: number;
}