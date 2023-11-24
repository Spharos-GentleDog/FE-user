'use client';

import React, { useState } from 'react';
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import NcImage from '@/shared/NcImage/NcImage';
import ReviewItem from '@/components/ReviewItem';
import detail21JPG from '@/images/products/detail3-1.webp';
import detail22JPG from '@/images/products/detail3-2.webp';
import detail23JPG from '@/images/products/detail3-3.webp';
import detail24JPG from '@/images/products/detail3-4.webp';
import { PRODUCTS } from '@/data/data';
import IconDiscount from '@/components/IconDiscount';
import NcInputNumber from '@/components/NcInputNumber';
import BagIcon from '@/components/BagIcon';
import toast from 'react-hot-toast';
import { StarIcon } from '@heroicons/react/24/solid';
import SectionSliderProductCard from '@/components/SectionSliderProductCard';
import NotifyAddTocart from '@/components/NotifyAddTocart';
import Image, { StaticImageData } from 'next/image';
import LikeSaveBtns from '@/components/LikeSaveBtns';
import AccordionInfo from '@/components/AccordionInfo';
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Route } from 'next';
import ModalViewAllReviews from '@/app/product-detail/ModalViewAllReviews';
import Policy from '@/app/product-detail/Policy';
import detail0 from '@/images/products/t0.png';
import detail1 from '@/images/products/t1.png';
import detail2 from '@/images/products/t2.png';
import detail3 from '@/images/products/t3.png';
import detail4 from '@/images/products/t4.png';
import detail5 from '@/images/products/t5.png';
import detail6 from '@/images/products/t6.png';
import detail7 from '@/images/products/t7.png';
import detail8 from '@/images/products/t8.png';
import detail9 from '@/images/products/t9.png';
import p1 from '@/images/products/p1.png';
import p2 from '@/images/products/p2.png';
import p3 from '@/images/products/p3.png';
import LikeButton from '@/components/LikeButton';

/**
 * 상품 상세 이미지 더미 데이터
 */
const LIST_IMAGES_PRODUCT_DETAIL: (string | StaticImageData)[] = [p1, p2, p3];

/**
 * 상품 이미지 데이터
 * todo: 데이터 패칭 필요
 */
const LIST_IMAGES_GALLERY_DEMO: (string | StaticImageData)[] = [
  // detail21JPG,
  // detail22JPG,
  // detail23JPG,
  // detail24JPG,
  // 'https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/1127000/pexels-photo-1127000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/1778412/pexels-photo-1778412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/871494/pexels-photo-871494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // 'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  detail0,
  detail1,
  detail2,
  detail3,
  detail4,
  detail5,
  detail6,
  detail7,
  detail8,
  detail9,
];
/**
 * todo: 데이터 패칭 필요
 */
const PRICE = 108000;

/**
 * 상품 디테일 페이지
 */
