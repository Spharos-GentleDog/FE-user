import CartList from '@/components/CartList';
import Link from 'next/link';
import React from 'react';



export default async function CartPage() {
  return (
    <div className="nc-CartPage">
      <main className="container py-16 md:pb-28 md:pt-20 ">
        <div className="hidden md:block mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold ">
            장바구니
          </h2>
          {/* todo: 페이지 뎁스 표시 수정? */}
          <div className="mt-5 text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={'/'} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1.5">/</span>
            <Link href={'/collection'} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1.5">/</span>
            <span className="underline">Cart</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        {/* todo: 상품 선택 체크박스, 브랜드 별로 체크박스, 삭제버튼 추가 */}
        <div className="flex flex-col md:flex-row">
            <CartList /> 
        </div>
      </main>
    </div>
  );
}
