import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import image from "@/images/logo-name.svg"


/**
 * 카테고리 별 상품 카드
 * @param name 카테고리 이름
 * @param desc 카테고리 설명
 * @param count 카테고리에 속한 상품 개수
 */
const CardCategory4: FC<any> = ({
  categoryId,
  categoryName,
  categoryProductCount,
  color = "bg-rose-50",
}: {
  categoryId: number,
  categoryName: string,
  categoryProductCount: number,
  featuredImage: string,
  color: string
}) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow`}
    >
      <div>
        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <NcImage
              alt=""
              src={image}
              containerClassName={`w-20 h-20 rounded-full overflow-hidden z-0 ${color}`}
              width={80}
              height={80}
            />
            <span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              {categoryProductCount} 개 제품들
            </span>
          </div>

          <div className="">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>{categoryName}</h2>
          </div>

          <Link
            href={"/collection"}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>카테고리 더보기</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>

      <Link href={"/collection"}></Link>
    </div>
  );
};

export default CardCategory4;
