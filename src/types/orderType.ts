export interface OrderDetailListType {
  productId: number;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  productSize: string;
  productColor: string;
  productStock: number;
  productDiscountRate: number;
  couponId: number;
  couponDiscountPrice: number;
}
export interface OrderListType {
  groupId: number;
  orderNumber: string;
  brandName: string;
  brandLogoImageUrl: string;
  vendorEmail: string;
  totalPrice: number;
  productNameAndTotalCount: string;
  vendorsOrderListStatus: string;
  vendorsOrderListStatusDescription: string;
  createdAt: Date;
  orderDetailList: OrderDetailListType[];
}

export interface OrderListProps {
  orders: OrderListType[];
}
