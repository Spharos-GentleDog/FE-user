import { DeliveryOrdersInRequest, PaymentByProductList } from "@/types/payment/payment";

export const paymentProductList: PaymentByProductList[] = [
    {
        vendorEmail: "kde@gmail.com",
        productName: "바르셀로나 여행 가이드북",
        productCode: "231d8421w65c54fg2121se5",
        productMainImageUrl: "price.jpg",
        productAmount: 10000,
        count: 1
    },
    {
        vendorEmail: "ks@gmail.com",
        productName: "붉은 낙타의 행성 여행 가이드북",
        productCode: "23df1g658r4g321dg584r651s",
        productMainImageUrl: "topic.jpg",
        productAmount: 199000,
        count: 2
    },
    {
        vendorEmail: "ksh@gmail.com",
        productName: "하루 3분 네트워크",
        productCode: "3d25f1g8r4g32d1g85r43g54",
        productMainImageUrl: "contnet.jpg",
        productAmount: 5500,
        count: 6
    }
]

export const deliveryOrdersInRequest: DeliveryOrdersInRequest = {
    recipientName: "양창민",
    recipientAddress: "서울시 강남구 삼성동 123-456",
    recipientPhoneNumber: "010-1234-5678",
    entrancePassword: "1234",
    deliveryRequestMessage: "부재시 경비실에 맡겨주세요"
}

export const vendorsOrderListInRequest = [
    {
        vendorEmail: "json@gmail",
        brandName: "하루 3분 네트워크",
        brandLogoImageUrl: "logo.png",
        userEmail: "ycm@gmail.com",
        userPhoneNumber: "010-1234-5678",
        ordersRequestMessage: "부재시 경비실에 맡겨주세요",
        ordersType: 1,
        dogId: 1,
        deliveryFee: 2500,
        totalPrice: 10000,
        orderDetailList: [
            {
                productId: 1,
                productDetailId: 1,
                productName: "하루 3분 네트워크",
                productStock: 100,
                productPrice: 10000,
                productSize: "A4",
                productColor: "black",
                productOrderStatus: "ORDERS",
                productDiscountRate: 0,
                productImageUrl: "product.png",
                couponId: 1,
                couponDiscountPrice: 0
            },
            {
                productId: 2,
                productDetailId: 2,
                productName: "하루 3분 네트워크",
                productStock: 100,
                productPrice: 10000,
                productSize: "A4",
                productColor: "black",
                productOrderStatus: "ORDERS",
                productDiscountRate: 0,
                productImageUrl: "product.png",
                couponId: 1,
                couponDiscountPrice: 0
            }
        ]
    },
    {
        vendorEmail: "hwan@gmail",
        brandName: "환드라이브",
        brandLogoImageUrl: "logo.png",
        userEmail: "ycm@gmail.com",
        userPhoneNumber: "010-1234-5678",
        ordersRequestMessage: "부재시 경비실에 맡겨주세요",
        ordersType: 1,
        dogId: 1,
        deliveryFee: 3000,
        totalPrice: 58720,
        orderDetailList: [
            {
                productId: 1,
                productDetailId: 1,
                productName: "네트워크 배우기",
                productStock: 100,
                productPrice: 10000,
                productSize: "A4",
                productColor: "black",
                productOrderStatus: "ORDERS",
                productDiscountRate: 0,
                productImageUrl: "product.png",
                couponId: 1,
                couponDiscountPrice: 0
            },
            {
                productId: 2,
                productDetailId: 2,
                productName: "다이나믹 프로그래밍 배우기",
                productStock: 100,
                productPrice: 10000,
                productSize: "A4",
                productColor: "black",
                productOrderStatus: "ORDERS",
                productDiscountRate: 0,
                productImageUrl: "product.png",
                couponId: 1,
                couponDiscountPrice: 0
            }
        ]
    },
]
