'use client';

import React, { FC, useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import Prices from './Prices';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import toast from 'react-hot-toast';
import { Transition } from '@/app/headlessui';
import ModalQuickView from './ModalQuickView';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import NcImage from '@/shared/NcImage/NcImage';
import { ProductList } from '@/types/product/productList';
import defaultImage from '@/images/logo-name.svg';
import RenderColor from './RenderColor';
import RenderSizeList from './RenderSizeList';
import RenderGroupButtons from './RenderGroupButtons';
import { useSession } from 'next-auth/react';

export interface ProductCardProps {
  className?: string;
  data: ProductList;
  isLiked?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  className = '',
  data,
  isLiked = false,
}) => {
  const {
    productId,
    productName,
    productPrice,
    brandName,
    sizes,
    colors,
    mainImageUrl = defaultImage,
    totalFavorite,
    discounts,
    salesStatus,
  } = data || {};

  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();
  const session = useSession();

  const notifyAddTocart = ({ sizeName }: { sizeName?: string }) => {
    const handleFetchAddToCart = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_API_URL}/api/v1/product/findby-color-size`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: productId,
              color: data?.colors?.[variantActive]?.colorName,
              size: sizeName,
            }),
          }
        );

        const detail = await response.json();

        if (detail) {
          const res = await fetch(
            `${process.env.BASE_API_URL}/api/v1/wish/cart`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                userEmail: `${session.data?.user.userEmail}`,
                Authorization: `Bearer ${session.data?.user.accessToken}`,
              },
              body: JSON.stringify({
                productDetailId: detail.result.productDetailId,
                brandName: brandName,
                count: 1,
              }),
            }
          );
          const result = await res.json();
          // console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchAddToCart();

    toast.custom(
      (t) => (
        <Transition
          appear
          show={t.visible}
          className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
          enter="transition-all duration-150"
          enterFrom="opacity-0 translate-x-20"
          enterTo="opacity-100 translate-x-0"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-20"
        >
          <p className="block text-base font-semibold leading-none">
            장바구니에 추가되었습니다!
          </p>
          <div className="border-t border-slate-200 dark:border-slate-700 my-4" />
          {renderProductCartOnNotify({ sizeName })}
        </Transition>
      ),
      {
        position: 'top-right',
        id: String(productId) || 'product-detail',
        duration: 3000,
      }
    );
  };

  const renderProductCartOnNotify = ({ sizeName }: { sizeName?: string }) => {
    return (
      <div className="flex ">
        <div className="h-[120px] w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={mainImageUrl}
            alt={productName}
            placeholder='blur'
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGPIrOzOqWhbuHYvw7yNBxK9w/7/+s+g7xSiJaG+eeNBBgY2UUev6LKyZgByfxCvAnvQuAAAAABJRU5ErkJggg=="}
            className="absolute object-cover object-center"
          />
        </div>

        <div className="ms-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{productName}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {colors ? colors[variantActive].colorName : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{sizeName || 'FREE'}</span>
                </p>
              </div>
              <Prices price={productPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">수량 1</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 "
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/cart');
                }}
              >
                장바구니 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link
          href={`/product/${productId}`}
          className="absolute inset-0"
        ></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/product/${productId}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={mainImageUrl}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          <div className="absolute top-3 end-3 z-10 flex gap-1">
            <LikeButton productId={productId as number} className="" />
            {/* todo: 퀵뷰 수정 필요 */}
            {/* <ButtonSecondary
              className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-2.5"
              onClick={() => setShowModalQuickView(true)}
            >
              <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
            </ButtonSecondary> */}
          </div>
          {/* 사이즈가 존재하면 사이즈가 뜨고 아니면 addCart 버튼이 뜸 */}
          {sizes ? (
            <RenderSizeList
              sizeName={sizes}
              notifyAddTocart={notifyAddTocart}
            />
          ) : (
            <RenderGroupButtons notifyAddTocart={notifyAddTocart} />
          )}
        </div>

        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          <RenderColor
            variantActive={variantActive}
            setVariantActive={setVariantActive}
            color={colors}
          />
          <div>
            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
              {productName}
            </h2>
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
              {brandName}
            </p>
          </div>

          <div className="flex justify-between items-end ">
            <Prices price={productPrice} />
            <div className="flex items-center mb-0.5">
              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {totalFavorite}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
