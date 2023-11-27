import React from 'react';
import { Product } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import Prices from './Prices';

/** 헤더의 장바구니 상품 렌더링 */
export default function RenderProduct3({
  item,
  index,
  close,
}: {
  item: Product;
  index: number;
  close: () => void;
}) {
  return (
    <div key={index} className="flex py-5 last:pb-0">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          fill
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain object-center"
        />
        {/* todo: 상품 디테일 이동 링크 수정*/}
        <Link
          onClick={close}
          className="absolute inset-0"
          href={'/product-detail'}
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between ">
            <div>
              <h3 className="text-base font-medium ">
                {/* todo: 상품 디테일 이동 링크 수정*/}
                <Link onClick={close} href={'/product-detail'}>
                  {item.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span>{`Natural`}</span>
                <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                <span>{'XL'}</span>
              </p>
            </div>
            <Prices price={item.price} className="mt-0.5" />
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 dark:text-slate-400">{`Qty 1`}</p>

          {/* 제거 버튼 */}
          <div className="flex">
            <button
              type="button"
              className="font-medium text-primary-6000 dark:text-primary-500 "
            >
              제거
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
