export interface Payment {
    paymentKey: string
    paymentMethod: string
    paymentStatus: string
    paymentTotalAmount: number
    isPartial: boolean
    receipt_url: string
    requestedAt: string
    approvedAt: string
}

export interface PaymentByProductList {
    paymentKey: string
    venderEmail: string
    productName: string
    productCode: string
    ProductMainImageUrl: string
    productAmount: number
    count: number
}