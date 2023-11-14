import { ProductVariant } from "@/data/data";
import { StaticImageData } from "next/image";

// 상품 조회 
// export interface ProductList {
//     productId: number;
//     productName: string;
//     productPrice: number;
//     productImage: StaticImageData | string;   // 대표 이미지
//     brandName: string;
//     discountRate: number;
//     discountType: number;
//     productCode: string;
//     productReviewCount: number; // 리뷰 개수
//     productTotalRating: number;
//     categoryName: string;
//     sizeName?: string[];
//     colorName: string[];
//     productStock: number;   // 품절 여부를 판단하기 위한 재고 수량
//     createdAt: Date;    // 등록일 기준을 신상품인지 판단하기 위함
//     variants?: ProductVariant[];
//     variantType?: "color" | "image";
//     status?: "신제품" | "리미티드 에디션" | "품절" | "50% 할인";
// }

export interface ProductList {
    productId: number;
    productName: string;
    productPrice: number;
    ProductImage: string;
    brandName: string;
    discountRate: number;
    discountType: number;
    productCode: string;
    categoryName: string;
    variants?: ProductVariant[];
    variantType?: "color";
    color?: colorList[];
    sizeName?: string[];
    allOfSizes?: string[];
    // status?: "신제품" | "리미티드 에디션" | "품절" | "50% 할인";
    productReviewCount: number; // 리뷰 개수
    productTotalRating: number;
    productStock: number;   // 품절 여부를 판단하기 위한 재고 수량
}

export interface colorList {
    colorName: string;
    colorCode: string;
}