// 임시 타입
export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

// 임시 타입
export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredImage: StaticImageData | string;
}

// 임시 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: string;
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "신제품" | "리미티드 에디션" | "품절" | "50% 할인";
  rating?: string;
  numberOfReviews?: number;
  brandName?: string;
}

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
  key: string;
  productId: number;
  productDetailId: number;
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

export interface CartBrandProductsType {
  [brand: string]: CartProductType[];
}