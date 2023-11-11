export interface ProductOptionType {
  productDetailId: number;
  color: string;
  size: string;
}

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