"use client";

import ShippingAddress from "@/app/checkout/ShippingAddress";
import Label from "@/components/Label/Label";
import { paymentProductList } from "@/data/paymentProductList";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { PaymentByProductList } from "@/types/payment/payment";
import { CheckoutBrandProductsType } from "@/types/productType";
import { applyDiscounts } from "@/utils/applyDiscounts";
import { groupProductsByBrand } from "@/utils/groupProductsByBrand";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Payment from "./Payment";
import RenderProduct2 from "./RenderProduct2";
import Icon from "./Icon";

// todo: 현재 체크된 상품 이외에 상품이 표시되거나 하는 문제가 있지만 실제 데이터를 연결할 경우
// 장바구니에서 상품의 아이디를 받아와서 패칭을 진행하기 때문에 isChecked가 true인 상품만 출력됨

/**
 * 장바구니 상품 출력
 */
export default function CheckoutList() {
  const [checkoutBrandProducts, setCheckoutBrandProducts] =
    useState<CheckoutBrandProductsType>();
  const [checkoutInfo, setCheckoutInfo] = useState<{
    originalTotalPriceString: string;
    deliveryFeeString: string;
    discountTotalString: string;
    totalPriceString: string;
  }>({
    originalTotalPriceString: "",
    deliveryFeeString: "",
    discountTotalString: "",
    totalPriceString: "",
  });
  const session = useSession();
  const [paymentProduct, setPaymentProduct] = useState<PaymentByProductList[]>(
    []
  ); // 결제할 상품들
  const [paymentClicked, setPaymentClicked] = useState(false);
  const [price, setPrice] = useState(9999);

  /** 브랜드별 상품 총액 계산 */
  const calculateBrandTotal = (
    brandName: string,
    checkoutBrandProducts: CheckoutBrandProductsType
  ) => {
    const brandProducts = checkoutBrandProducts[brandName] || [];
    const total = brandProducts.reduce(
      (acc, product) => acc + product.discountedPrice * product.count,
      0
    );
    return total;
  };

  /**
   * 브랜드 별 금액 출력
   */
  const renderBrandPay = (brandName: string) => {
    const brandTotal = calculateBrandTotal(brandName, checkoutBrandProducts as CheckoutBrandProductsType);
    const formattedTotal = brandTotal.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return (
      <div className="text-sm flex justify-end items-end">
        <div className="w-full max-w-[150px] lg:max-w-[200px]">
          <div className="flex justify-between py-2.5">
            <span>상품 가격</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {formattedTotal}
            </span>
          </div>
          <div className="flex justify-between py-2.5">
            <span>배송비</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {brandTotal < 50000 ? "3,000" : "0"}
            </span>
          </div>
        </div>
      </div>
    );
  };
  //   todo: 브랜드 별 금액 출력

  /**
   * 스크롤 이동
   */
  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  /**
   * 결제하기 버튼 클릭
   */
  const handlePayment = (data: boolean) => {
    if (session.status === "authenticated") {
      setPaymentClicked(data);
      setPrice(100000);
      setPaymentProduct(paymentProductList);
      localStorage.setItem(
        "paymentProduct",
        JSON.stringify(paymentProductList)
      );
    } else {
      // todo: 비회원 결제 하기 위한 페이지로 이동
      alert("로그인이 필요합니다.");
    }
  };

  /**
   * 주문자 정보, 결제 수단 출력
   */
  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            onOpenActive={() => {
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <Payment
            paymentClicked={paymentClicked}
            setPaymentClicked={setPaymentClicked}
            paymentProduct={paymentProduct}
            price={price}
          />
        </div>
      </div>
    );
  };

  /** 체크된 상품 주문 정보 */
  const calculateCheckoutInfo = () => {
    let originalTotalPrice = 0;
    let deliveryFee = 0;
    let discountTotal = 0;
    let totalPrice = 0;
    const freeShippingThreshold = 50000;
    const deliveryFeePerBrand = 3000;

    if (checkoutBrandProducts) {
      Object.values(checkoutBrandProducts).forEach((brandItems) => {
        let brandTotalPrice = 0;
        let brandHasCheckedItem = false; // 브랜드 내 체크된 상품이 있는지 확인

        brandItems.forEach((item) => {
          if (item.isChecked) {
            brandHasCheckedItem = true; // 체크된 상품이 있으면 true로 설정
            const originalPrice = item.price * item.count;
            originalTotalPrice += originalPrice;

            const discountAmount = item.discountedPrice
              ? originalPrice - item.discountedPrice * item.count
              : 0;
            discountTotal += discountAmount;

            const priceToUse = item.discountedPrice
              ? item.discountedPrice
              : item.price;
            totalPrice += priceToUse * item.count;

            brandTotalPrice += priceToUse * item.count;
          }
        });

        // 브랜드별로 체크된 상품이 있고, 그 총액이 무료 배송 기준 미만일 때만 배송비 추가
        if (brandHasCheckedItem && brandTotalPrice < freeShippingThreshold) {
          deliveryFee += deliveryFeePerBrand;
        }
      });

      totalPrice += deliveryFee;
    }

    return { originalTotalPrice, deliveryFee, discountTotal, totalPrice };
  };

  // 상품 정보 패칭
  useEffect(() => {
    /**
     * 장바구니 상품 정보 패칭, 할인 적용, 브랜드별 상품 그룹핑
     * @returns 브랜드 별 상품 정보
     */
    async function loadCartProducts() {
      try {
        /**
         * 장바구니 상품 정보
         */
        const res = await fetch(
          "https://6535d1a2c620ba9358ecaf38.mockapi.io/CartProductType",
          { cache: "no-cache" }
        );
        if (!res.ok) throw new Error(res.statusText);

        const checkoutProducts = await res.json();
        const discountedCheckoutProducts = applyDiscounts(checkoutProducts);
        /**
         * 브랜드별 상품 그룹핑
         */
        const checkoutBrandProduct = groupProductsByBrand(
          discountedCheckoutProducts
        );
        setCheckoutBrandProducts(
          checkoutBrandProduct as CheckoutBrandProductsType
        );
      } catch (e) {
        console.error("Failed to fetch checkout products", e);
      }
    }
    loadCartProducts();
  }, []);

  // 주문 정보 출력
  useEffect(() => {
    if (checkoutBrandProducts) {
      const { originalTotalPrice, deliveryFee, discountTotal, totalPrice } =
        calculateCheckoutInfo();
      setCheckoutInfo({
        originalTotalPriceString: originalTotalPrice.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        deliveryFeeString: deliveryFee.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        discountTotalString: discountTotal.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
        totalPriceString: totalPrice.toLocaleString("ko-KR", {
          style: "currency",
          currency: "KRW",
        }),
      });
    }
  }, [checkoutBrandProducts]);

  return (
    <>
      <div className="w-full md:w-[45%] xl:w-[50%] ">
        {checkoutBrandProducts &&
          Object.entries(checkoutBrandProducts).map(([brandName, items]) => (
            <div
              key={`cart-${brandName}`}
              className="border-[1px] p-4 mb-2 divide-y divide-slate-200 dark:divide-slate-700"
            >
              <div className="text-lg font-semibold pb-2">{brandName}</div>
              {items.map((item) => (
                <RenderProduct2
                  key={`cart-${item.productDetailId}`}
                  item={item}
                  isChecked={item.isChecked}
                />
              ))}
              <div className="p-4">{renderBrandPay(brandName)}</div>
            </div>
          ))}
      </div>
      <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 my-10 md:my-0 md:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>

      <div className="flex-1">
        <div className="flex-1 mt-8">{renderLeft()}</div>

        <div className="sticky top-28">
          <h3 className="text-lg font-semibold ">결제 정보</h3>
          <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
            <div className="pb-4">
              <div className="flex justify-between px-2">
                <Label className="text-sm">보유 포인트</Label>
                {/* todo: 보유 포인트 조회 */}
                <div>1,605 P</div>
              </div>
              <div className="flex mt-1.5">
                <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                <button
                  onClick={() => {}}
                  className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors"
                >
                  사용
                </button>
              </div>
            </div>
            <div className="flex justify-between py-4">
              <span>상품 가격</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {checkoutInfo.originalTotalPriceString}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span>배송비</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {checkoutInfo.deliveryFeeString}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span>할인</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {checkoutInfo.discountTotalString !== "₩0"
                  ? `- ${checkoutInfo.discountTotalString}`
                  : checkoutInfo.discountTotalString}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
              <span>합계</span>
              <span>{checkoutInfo.totalPriceString}</span>
            </div>
          </div>
          <ButtonPrimary
            onClick={() => handlePayment(true)}
            className="mt-8 w-full"
          >
            결제하기
          </ButtonPrimary>
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
        </div>
      </div>
    </>
  );
}
