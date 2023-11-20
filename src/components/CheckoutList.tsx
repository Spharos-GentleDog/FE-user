"use client";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import { CartBrandProductsType, CartProductType } from "@/types/productType";
import { applyDiscounts } from "@/utils/applyDiscounts";
import { groupProductsByBrand } from "@/utils/groupProductsByBrand";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Label from "@/components/Label/Label";
import RenderProduct from "./RenderProduct";
import Input from "@/shared/Input/Input";
import ShippingAddress from "@/app/checkout/ShippingAddress";
import Payment from "./Payment";
import { useSession } from "next-auth/react";
import { PaymentByProductList } from "@/types/payment/payment";
import { paymentProductList } from "@/data/paymentProductList";

/**
 * 장바구니 상품 출력
 */
export default function CheckoutList() {
  const [cartBrandProducts, setCartBrandProducts] =
    useState<CartBrandProductsType>();
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

//   todo: 브랜드 별 금액 출력
  const renderBrandPay = () => {
    return (
      <div className="text-sm flex justify-end items-end">
        <div className="w-full max-w-[150px] lg:max-w-[200px]">
          <div className="flex justify-between py-2.5">
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
        </div>
      </div>
    );
  };

  /**
   * 스크롤 이동
   */
  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

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

    if (cartBrandProducts) {
      Object.values(cartBrandProducts).forEach((brandItems) => {
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

        const cartProducts = await res.json();
        const discountedCartProducts = applyDiscounts(cartProducts);
        /**
         * 브랜드별 상품 그룹핑
         */
        const cartBrandProduct = groupProductsByBrand(discountedCartProducts);
        setCartBrandProducts(cartBrandProduct as CartBrandProductsType);
      } catch (e) {
        console.error("Failed to fetch acrt products", e);
      }
    }
    loadCartProducts();
  }, []);

  // 주문 정보 출력
  useEffect(() => {
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
    // console.log('cartBrandProducts', cartBrandProducts)
  }, []);

  return (
    <>
      <div className="w-full md:w-[60%] xl:w-[55%] ">
        {cartBrandProducts &&
          Object.entries(cartBrandProducts).map(([brandName, items]) => (
            <div
              key={`cart-${brandName}`}
              className="border-[1px] p-4 mb-2 divide-y divide-slate-200 dark:divide-slate-700"
            >
                <div>{brandName}</div>
              {items.map((item) => (
                  <RenderProduct
                  key={`cart-${item.productDetailId}`}
                  item={item}
                  isChecked={item.isChecked}
                  />
                  ))}
                  <div className="p-4">{renderBrandPay()}</div>   
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
