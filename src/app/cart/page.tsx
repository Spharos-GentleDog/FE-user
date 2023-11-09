import { NoSymbolIcon, CheckIcon } from '@heroicons/react/24/outline';
import NcInputNumber from '@/components/NcInputNumber';
import Prices from '@/components/Prices';
import { Product, PRODUCTS } from '@/data/data';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';

const CartPage = () => {
  /**
   * 재고 현황 아이콘 랜더링
   */
  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">품절</span>
      </div>
    );
  };

  /**
   * 재고 현황 아이콘 랜더링
   */
  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">재고 있음</span>
      </div>
    );
  };

  /**
   * 제품 랜더링
   */
  const renderProduct = (item: Product, index: number) => {
    const { image, price, name } = item;

    return (
      <div
        key={index}
        className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={image}
            alt={name}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Icon type='color'/>

                    <span>{`Black`}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon type='size'/>
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

              <div className="hidden sm:block text-center relative">
                <NcInputNumber className="relative z-10" />
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices price={price} className="mt-0.5" />
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {Math.random() > 0.6
              ? renderStatusSoldout()
              : renderStatusInstock()}

            <a
              href="##"
              className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
            >
              {/* todo: 기능 활성화 */}
              <span>제거</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="hidden lg:block mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold ">
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
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            {[
              PRODUCTS[0],
              PRODUCTS[1],
              PRODUCTS[2],
              PRODUCTS[3],
              PRODUCTS[4],
            ].map(renderProduct)}
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <div className="flex-1">
            {/* todo: 데이터 패칭 */}
            <div className="sticky top-28">
              <h3 className="text-lg font-semibold ">주문 정보</h3>
              <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                <div className="flex justify-between pb-4">
                  <span>상품 가격</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    224,900
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>배송비</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    5,000
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>할인</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    - 2,490
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>합계</span>
                  <span>276,000</span>
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full">
                주문하기
              </ButtonPrimary>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <Icon type='exclamation'/>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
