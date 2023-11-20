import { productImgs } from "@/contains/fakeData";
import productVariantImg2 from "@/images/products/v2.jpg";
import productVariantImg3 from "@/images/products/v3.jpg";
import productVariantImg4 from "@/images/products/v4.jpg";
import productVariantImg5 from "@/images/products/v5.jpg";
import productVariantImg6 from "@/images/products/v6.jpg";
//
import productSport1 from "@/images/products/sport-1.png";
import productSport2 from "@/images/products/sport-2.png";
import productSport3 from "@/images/products/sport-3.png";
import productSport4 from "@/images/products/sport-4.png";
import productSport5 from "@/images/products/sport-5.png";
import productSport6 from "@/images/products/sport-6.png";
import productSport7 from "@/images/products/sport-7.png";
import productSport8 from "@/images/products/sport-8.png";
import { StaticImageData } from "next/image";

//

export interface ProductVariant {
  id: number;
  name: string;
  thumbnail?: StaticImageData | string;
  color?: string;
  featuredImage: StaticImageData | string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData | string;
  description: string;
  category: string;
  tags: string[];
  link: string; // todo: 수정 필요?
  variants?: ProductVariant[];
  variantType?: "color" | "image";
  sizes?: string[];
  allOfSizes?: string[];
  status?: "신제품" | "리미티드 에디션" | "품절" | "50% 할인";
  rating?: string;
  numberOfReviews?: number;
  brandName?: string;
}

export interface Product2 {
  productId: number;
  productName: string;
  productPrice: number;
  ProductImage: StaticImageData | string;
  brandName: string;
  discountRate: number;
  discountType: number;
  productCode: string;
  categoryName: string;
  variants?: ProductVariant[];
  variantType?: "color";
  colorName?: string[];
  sizeName?: string[];
  allOfSizes?: string[];
  // status?: "신제품" | "리미티드 에디션" | "품절" | "50% 할인";
  productReviewCount: number; // 리뷰 개수
  productTotalRating: number;
  productStock: number;   // 품절 여부를 판단하기 위한 재고 수량
}


const DEMO_VARIANTS: ProductVariant[] = [
  {
    id: 1,
    name: "Black",
    thumbnail: productVariantImg6,
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "White",
    thumbnail: productVariantImg2,
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    thumbnail: productVariantImg3,
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    thumbnail: productVariantImg4,
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Natural",
    thumbnail: productVariantImg5,
    featuredImage: productImgs[4],
  },
];
/**
 * Fake data
 * 컬러별로 이미지가 다른 경우
 */
export const DEMO_VARIANT_COLORS: ProductVariant[] = [
  {
    id: 1,
    name: "Violet",
    color: "bg-violet-400",
    featuredImage: productImgs[0],
  },
  {
    id: 2,
    name: "Yellow",
    color: "bg-yellow-400",
    featuredImage: productImgs[1],
  },
  {
    id: 3,
    name: "Orange",
    color: "bg-orange-400",
    featuredImage: productImgs[2],
  },
  {
    id: 4,
    name: "Sky Blue",
    color: "bg-sky-400",
    featuredImage: productImgs[3],
  },
  {
    id: 5,
    name: "Green",
    color: "bg-green-400",
    featuredImage: productImgs[4],
  },
];

/**
 * Fake data
 * TODO: Replace with real data
 * @type {Product[]}
 * @param {number} id - Product id
 * @param {string} name - Product name
 * @param {number} price - Product price
 * @param {string} image - Product image
 * @param {string} description - Product description
 * @param {string} category - Product category
 * @param {string[]} tags - Product tags
 * @param {string} link - Product link
 * @param {ProductVariant[]} variants - Product variants
 * @param {string} variantType - Product variant type
 * @param {string[]} sizes - Product sizes
 * @param {string[]} allOfSizes - Product all of sizes
 * @param {string} status - Product status
 * @param {string} rating - Product rating
 * @param {number} numberOfReviews - Product number of reviews
 * @returns {Product[]}
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "레이 나일론 백팩",
    description: "갈색 바퀴벌레 날개",
    price: 12315325,
    image: productImgs[16],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "신제품",
    rating: "4.4",
    numberOfReviews: 98,
  },
  {
    id: 2,
    name: '1" 벨트',
    description: "클래식 그린",
    price: 132513251325,
    image: productImgs[1],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% 할인",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    name: "와플 니트 비니",
    description: "뉴 블루 아쿠아",
    price: 132512351325,
    image: productImgs[15],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    name: "여행용 반려동물 캐리어",
    description: "다크 핑크 2023",
    price: 573463546,
    image: productImgs[3],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "품절",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    name: "가죽 장갑",
    description: "퍼펙트 민트 그린",
    price: 465746574,
    image: productImgs[4],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    name: "후디 스웨트셔츠",
    description: "2023년 뉴디자인",
    price: 46574567,
    image: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    name: "울 캐시미어 재킷",
    description: "매트 블랙",
    price: 467456745,
    image: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "신제품",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    name: "엘라 가죽 토트백",
    description: "크림 핑크",
    price: 4657567,
    image: productImgs[7],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "리미티드 에디션",
    rating: "4.9",
    numberOfReviews: 98,
  },
];

/**
 * todo: replace with real data
 * @param id - Product id
 * @param name - Product name
 * @param price - Product price
 * @param image - Product image
 * @param description - Product description
 * @param category - Product category
 * @param tags - Product tags
 * @param link - Product link
 * @param variants - Product variants
 * @param variantType - Product variant type
 * @param sizes - Product sizes
 * @param allOfSizes - Product all of sizes
 * @param status - Product status
 * @param rating - Product rating
 * @param numberOfReviews - Product number of reviews
 */
