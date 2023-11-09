import { StaticImageData } from "next/image";
import explore1Svg from "@/images/collections/explore1.svg";
import explore2Svg from "@/images/collections/explore2.svg";
import explore3Svg from "@/images/collections/explore3.svg";
import explore4Svg from "@/images/collections/explore4.svg";
import explore5Svg from "@/images/collections/explore5.svg";
import explore6Svg from "@/images/collections/explore6.svg";
import explore7Svg from "@/images/collections/explore7.svg";
import explore8Svg from "@/images/collections/explore8.svg";
import explore9Svg from "@/images/collections/explore9.svg";
//
import explore1Png from "@/images/collections/explore1.png";
import explore2Png from "@/images/collections/explore2.png";
import explore3Png from "@/images/collections/explore3.png";
import explore4Png from "@/images/collections/explore4.png";
import explore5Png from "@/images/collections/explore5.png";
import explore6Png from "@/images/collections/explore6.png";
import explore7Png from "@/images/collections/explore7.png";
import explore8Png from "@/images/collections/explore8.png";
import explore9Png from "@/images/collections/explore9.png";

export interface ExploreType {
  id: number;
  name: string;
  desc: string;
  image: string | StaticImageData;
  svgBg: string;
  color?: string;
  count?: number;
}

export const DEMO_MORE_EXPLORE_DATA_2: ExploreType[] = [
  {
    id: 4,
    name: "사이클링 셔츠",
    desc: "제조사",
    image: explore9Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
  },
  {
    id: 5,
    name: "사이클링 저지",
    desc: "제조사",
    image: explore5Png,
    svgBg: explore5Svg,
    color: "bg-blue-50",
    count: 222,
  },
  {
    id: 6,
    name: "카 코트",
    desc: "제조사",
    image: explore6Png,
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 155,
  },
  {
    id: 7,
    name: "선글라스",
    desc: "제조사",
    image: explore7Png,
    svgBg: explore7Svg,
    color: "bg-stone-100",
    count: 98,
  },
  {
    id: 8,
    name: "아동용 모자",
    desc: "제조사",
    image: explore8Png,
    svgBg: explore8Svg,
    color: "bg-blue-50",
    count: 33,
  },
  {
    id: 9,
    name: "울 재킷",
    desc: "제조사",
    image: explore4Png,
    svgBg: explore4Svg,
    color: "bg-slate-100/80",
    count: 122,
  },
];
export const DEMO_MORE_EXPLORE_DATA: ExploreType[] = [
  {
    id: 1,
    name: "백팩",
    desc: "제조사",
    image: explore1Png,
    svgBg: explore1Svg,
    color: "bg-indigo-50",
    count: 155,
  },
  {
    id: 2,
    name: "신발",
    desc: "제조사",
    image: explore2Png,
    svgBg: explore2Svg,
    color: "bg-slate-100/80",
    count: 22,
  },
  {
    id: 3,
    name: "리사이클",
    desc: "제조사",
    image: explore3Png,
    svgBg: explore3Svg,
    color: "bg-violet-50",
    count: 144,
  },
  {
    id: 4,
    name: "사이클링",
    desc: "제조사",
    image: explore9Png,
    svgBg: explore9Svg,
    color: "bg-orange-50",
    count: 343,
  },
  {
    id: 5,
    name: "사이클링 저지",
    desc: "제조사",
    image: explore5Png,
    svgBg: explore5Svg,
    color: "bg-blue-50",
    count: 222,
  },
  {
    id: 6,
    name: "카 코트",
    desc: "제조사",
    image: explore6Png,
    svgBg: explore6Svg,
    color: "bg-orange-50",
    count: 155,
  },
];
