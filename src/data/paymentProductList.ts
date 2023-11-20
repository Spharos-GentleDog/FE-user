import { PaymentByProductList } from "@/types/payment/payment";

export const paymentProductList: PaymentByProductList[] = [
    {
        paymentKey: "1",
        venderEmail: "jason@gmail.com",
        productName: "product1",
        productCode: "1234",
        ProductMainImageUrl: "@/images/logo-name.svg",
        productAmount: 1000,
        count: 1
    },
    {
        paymentKey: "2",
        venderEmail: "sehi@naver.com",
        productName: "product2",
        productCode: "1234",
        ProductMainImageUrl: "@/images/logo-name.svg",
        productAmount: 2000,
        count: 2
    }
]