export const SPORT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "마스터마인드 장난감",
    description: "갈색 바퀴벌레 날개",
    price: 345654,
    image: productSport1,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "신제품",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 2,
    name: "어린이 줄넘기",
    description: "클래식 그린",
    price: 546546,
    image: productSport2,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% 할인",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 3,
    name: "티볼 비니",
    description: "뉴 블루 아쿠아",
    price: 456546,
    image: productSport3,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product-detail/",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 4,
    name: "러버 탁구",
    description: "다크 핑크 2023",
    price: 45645654,
    image: productSport4,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product-detail/",
    status: "품절",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 5,
    name: "클래식 블루 럭비",
    description: "완벽한 민트 그린",
    price: 546546,
    image: productSport5,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 6,
    name: "맨하탄 장난감 WRT",
    description: "2023년 뉴 디자인",
    price: 678678,
    image: productSport6,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product-detail/",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 7,
    name: "탁상용 축구",
    description: "매트 블랙",
    price: 35683,
    image: productSport7,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product-detail/",
    status: "신제품",
    rating: "4.9",
    numberOfReviews: 98,
  },
  {
    id: 8,
    name: "PVC 캐칭 장난감",
    description: "크림 핑크",
    price: 356865,
    image: productSport8,
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product-detail/",
    status: "리미티드 에디션",
    rating: "4.9",
    numberOfReviews: 98,
  },
];

export const BRAND_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "레이 나일론 백팩",
    description: "갈색 바퀴벌레 날개",
    price: 12315325,
    image: productImgs[16],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product/1",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    status: "신제품",
    rating: "4.4",
    numberOfReviews: 98,
    brandName: "Nike",
  },
  {
    id: 2,
    name: '1" 벨트',
    description: "클래식 그린",
    price: 132513251325,
    image: productImgs[1],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product/1",
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    status: "50% 할인",
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "Nike",
  },
  {
    id: 3,
    name: "와플 니트 비니",
    description: "뉴 블루 아쿠아",
    price: 132512351325,
    image: productImgs[15],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    link: "/product/1",
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["S", "M", "L", "XL"],
    allOfSizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "Nike",
  },
  {
    id: 4,
    name: "여행용 반려동물 캐리어",
    description: "다크 핑크 2023",
    price: 573463546,
    image: productImgs[3],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANT_COLORS,
    variantType: "color",
    link: "/product/1",
    status: "품절",
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "Nike",
  },
  {
    id: 5,
    name: "가죽 장갑",
    description: "퍼펙트 민트 그린",
    price: 465746574,
    image: productImgs[4],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    sizes: ["XS", "S", "M", "L", "XL"],
    allOfSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    link: "/product/1",
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "zara",
  },
  {
    id: 6,
    name: "후디 스웨트셔츠",
    description: "2023년 뉴디자인",
    price: 46574567,
    image: productImgs[5],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variantType: "color",
    variants: DEMO_VARIANT_COLORS,
    link: "/product/1",
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "zara",
  },
  {
    id: 7,
    name: "울 캐시미어 재킷",
    description: "매트 블랙",
    price: 467456745,
    image: productImgs[8],
    category: "Category 1",
    tags: ["tag1", "tag2"],
    variants: DEMO_VARIANTS,
    variantType: "image",
    link: "/product/1",
    status: "신제품",
    rating: "4.9",
    numberOfReviews: 98,
    brandName: "zara",
  },
];