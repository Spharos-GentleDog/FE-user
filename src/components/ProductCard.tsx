'use client';

import React, { FC, useState } from 'react';
import LikeButton from './LikeButton';
import Prices from './Prices';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import BagIcon from './BagIcon';
import toast from 'react-hot-toast';
import { Transition } from '@/app/headlessui';
import ModalQuickView from './ModalQuickView';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import NcImage from '@/shared/NcImage/NcImage';
import { ProductList } from '@/types/product/productList';
import defaultImage from '@/images/logo-name.svg';
import { DEMO_VARIANT_COLORS } from '@/data/data';

export interface ProductCardProps {
  className?: string;
  data?: ProductList;
  isLiked?: boolean;
}

/**
 * 상품 이미지 카드
 * @returns 
 */
const ProductCard: FC<ProductCardProps> = ({
  className = '',
  data,
  isLiked,
}) => {
  const {
    productName,
    productPrice,
    brandName,
    sizeName,
    color,
    variants = DEMO_VARIANT_COLORS,
    variantType = 'color',
    // status,
    ProductImage = defaultImage,
    productCode,
    productTotalRating,
    productReviewCount,
    productId,
    productStock,
  } = data || {};
  console.log(color)
  const [variantActive, setVariantActive] = useState(0);
  const [showModalQuickView, setShowModalQuickView] = useState(false);
  const router = useRouter();
  /**
   * 카트에 상품을 추가시 알림
   * @param param0
   */
  const notifyAddTocart = ({ sizeName }: { sizeName?: string }) => {
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
        id: String(productCode) || 'product-detail',
        duration: 3000,
      }
    );
  };

  /**
   * 상품을 카트에 추가시 알림
   * @param size 상품 사이즈
   * @param variant 상품 색상
   * @param quantity 상품 수량
   * @param image 상품 이미지
   * @param name 상품 이름
   * @param price 상품 가격
   * @param id 상품 아이디
   * @param slug 상품 슬러그
   * @param rating 상품 평점
   * @param numberOfReviews 상품 리뷰 수
   * @param description 상품 설명
   * @param variants 상품 변형
   * @param variantType 상품 변형 타입
   * @param status 상품 상태
   * @param isLiked 상품 좋아요 여부
   * @param className 상품 클래스
   * @param data 상품 데이터
   * @param isShow 상품 보이기 여부
   * @param setShowModalQuickView 상품 모달 보이기 여부
   * @param setVariantActive 상품 변형 활성화
   * @param showModalQuickView 상품 모달 보이기 여부
   * @param sizes 상품 사이즈
   * @param router 상품 라우터
   * @param notifyAddTocart 상품 알림
   * @param renderProductCartOnNotify 상품 알림 렌더링
   * @param getBorderClass 상품 외곽선 색상
   * @param renderVariants 상품 변형 렌더링
   * @param renderGroupButtons 상품 그룹 버튼 렌더링
   * @param renderSizeList 상품 사이즈 리스트 렌더링
   * @returns
   */
  const renderProductCartOnNotify = ({ sizeName }: { sizeName?: string }) => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            width={80}
            height={96}
            src={ProductImage || ""}
            alt={productName || ""}
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
                    {variants ? variants[variantActive].name : `Natural`}
                  </span>
                  <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{sizeName || 'XL'}</span>
                </p>
              </div>
              <Prices price={productPrice} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">재고 1</p>

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

  /**
   * @param Bgclass 외곽선 색상
   */
  const getBorderClass = (Bgclass = '') => {
    if (Bgclass.includes('red')) {
      return 'border-red-500';
    }
    if (Bgclass.includes('violet')) {
      return 'border-violet-500';
    }
    if (Bgclass.includes('orange')) {
      return 'border-orange-500';
    }
    if (Bgclass.includes('green')) {
      return 'border-green-500';
    }
    if (Bgclass.includes('blue')) {
      return 'border-blue-500';
    }
    if (Bgclass.includes('sky')) {
      return 'border-sky-500';
    }
    if (Bgclass.includes('yellow')) {
      return 'border-yellow-500';
    }
    if (Bgclass.includes('white')) {
      return 'border-white';
    }
    if (Bgclass.includes('black')) {
      return 'border-black';
    }
    return 'border-transparent';
  };

  /**
   * 상품의 색상 정보 렌더링, 클릭시 상품의 색상 정보를 변경
   * @returns
   */
  const renderVariants = () => {
    if (!variants || !variants.length || !variantType) {
      return null;
    }

    if (variantType === 'color') {
      return (
        <div className="flex space-x-1">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
                ? getBorderClass(variant.name)
                : 'border-transparent'
                }`}
              title={variant.name}
            >
              <div
                className={`absolute inset-0.5 rounded-full z-0 ${variant.color}`}
              ></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex ">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setVariantActive(index)}
            className={`relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
              ? 'border-black dark:border-slate-300'
              : 'border-transparent'
              }`}
            title={variant.name}
          >
            <div
              className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
              style={{
                backgroundImage: `url(${
                  // @ts-ignore
                  typeof variant.thumbnail?.src === 'string'
                    ? // @ts-ignore
                    variant.thumbnail?.src
                    : typeof variant.thumbnail === 'string'
                      ? variant.thumbnail
                      : ''
                  })`,
              }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  /** 상품을 카트에 추가하는 버튼 렌더링
   * @returns
   */
  const renderGroupButtons = () => {
    return (
      <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <ButtonPrimary
          className="shadow-lg"
          fontSize="text-xs"
          sizeClass="py-2 px-4"
          onClick={() => notifyAddTocart({ sizeName: 'XL' })}
        >
          <BagIcon className="w-3.5 h-3.5 mb-0.5" />
          <span className="ms-1">장바구니 추가</span>
        </ButtonPrimary>
      </div>
    );
  };

  /** 상품 사이즈 리스트 렌더링
   * @param size 상품 사이즈
   * @returns
   */
  const renderSizeList = () => {
    if (!sizeName || !sizeName.length) {
      return null;
    }

    return (
      <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
        {sizeName.map((sizeName, index) => {
          return (
            <div
              key={index}
              className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
              onClick={() => notifyAddTocart({ sizeName })}
            >
              {sizeName}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
      >
        <Link href={`/product/${productCode}`} className="absolute inset-0"></Link>

        <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
          <Link href={`/product/${productCode}`} className="block">
            <NcImage
              containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
              src={ProductImage}
              className="object-cover w-full h-full drop-shadow-xl"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
              alt="product"
            />
          </Link>
          {/* <ProductStatus status={status} /> */}
          <div className="absolute top-3 end-3 z-10 flex gap-1">
            {/* todo: like button data fetch */}
            <LikeButton liked={isLiked} className="" />
            <ButtonSecondary
              className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
              fontSize="text-xs"
              sizeClass="py-2 px-2.5"
              onClick={() => setShowModalQuickView(true)}
            >
              <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
              {/* <span className="ms-1">Quick view</span> */}
            </ButtonSecondary>
          </div>
          {/* 사이즈가 존재하면 사이즈가 뜨고 아니면 addCart 버튼이 뜸 */}
          {sizeName ? renderSizeList() : renderGroupButtons()}
        </div>

        {/* 이름과 설명 */}
        <div className="space-y-4 px-2.5 pt-5 pb-2.5">
          {renderVariants()}
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
                {productTotalRating || ''} ({productReviewCount || 0} 후기)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICKVIEW */}
      <ModalQuickView
        show={showModalQuickView}
        onCloseModalQuickView={() => setShowModalQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
