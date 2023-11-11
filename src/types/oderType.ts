export interface OrderBrandType {
  vendorId: number;
  brandName: string;
  brandLogoUrl: string;
  deliveryStatus: number;
  imageUrl: string;
  productName: string;
  totalFee: number;
  procutsCount: number;
}

export interface OrderBrandProductsType{
  productId: number;
  imgUrl: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  count: number;
  discount: number;
  discountType: number;
}

export interface OrderBrandDetailType {
  vendorId: number;
  brandName: string;
  brandLogoUrl: string;
  deliveryStatus: number;
  products:OrderBrandProductsType[]
  deliveryFee: number;
  totalFee: number;
}

export interface OrderListType {
  ordersId: number;
  createdAt: Date;
  brandProduct:OrderBrandType[]
}

export interface OrderDetailType {
  ordersId: number;
  createdAt: Date;
  orderNumber: string;
  brandProducts:OrderBrandDetailType[]
}