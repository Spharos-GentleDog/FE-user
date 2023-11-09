import img1 from "@/images/collections/1.png";
import img2 from "@/images/collections/5.png";
import img3 from "@/images/collections/4.png";
import img4 from "@/images/collections/3.png";
import { CardCategory3Props } from "./CardCategory3";

/**
 * Card categories data
 * @param name - category name
 * @param desc - category description
 * @param featuredImage - category featured image
 * @param color - category color
 */
export const CATS_DISCOVER: CardCategory3Props[] = [
  {
    name: "새로운 상품 탐색",
    desc: "최신 상품 <br /> 탑 브랜드에서 쇼핑",
    featuredImage: img1,
    color: "bg-yellow-50",
  },
  {
    name: "디지털 기프트 카드",
    desc: "선택의 <br /> 선물을 전하세요",
    featuredImage: img2,
    color: "bg-red-50",
  },
  {
    name: "세일 컬렉션",
    desc: "최대 <br /> 80% 할인",
    featuredImage: img3,
    color: "bg-blue-50",
  },
  {
    name: "세일 컬렉션",
    desc: "최대 <br /> 80% 할인",
    featuredImage: img4,
    color: "bg-green-50",
  },
];
