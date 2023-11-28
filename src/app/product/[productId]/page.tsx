'use client';

import BagIcon from '@/components/BagIcon';
import LikeButton from '@/components/LikeButton';
import NcInputNumber from '@/components/NcInputNumber';
import NotifyAddTocart2 from '@/components/NotifyAddTocart2';
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery';
import { PRODUCTS } from '@/data/data';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import NcImage from '@/shared/NcImage/NcImage';
import { ProductDetailType } from '@/types/productType';
import { Route } from 'next';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * 상품 디테일 페이지
 */
const Product = ({}) => {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  const pathname = usePathname();
  const fetchProductId = pathname.split('/').pop();
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get('modal');
  const [variantActive, setVariantActive] = useState<string>();
  const [sizeSelected, setSizeSelected] = useState<string>();
  const [qualitySelected, setQualitySelected] = useState(1);
  const [product, setProduct] = useState<ProductDetailType>();
  const [DetailId, setDetailId] = useState<number>();

  useEffect(() => {
    // 선택된 색상과 사이즈에 일치하는 productDetailId 찾기
    const matchedDetail = product?.productDetailPageOptionsDto.find(
      (option) => option.color === variantActive && option.size === sizeSelected
    );
    setDetailId(matchedDetail && matchedDetail.productDetailId);
  }, [variantActive, sizeSelected]);

  /**
   * 상품 이미지 갤러리 모달 닫기
   */
  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete('modal');
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  /**
   * 상품 이미지 갤러리 모달 띄우기
   */
  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  /**
   * 상품 색상
   */
  const renderVariants = () => {
    if (!product?.colorDtoList || product.colorDtoList.length === 0) {
      return null;
    }

    return (
      <div>
        <label htmlFor="">
          <span className="text-sm font-medium">
            색상:
            <span className="ml-1 font-semibold">{variantActive}</span>
          </span>
        </label>
        <div className="flex mt-3">
          {product.colorDtoList.map((color, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(color.colorName)}
              className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                variantActive === color.colorName
                  ? '!border-primary-6000 !dark:border-primary-500'
                  : ''
              } ${
                color.colorCode === '#FFFFFF'
                  ? 'border-slate-200'
                  : color.colorCode === '#000000'
                  ? 'border-slate-200'
                  : ''
              }`}
            >
              <div
                className="absolute inset-0.5 rounded-full overflow-hidden z-0"
                style={{
                  backgroundColor: color.colorCode,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 상품 카트에 추가시 보여줄 상품 정보
   */
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart2
          productImage={product?.thumnailImgUrl[0].imageUrl || ''}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected || ''}
          variantActive={variantActive || ''}
          price={product?.productPrice || 0}
          name={product?.productName || ''}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: 3000 }
    );

    addCart();
  };

  // 장바구니 추가
  async function addCart() {
    try {
      console.log('DetailId', DetailId);
      console.log('product?.brandName', product?.brandName);
      console.log('qualitySelected', qualitySelected);
      const res = await fetch(`${process.env.BASE_API_URL}/api/v1/wish/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userEmail: userEmail,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productDetailId: DetailId,
          brandName: product?.brandName,
          count: qualitySelected,
        }),
      });
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 상품 사이즈 리스트
   */
  const renderSizeList = () => {
    if (!product?.sizeList || product.sizeList.length === 0) {
      return null;
    }

    return (
      <div>
        <div className="flex justify-between font-medium text-sm">
          <label htmlFor="">
            <span className="">
              사이즈:
              <span className="ml-1 font-semibold">{sizeSelected}</span>
            </span>
          </label>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {product.sizeList.map((size, index) => {
            const isActive = size === sizeSelected;
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 
                ${
                  isActive
                    ? 'bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000'
                    : 'border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
                onClick={() => setSizeSelected(size)}
              >
                {size}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /**
   * 상품 설명 사이드바 옵션, 카트에 추가, 가격
   */
  const renderSectionSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap lg:shadow-lg">
        <div className="space-y-7 lg:space-y-8">
          <div className="">
            {/* ---------- 1 HEADING ----------  */}
            <div className="flex items-center justify-between">
              <div className="hidden lg:flex text-2xl font-semibold">
                {product?.productPrice.toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}
              </div>
              <div className="flex lg:hidden text-2xl font-semibold">
                {`${(product?.productPrice !== undefined
                  ? product.productPrice * qualitySelected >= 50000
                    ? product.productPrice * qualitySelected
                    : product.productPrice * qualitySelected + 3000
                  : ''
                ).toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}`}
              </div>

              <div className="">
                <LikeButton productId={product?.productId as number} />
              </div>
            </div>

            {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
            <div className="mt-6 space-y-7 lg:space-y-8">
              <div className="">{renderVariants()}</div>
              <div className="">{renderSizeList()}</div>
            </div>
          </div>
          {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                defaultValue={qualitySelected}
                onCountChange={setQualitySelected}
              />
            </div>
            <ButtonPrimary
              className="flex-1 flex-shrink-0"
              onClick={notifyAddTocart}
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">장바구니 담기</span>
            </ButtonPrimary>
          </div>

          {/* SUM */}
          <div className="hidden sm:flex flex-col space-y-4 ">
            <div className="space-y-2.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="flex">
                  <span>{`${product?.productPrice.toLocaleString()}  `}</span>
                  <span className="mx-2">x</span>
                  <span>{`${qualitySelected} `}</span>
                </span>

                <span>
                  {`${(product?.productPrice !== undefined
                    ? product.productPrice * qualitySelected >= 50000
                      ? product.productPrice * qualitySelected
                      : product.productPrice * qualitySelected + 3000
                    : ''
                  ).toLocaleString('ko-KR', {
                    style: 'currency',
                    currency: 'KRW',
                  })}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>배송비</span>
                <span>
                  {product?.productPrice !== undefined
                    ? product.productPrice * qualitySelected >= 50000
                      ? '₩0'
                      : '₩3,000'
                    : ''}
                </span>
              </div>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex justify-between font-semibold">
              <span>합계</span>
              <span>
                {`${(product?.productPrice !== undefined
                  ? product.productPrice * qualitySelected >= 50000
                    ? product.productPrice * qualitySelected
                    : product.productPrice * qualitySelected + 3000
                  : ''
                ).toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 상품 설명 1
   * 제목, 별점, 리뷰 수, 상태 아이콘, 공유, 찜하기 버튼
   */
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          {/* todo: 상품 이름 */}
          <h2 className="text-2xl md:text-3xl font-semibold">
            {product?.productName}
          </h2>
        </div>
        {/*  */}
        <div className="block lg:hidden">{renderSectionSidebar()}</div>

        {/*  */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/*  */}
        {/* <AccordionInfo panelClassName="p-4 pt-3.5 text-slate-600 text-base dark:text-slate-300 leading-7" /> */}
      </div>
    );
  };

  /**
   * 상품 설명 2
   */
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap !border-b-0 !pb-0">
        {product?.explainImgUrl.map((item, index) => (
          <div key={index}>
            <img src={item.imageUrl} alt={item.imageName} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (!fetchProductId) {
      return;
    }
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/product/product-page?productId=${fetchProductId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setProduct(data.result);
        console.log('data', data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [fetchProductId]);

  return (
    <div className={`ListingDetailPage nc-Product`}>
      <>
        <header className="container mt-8 sm:mt-10">
          <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="min-w-[200px] min-h-[400px] md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt={product?.thumnailImgUrl[0].imageName}
                  containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                  className="object-cover rounded-md sm:rounded-xl "
                  src={product?.thumnailImgUrl[0].imageUrl || ''}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
              </div>

              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt={product?.thumnailImgUrl[1].imageName}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  src={product?.thumnailImgUrl[1].imageUrl || ''}
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              {product?.thumnailImgUrl.slice(2, 4).map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${
                    index >= 2 ? 'block' : ''
                  }`}
                  onClick={handleOpenModalImageGallery}
                >
                  <NcImage
                    alt={item.imageName}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl"
                    src={item.imageUrl}
                  />
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer" />
                </div>
              ))}
            </div>

            {/* 모달 띄우기 버튼 */}
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                모든 사진 보기
              </span>
            </div>
          </div>
        </header>
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-9 sm:mt-11 flex ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pr-14 lg:space-y-14">
          {renderSection1()}
          {renderSection2()}
        </div>

        {/* SIDEBAR */}
        <div className="flex-grow">
          <div className="hidden lg:block sticky top-28">
            {renderSectionSidebar()}
          </div>
        </div>
      </main>

      <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={
          product?.thumnailImgUrl?.map((item, index) => ({
            id: index,
            url: item.imageUrl,
          })) || []
        }
      />
    </div>
  );
};

export default Product;
