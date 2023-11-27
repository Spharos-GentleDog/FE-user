'use client';

import { Popover, Transition } from '@/app/headlessui';
import Prices from '@/components/Prices';
import { Product, PRODUCTS } from '@/data/data';
import { Fragment, use, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../Icon';
import RenderProduct3 from '../RenderProduct3';
import { useSession } from 'next-auth/react';
import { CartType, ProductCartType } from '@/types/cartType';

/**
 * 드롭다운 장바구니
 */
export default function CartDropdown() {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;
  const [cartId, setCartId] = useState<ProductCartType[]>();

  // 장바구니 정보 가져오기
  useEffect(() => {
    async function loadCartId() {
      try {
        const res = await fetch(
          'https://gentledog-back.duckdns.org/api/v1/wish/cart',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error(res.statusText);

        const cartId = await res.json();
        setCartId(cartId.result.cart);
        // console.log('cartId', cartId.result.cart);
      } catch (e) {
        console.error('Failed to fetch loadCartId', e);
      }
    }

    loadCartId();
  }, []);

  /** 체크된 장바구니 물품들의 수량 */

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? '' : 'text-opacity-90'}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">
                {/* todo: 상품의 개수 표시 실제 페칭 핖요 */}
                {cartId && Object.keys(cartId).length}
              </span>
            </div>
            <Icon type="cart" />

            <Link className="block md:hidden absolute inset-0" href={'/cart'} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    <h3 className="text-xl font-semibold">장바구니</h3>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                      {/* todo: 장바구니에 들어간 제품들 패칭 */}
                      {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]].map(
                        (item, index) => (
                          <RenderProduct3
                            key={index}
                            item={item}
                            index={index}
                            close={close}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                    <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>합계</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          쿠폰과 포인트는 주문하기에서 확인하세요.
                        </span>
                      </span>
                      {/* todo: 총합을 구하는 함수 추가 */}
                      <span className="">299,005</span>
                    </p>
                    <div className="flex space-x-2 mt-5">
                      <ButtonSecondary
                        href="/cart"
                        className="flex-1 border border-slate-200 dark:border-slate-700"
                        onClick={close}
                      >
                        장바구니 보기
                      </ButtonSecondary>
                      <ButtonPrimary
                        href="/checkout"
                        onClick={close}
                        className="flex-1"
                      >
                        주문하기
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