const Product = ({}) => {
  const { sizes, variants, status, allOfSizes, image } = PRODUCTS[0];
  //
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get('modal');
  //
  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : '');
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

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
    if (!variants || !variants.length) {
      return null;
    }

    return (
      <div>
        <label htmlFor="">
          <span className="text-sm font-medium">
            색상:
            <span className="ml-1 font-semibold">
              {variants[variantActive].name}
            </span>
          </span>
        </label>
        <div className="flex mt-3">
          {variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => setVariantActive(index)}
              className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                variantActive === index
                  ? 'border-primary-6000 dark:border-primary-500'
                  : 'border-transparent'
              }`}
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
      </div>
    );
  };

  /**
   * 상품 카트에 추가시 보여줄 상품 정보
   */
  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={image}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: 'top-right', id: 'nc-product-notify', duration: 3000 }
    );
  };

  /**
   * 상품 사이즈 리스트
   */
  const renderSizeList = () => {
    if (!allOfSizes || !sizes || !sizes.length) {
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="##"
            className="text-primary-6000 hover:text-primary-500"
          >
            사이즈 보기
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {allOfSizes.map((size, index) => {
            const isActive = size === sizeSelected;
            const sizeOutStock = !sizes.includes(size);
            return (
              <div
                key={index}
                className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center 
                text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${
                  sizeOutStock
                    ? 'text-opacity-20 dark:text-opacity-20 cursor-not-allowed'
                    : 'cursor-pointer'
                } ${
                  isActive
                    ? 'bg-primary-6000 border-primary-6000 text-white hover:bg-primary-6000'
                    : 'border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                }`}
                onClick={() => {
                  if (sizeOutStock) {
                    return;
                  }
                  setSizeSelected(size);
                }}
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
   * 상품 상태 아이콘
   * @param status 신제품 / 50% 할인 / 품절 / 리미티드 에디션
   */
  const renderStatus = () => {
    if (!status) {
      return null;
    }
    const CLASSES =
      'text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300';
    if (status === '신제품') {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === '50% 할인') {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === '품절') {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === '리미티드 에디션') {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  /**
   * 상품 설명 사이드바 옵션, 카트에 추가, 가격
   * todo: 데이터 패칭 필요
   */
  const renderSectionSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap lg:shadow-lg">
        <div className="space-y-7 lg:space-y-8">
          {/* PRICE */}
          <div className="">
            {/* ---------- 1 HEADING ----------  */}
            <div className="flex items-center justify-between space-x-5">
              <div className="flex text-2xl font-semibold">
                {PRICE.toLocaleString()}
              </div>

              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <div className="">
                  <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
                </div>
                {/* todo: 후기 데이터 패칭 */}
                <span className="ml-1.5 flex">
                  <span>4.9 </span>
                  <span className="mx-1.5">·</span>
                  <span className="text-slate-700 dark:text-slate-400 underline">
                    142개 후기
                  </span>
                </span>
              </a>
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
                onChange={setQualitySelected}
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
                  <span>{`${PRICE.toLocaleString()}  `}</span>
                  <span className="mx-2">x</span>
                  <span>{`${qualitySelected} `}</span>
                </span>

                <span>{`${(PRICE * qualitySelected).toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>배송비</span>
                <span>3,000</span>
              </div>
            </div>
            <div className="border-b border-slate-200 dark:border-slate-700"></div>
            <div className="flex justify-between font-semibold">
              <span>합계</span>
              <span>{`${(PRICE * qualitySelected).toLocaleString()}`}</span>
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
      <div className="listingSection__wrap !space-y-6">
        <div>
          {/* todo: 상품 이름 */}
          <h2 className="text-2xl md:text-3xl font-semibold">
            헤비웨이트 후디
          </h2>
          <div className="flex items-center mt-4 sm:mt-5">
            <a
              href="#reviews"
              className="hidden sm:flex items-center text-sm font-medium "
            >
              <div className="">
                <StarIcon className="w-5 h-5 pb-[1px] text-slate-800 dark:text-slate-200" />
              </div>
              {/* todo: 평점, 후기 */}
              <span className="ml-1.5">
                <span>4.9</span>
                <span className="mx-1.5">·</span>
                <span className="text-slate-700 dark:text-slate-400 underline">
                  142개 후기
                </span>
              </span>
            </a>
            <span className="hidden sm:block mx-2.5">·</span>
            {renderStatus()}

            <div className="ml-auto">
              {/* todo: 페칭 필요 */}
              {/* <LikeSaveBtns productId={52}/> */}
              <LikeButton productId={52} className="" />
            </div>
          </div>
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
   * todo: 원래 계획은 이미지로 상품 설명을 하는 것이었으나 데이터가 없으면 텍스트로 대체
   */
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap !border-b-0 !pb-0">
        {/* <h2 className="text-2xl font-semibold">상품 상세</h2> */}
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
        {/* <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div> */}
        <div className="w-full">
          {LIST_IMAGES_PRODUCT_DETAIL.map((item, index) => (
            <Image key={index} src={item} alt={`Product detail ${index}`} />
          ))}
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mt-6">
            강아지를 위한 가을 컬렉션: &quot;헤비웨이트 후디&quot;
          </h1>
          <p className="mt-4 text-gray-600">
            우리의 사랑스러운 네 발 친구들을 위한 특별한 가을맞이 제품,
            &quot;헤비웨이트 후디&quot;가 새로운 시즌을 맞이하여 돌아왔습니다.
            이번 컬렉션은 특히 추운 날씨에 강아지들이 따뜻하게 지낼 수 있도록
            설계되었습니다.
          </p>
          <p className="mt-2 text-gray-600">
            이 후디는 두께감 있는 소재로 제작되어, 찬 바람이 불어올 때
            강아지들의 몸을 포근하게 감싸줍니다. 부드러운 패브릭은 피부에 자극을
            주지 않으면서, 활동적인 강아지들도 편안하게 입을 수 있도록
            디자인되었습니다.
          </p>
          <p className="mt-2 text-gray-600">
            강아지의 편안함을 최우선으로 생각하여, 이 후디는 편안한 착용감은
            물론, 활동 중에도 옷이 벗겨지거나 답답해지지 않도록 조절 가능한
            밴드와 버튼을 갖추고 있습니다.
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">특징:</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              <li>가을에 어울리는 따뜻한 색상 범위로 제공됩니다.</li>
              <li>
                모든 사이즈의 강아지가 편안하게 입을 수 있는 다양한 사이즈 옵션.
              </li>
              <li>뛰어난 신축성으로 강아지의 움직임을 제약하지 않습니다.</li>
              <li>세탁기 사용이 가능해 청결 유지가 쉽습니다.</li>
            </ul>
          </div>
          <p className="mt-4 text-gray-600">
            여러분의 강아지도 이번 가을에는 &quot;헤비웨이트 후디&quot;로
            스타일을 한층 더하며 따뜻하게 지낼 수 있습니다. 강아지의 사이즈와
            성격에 맞는 디자인을 선택하여, 산책과 야외 활동 시 편안함과 스타일을
            모두 챙겨보세요.
          </p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700">
              상세 사항 및 주의사항:
            </h2>
            <p className="mt-4 text-gray-600">
              우리의 후디는 강아지의 편안한 착용감을 위해 신중하게
              제작되었습니다. 내구성이 강한 오버록 스티치로 제작되어 강아지들이
              마음껏 뛰어놀아도 쉽게 찢어지거나 손상되지 않습니다. 또한, 알러지
              반응을 최소화하기 위해 무독성 염료와 천연 소재를 사용하였습니다.
            </p>
            <p className="mt-2 text-gray-600">
              후디의 목 부분은 넓게 디자인되어 있어 강아지가 입고 벗을 때
              스트레스를 받지 않도록 배려하였으며, 통풍이 잘되도록 고려한 소재를
              사용하여 강아지가 땀을 많이 흘리는 것을 방지합니다. 또한, 가슴
              부분은 강아지의 체형에 맞게 조절 가능하도록 벨크로(찍찍이)
              패스너를 사용하여 사이즈 조절이 용이합니다.
            </p>
            <p className="mt-2 text-gray-600">
              착용 시 주의사항으로는, 강아지의 활동성을 고려하여 주기적으로 옷의
              핏을 확인하고, 너무 타이트하거나 느슨하지 않은지 점검해야 합니다.
              특히, 활동적인 강아지의 경우, 장시간 착용으로 인한 피부 문제가
              생길 수 있으니, 착용 시간을 적절히 조절해 주세요. 그리고, 모든
              강아지 옷과 마찬가지로 첫 착용 전에는 한 번 세탁하는 것이
              좋습니다.
            </p>
            <p className="mt-2 text-gray-600">
              더불어, 이 후디는 강아지의 보호자가 편리하게 관리할 수 있도록
              세탁기에서 쉽게 세탁할 수 있습니다만, 가능한 한 옷의 형태를 오래
              유지하기 위해 손세탁을 권장합니다. 세탁 후에는 건조기 사용을
              피하고 자연 건조를 권장드립니다. 만약 건조기 사용이 필요한 경우
              낮은 온도에서 짧은 시간 동안 사용하시기 바랍니다.
            </p>
          </div>
          <p className="mt-4 text-gray-600">
            &quot;헤비웨이트 후디&quot;는 강아지들의 다양한 생활 습관과 환경에
            적합하도록 다각도에서 테스트를 거쳤습니다. 가을과 겨울의 변덕스러운
            날씨에 맞서기 위해 방수 기능을 갖춘 소재를 선택했으며, 부드럽고
            통기성이 좋은 내부 라이닝으로 강아지의 편안함을 한층 강화했습니다.
            이러한 소재 사용은 물웅덩이나 눈 속에서 뛰노는 것을 좋아하는
            활동적인 강아지들에게 이상적입니다.
          </p>
          <p className="mt-2 text-gray-600">
            특별히, 이 후디는 강아지의 신체적 특성을 고려하여, 다리 부분의
            디자인에 자유로움을 주어 이동 시 제약을 덜 받도록 만들었습니다.
            또한, 뒷면에는 작은 포켓이 있어, 소형 간식이나 배설물 봉투를 보관할
            수 있는 실용적인 공간을 추가했습니다.
          </p>
          <p className="mt-2 text-gray-600">
            본 제품은 지속 가능성을 염두에 두고 제작되었습니다. 우리는 지구
            환경에 대한 책임을 지고, 재생 가능한 자원을 사용하여 강아지의 건강
            뿐만 아니라 환경 보호에도 기여하고자 합니다. 강아지의 후디에
            사용되는 모든 소재는 엄격한 환경 기준에 따라 선별되었으며,
            장기적으로 지구와 강아지에게 해가 되지 않는 방식으로 생산되었습니다.
          </p>
          <p className="mt-2 text-gray-600">
            우리는 강아지의 안전도 매우 중요하게 생각합니다. 그래서 밝은
            시간대는 물론 어두운 저녁 산책 시에도 강아지가 잘 보이도록 반사
            스트라이프를 추가했습니다. 이는 차량이나 자전거 운전자로부터
            강아지의 시인성을 높여 사고의 위험을 줄여줍니다.
          </p>
          <p className="mt-2 text-gray-600">
            마지막으로, &quot;헤비웨이트 후디&quot;는 특별한 날을 위한 선물로도
            손색이 없습니다. 우리는 강아지와 보호자가 함께하는 순간들을 더욱
            특별하게 만들고자 고급스러운 포장과 함께, 강아지의 이름을 새길 수
            있는 맞춤형 옵션을 제공합니다. 이 후디는 강아지의 이름이나 보호자의
            연락처를 넣어 소중한 반려견을 잃어버렸을 때 신속하게 연락을 취할 수
            있게 해줍니다.
          </p>
          <p className="mt-2 text-gray-600">
            &quot;헤비웨이트 후디&quot;는 강아지가 행복하고, 보호자가 만족할 수
            있는 최상의 품질과 기능을 제공하고자 합니다. 가을 시즌을 맞아
            강아지와의 산책과 야외 활동이 더욱 즐거워질 수 있도록, 우리의 후디를
            입혀보세요. 여러분의 소중한 네 발 친구를 위해, 지금 바로 최고의
            선택을 하십시오.
          </p>
        </div>

        {/* ---------- 6 ----------  */}
        <Policy />
      </div>
    );
  };

  /**
   * 후기
   */
  const renderReviews = () => {
    return (
      <div id="reviews" className="scroll-mt-[150px]">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment
          todo: 데이터 패칭, 컴포넌트 분리?
        */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: 'December 22, 2021',
                name: 'Stiven Hokinhs',
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: 'August 15, 2022',
                name: 'Gropishta keo',
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: 'December 12, 2022',
                name: 'Dahon Stiven',
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-slate-300 dark:border-slate-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <div className={`ListingDetailPage nc-Product`}>
      <>
        <header className="container mt-8 sm:mt-10">
          <div className="relative ">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
              <div
                className="md:h-full col-span-2 md:col-span-1 row-span-2 relative rounded-md sm:rounded-xl cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt="firt"
                  containerClassName="aspect-w-3 aspect-h-4 relative md:aspect-none md:absolute md:inset-0"
                  className="object-cover rounded-md sm:rounded-xl"
                  src={LIST_IMAGES_GALLERY_DEMO[0]}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity rounded-md sm:rounded-xl"></div>
              </div>

              {/*  */}
              <div
                className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden z-0 cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <NcImage
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover w-full h-full rounded-md sm:rounded-xl"
                  src={LIST_IMAGES_GALLERY_DEMO[1]}
                />
                <div className="absolute inset-0 bg-neutral-900/20 opacity-0 hover:opacity-40 transition-opacity"></div>
              </div>

              {/*  */}
              {[LIST_IMAGES_GALLERY_DEMO[2], LIST_IMAGES_GALLERY_DEMO[3]].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md sm:rounded-xl overflow-hidden z-0 ${
                      index >= 2 ? 'block' : ''
                    }`}
                  >
                    <NcImage
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      containerClassName="aspect-w-6 aspect-h-5 lg:aspect-h-4"
                      className="object-cover w-full h-full rounded-md sm:rounded-xl "
                      src={item || ''}
                    />

                    {/* OVERLAY */}
                    <div
                      className="absolute inset-0 bg-slate-900/20 opacity-0 hover:opacity-60 transition-opacity cursor-pointer"
                      onClick={handleOpenModalImageGallery}
                    />
                  </div>
                )
              )}
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

      {/* OTHER SECTION */}
      <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
        <hr className="border-slate-200 dark:border-slate-700" />

        {renderReviews()}

        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderProductCard
          heading="Customers also purchased"
          subHeading=""
          headingFontClassName="text-2xl font-semibold"
          headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
        />
      </div>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />

      <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={LIST_IMAGES_GALLERY_DEMO.map((item, index) => {
          return {
            id: index,
            url: item,
          };
        })}
      />
    </div>
  );
};

export default Product;
