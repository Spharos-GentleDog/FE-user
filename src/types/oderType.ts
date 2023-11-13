// 주문 내역에서 브랜드와 상품의 타입
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

// 상세 주문 내역에서 모든 상품의 타입
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

// 상세 주문 내역에서 브랜드의 타입
export interface OrderBrandDetailType {
  vendorId: number;
  brandName: string;
  brandLogoUrl: string;
  deliveryStatus: number;
  products:OrderBrandProductsType[]
  deliveryFee: number;
  totalFee: number;
}

// 주문 내역의 타입
export interface OrderListType {
  ordersId: number;
  createdAt: Date;
  brandProduct:OrderBrandType[]
}

// 상세 주문 내역의 타입
export interface OrderDetailType {
  ordersId: number;
  createdAt: Date;
  orderNumber: string;
  brandProducts:OrderBrandDetailType[]
}