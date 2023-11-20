'use client';

import Label from '@/components/Label/Label';
import Prices from '@/components/Prices';
import { Product, PRODUCTS } from '@/data/data';
import { createContext, useState } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import ContactInfo from './ContactInfo';
import ShippingAddress from './ShippingAddress';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Payment from '@/components/Payment';
import { PaymentByProductList } from '@/types/payment/payment';
import { paymentProductList } from '@/data/paymentProductList';
import { useSession } from 'next-auth/react';

const CheckoutPage = () => {
  /**
   * 현재 탭
   */
  const [tabActive, setTabActive] = useState<'ContactInfo' | 'ShippingAddress' | 'PaymentMethod' | null>(null);

  // const [isModalAddress, setIsModalAddress] = useState(false);

  /**
   * 스크롤 이동
   */
  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  /**
   * 상품 그리기
   * @param item 상품 정보
   */
  const renderProduct = (item: Product, index: number) => {
    const { image, price, name, id } = item;

    return (
      <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={image}
            fill
            alt={name}
            className="h-full w-full object-contain object-center"
            sizes="150px"
          />
          <Link href={`/product/${id}`} className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href={`/product/${id}`}>{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Icon type="color" />
                    {/* 선택된 색상 */}
                    <span>{`Black`}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon type="size" />
                    {/* 선택된 사이즈 */}
                    <span>{`2XL`}</span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={price}
                  />
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          {/* todo: 쿠폰 */}
          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              {/* <NcInputNumber className="relative z-10" /> */}
            </div>

            <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              {/* todo: 제거 버튼 동작 */}
              {/* <span></span> */}
            </a>
          </div>
        </div>
      </div>
    );
  };

  const session = useSession();
  const [paymentProduct, setPaymentProduct] = useState<PaymentByProductList[]>([]); // 결제할 상품들
  const [paymentClicked, setPaymentClicked] = useState(false);
  const [price, setPrice] = useState(9999);

  const handlePayment = (data: boolean) => {
    if (session.status === 'authenticated') {
      setPaymentClicked(data);
      setPrice(100000)
      setPaymentProduct(paymentProductList)
      localStorage.setItem('paymentProduct', JSON.stringify(paymentProductList));
    } else {
      // todo: 비회원 결제 하기 위한 페이지로 이동
      alert('로그인이 필요합니다.')
    }
  }

  // todo: 모달창으로 띄우고 기능 구현
  /**
   * 주문 정보 그리기
   */
  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === 'ContactInfo'}
            onOpenActive={() => {
              setTabActive('ContactInfo');
              handleScrollToEl('ContactInfo');
            }}
            onCloseActive={() => {
              setTabActive(null);
              handleScrollToEl('ContactInfo');
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            onOpenActive={() => {
              handleScrollToEl('ShippingAddress');
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <Payment paymentClicked={paymentClicked} setPaymentClicked={setPaymentClicked} paymentProduct={paymentProduct} price={price} />
        </div>
      </div>
    );
  };

  /**
   * 결제 정보 그리기
   * @param id 상품 id
   * @param name 상품 이름
   * @param image 상품 이미지
   * @param price 상품 가격
   * todo: 데이터 패칭 필요, props 추가
   */
  const renderPay = () => {
    // props 추가
    return (
      <>

        <h3 className="text-lg font-semibold ">결제 정보</h3>

        <div className="text-sm mt-8">
          {/* todo: 포인트로 바꾸기 */}
          <div>
            <div className="flex justify-between px-2">
              <Label className="text-sm">보유 포인트</Label>
              <div>1,605 P</div>
            </div>
            <div className="flex mt-1.5">
              <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
              <button
                onClick={() => { }}
                className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors"
              >
                사용
              </button>
            </div>
          </div>

          {/* todo: 데이터 패칭, 계산 로직 필요 */}
          <div className="mt-4 flex justify-between py-2.5">
            <span>상품 가격</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              249,000
            </span>
          </div>
          <div className="flex justify-between py-2.5">
            <span>배송비</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              50,000
            </span>
          </div>
          <div className="flex justify-between py-2.5">
            <span>할인 합계</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              - 24,000
            </span>
          </div>
          <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
            <span>결제 합계</span>
            <span>276,000</span>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <ButtonPrimary className="mt-8 w-full" onClick={() => handlePayment(true)}>결제하기</ButtonPrimary>
        <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
          <p className="block relative pl-5">
            <Icon type="exclamation" />
            Learn more{` `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900 dark:text-slate-200 underline font-medium"
            >
              Taxes
            </a>
            <span>
              {` `}and{` `}
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="##"
              className="text-slate-900 dark:text-slate-200 underline font-medium"
            >
              Shipping
            </a>
            {` `} infomation
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        {/* 페이지 뎁스 표시 */}
        <div className="mb-16 hidden lg:block">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            주문
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={'/'} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link href={'/collection-2'} className="">
              Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row sticky top-20 ">
          {/* 주문 정보 */}
          <div className="w-full lg:w-[60%] xl:w-[55%]">
            {/* <h3 className="text-lg font-semibold ">주문 목록</h3> */}

            {/* 상품 표시 todo: 브랜드 별로 표시, 각 상품마다 쿠폰 적용, 수량 버튼 삭제, 브랜드별 가격 표시 */}
            <div className="mb-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              <h3 className="text-base font-medium mb-4">브랜드 이름dsafafd</h3>
              {[PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]].map(renderProduct)}
            </div>
            <div className="mb-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              <h3 className="text-base font-medium mb-4">브랜드 이름dsafafd</h3>
              {[PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]].map(renderProduct)}
            </div>
            <div className="mb-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
              <h3 className="text-base font-medium mb-4">브랜드 이름dsafafd</h3>
              {[PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]].map(renderProduct)}
            </div>
          </div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[50%]">
            <h3 className="text-lg font-semibold ">주문자 정보</h3>

            <div className="flex-1 mt-8">{renderLeft()}</div>
            {/* todo: 포인트 사용 추가 */}
            <div className="text-sm sticky top-24 mt-8">{renderPay()}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
