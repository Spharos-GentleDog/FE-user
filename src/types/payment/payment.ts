export interface Payment {
    paymentKey: string
    method: string
    status: string
    totalAmount: number
    isPartialCancelable: boolean
    receipt: string
    requestedAt: string
    approvedAt: string
    easyPay: {
        provider: string
    }
}

export interface receipt {
    url: string
}

export interface PaymentByProductList {
    vendorEmail: string
    productName: string
    productCode: string
    productMainImageUrl: string
    productAmount: number
    count: number
}

// 주문 생성
export interface DeliveryOrdersInRequest {
    recipientName: string,
    recipientAddress: string,
    recipientPhoneNumber: string,
    entrancePassword: string,
    deliveryRequestMessage: string
}

export interface vendorsOrderListInRequest {
    vendorEmail: string,
    brandName: string,
    brandLogoImageUrl: string,
    userName: string,
    userPhoneNumber: string,
    ordersRequestMessage: string,
    ordersType: number,
    dogId: number,
    deliveryFee: number,
    totalPrice: number,
    orderDetailList: orderDetailList[]
}

export interface orderDetailList {
    productId: number,
    productDetailId: number,
    productName: string,
    productStock: number,
    productPrice: number,
    productSize: string,
    productColor: string,
    productOrderStatus: string,
    productDiscountRate: number,
    productImageUrl: string,
    couponId: number,
    couponDiscountPrice: number
}