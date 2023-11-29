'use client';

import ShippingAddress from '@/components/Checkout/ShippingAddress';
import { paymentProductList } from '@/data/paymentProductList';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import {
  DeliveryOrdersInRequest,
  PaymentByProductList,
  vendorsOrderListInRequest,
} from '@/types/payment/payment';
import {
  CheckoutPriceType,
  orderProductInfoListDtoType,
} from '@/types/productType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Payment from './Payment';
import RenderProduct2 from './RenderProduct2';
import Icon from './Icon';
import { BrandProductCartDto, CartIdType } from '@/types/cartType';
import { AddressType } from '@/types/userType';

/**
 * 장바구니 상품 출력
 */
export default function CheckoutList() {
  // 화면에 출력할 금액 정보
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  const [cartId, setCartId] = useState<CartIdType>();
  const [paymentProduct, setPaymentProduct] = useState<PaymentByProductList[]>(
    []
  ); // 결제할 상품들
  const [delivery, setDelivery] = useState<DeliveryOrdersInRequest>();
  const [order, setOrder] = useState<vendorsOrderListInRequest[]>([]);
  const [paymentClicked, setPaymentClicked] = useState(false);
  // 페칭 후 저장할 가격 정보
  const [price, setPrice] = useState<CheckoutPriceType>();
  // 페칭 후 저장할 상품 정보
  const [cartBrandProducts, setCartBrandProducts] =
    useState<orderProductInfoListDtoType[]>();
  // 배송지 정보
  const [defaultAddress, setDefaultAddress] = useState<AddressType>({
    addressId: 0,
    userAddress: '',
    userDetailAddress: '',
    addressAlias: '',
    recipientPhoneNumber: '',
    recipientName: '',
    addressRequestMessage: '',
    entrancePassword: '',
    defaultAddress: true,
  });

  function transformToRequestOrderFormat(cartData: CartIdType): {
    brandName: string;
    requestOrderProductInfoList: { productDetailId: number; count: number }[];
  }[] {
    const result: {
      brandName: string;
      requestOrderProductInfoList: { productDetailId: number; count: number }[];
    }[] = [];

    for (const brand in cartData) {
      const products = cartData[brand].filter((product) => product.checked);

      if (products.length > 0) {
        const requestOrderProductInfoList = products.map((product) => ({
          productDetailId: product.productDetailId,
          count: product.count,
        }));

        result.push({
          brandName: brand,
          requestOrderProductInfoList: requestOrderProductInfoList,
        });
      }
    }

    return result;
  }

  // 장바구니 정보 가져오기
  useEffect(() => {
    async function loadCartId() {
      try {
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/wish/cart`,
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

  // 상품 정보 패칭
  useEffect(() => {
    if (!cartId) return;
    async function loadCartProducts() {
      try {
        const requestOrderProductInfoList = transformToRequestOrderFormat(
          cartId as CartIdType
        );
        /**
         * 장바구니 상품 정보
         */
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/product/order-product-info`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              requestOrderProductInfoList: requestOrderProductInfoList,
            }),
          }
        );
        if (!res.ok) throw new Error(res.statusText);

        const cartProducts = await res.json();
        setPrice({
          deliveryFee: cartProducts.result.deliveryFee,
          discountTotal: cartProducts.result.discountTotal,
          originalTotalPrice: cartProducts.result.originalTotalPrice,
          totalPrice: cartProducts.result.totalPrice,
        });
        setCartBrandProducts(cartProducts.result.orderProductInfoListDto);
      } catch (e) {
        console.error('Failed to fetch cart products', e);
      }
    }
    loadCartProducts();
  }, [cartId]);

  /**
   * 브랜드 별 금액 출력@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   */
  const renderBrandPay = (brandProducts: orderProductInfoListDtoType) => {
    return (
      <div className="text-sm flex justify-end items-end">
        <div className="w-full max-w-[150px] lg:max-w-[200px]">
          <div className="flex justify-between py-2.5">
            <span>상품 가격</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {brandProducts.brandTotalPrice.toLocaleString('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              })}
            </span>
          </div>
          <div className="flex justify-between py-2.5">
            <span>배송비</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {brandProducts.brandDeliveryFee.toLocaleString('ko-KR', {
                style: 'currency',
                currency: 'KRW',
              })}
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
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const deliveryOrdersInRequest = {
    recipientName: defaultAddress?.recipientName,
    recipientAddress: defaultAddress?.userAddress,
    recipientPhoneNumber: defaultAddress?.recipientPhoneNumber,
    entrancePassword: defaultAddress?.entrancePassword,
    deliveryRequestMessage: defaultAddress?.addressRequestMessage,
  };

  console.log('deliveryOrdersInRequest', deliveryOrdersInRequest);

  const vendorsOrderList = cartBrandProducts?.map((brandProduct) => ({
    vendorEmail: brandProduct.vendorEmail || '',
    brandName: brandProduct.brandName,
    brandLogoImageUrl: '', // 실제 이미지 URL이 필요합니다.
    userName: defaultAddress?.recipientName,
    userPhoneNumber: defaultAddress?.recipientPhoneNumber,
    ordersRequestMessage: '',
    dogId: session.data?.user.dogId, // 실제 dogId에 맞는 값을 설정하세요.
    deliveryFee: brandProduct.brandDeliveryFee,
    totalPrice: brandProduct.brandTotalPrice,
    orderDetailList: brandProduct.orderProductInfoDto.map((product) => ({
      productId: product.productId,
      productDetailId: product.productDetailId,
      productName: product?.productName || '',
      productStock: product.count,
      productPrice: product?.productPrice,
      productSize: product.size,
      productColor: product.color,
      productOrderStatus: 'ORDERS', // 상태 설정
      productDiscountRate: product.discountRate || 0,
      productImageUrl: product.imgUrl,
      couponId: 0, // 쿠폰 ID 설정, 없는 경우 0
      couponDiscountPrice: 0, // 쿠폰 할인 가격, 없는 경우 0
    })),
  }));

  console.log('vendorsOrderList', vendorsOrderList);

  const paymentList = cartBrandProducts?.flatMap((brandProduct) =>
    brandProduct.orderProductInfoDto.map((product) => ({
      vendorEmail: product.vendorEmail, // 여기에 적절한 값 필요
      productName: product.productName,
      productCode: product.productCode, // 여기에 적절한 값 필요
      productMainImageUrl: product.imgUrl,
      productAmount: product.productPrice,
      count: product.count,
    }))
  );

  const handlePayment = (data: boolean) => {
    if (session.status === 'authenticated') {
      setPaymentClicked(data);

      if (paymentList && deliveryOrdersInRequest && vendorsOrderList) {
        setPaymentProduct(paymentList);
        console.log('deliveryOrdersInRequest', deliveryOrdersInRequest);
        console.log('vendorsOrderList', vendorsOrderList);

        localStorage.setItem('paymentProduct', JSON.stringify(paymentList));

        localStorage.setItem(
          'deliveryOrdersInRequest',
          JSON.stringify(deliveryOrdersInRequest)
        );

        localStorage.setItem(
          'vendorsOrderListInRequest',
          JSON.stringify(vendorsOrderList)
        );

        localStorage.setItem(
          'productInCartId',
          JSON.stringify(
            extractMatchingProductInCartIds(cartBrandProducts, cartId)
          )
        );
        // console.log(
        //   'productInCartIdlocalStorage',
        //   localStorage.getItem('productInCartId')
        // );
      }
    } else {
      // todo: 비회원 결제 하기 위한 페이지로 이동
      alert('로그인이 필요합니다.');
    }
  };

  const extractMatchingProductInCartIds = (
    cartBrandProducts: orderProductInfoListDtoType[] | undefined,
    cartId: CartIdType | undefined
  ): number[] => {
    if (!cartBrandProducts) {
      return [];
    }

    const productInCartIds: number[] = [];

    cartBrandProducts.forEach((brandProducts) => {
      brandProducts.orderProductInfoDto.forEach((productInfo) => {
        if (cartId) {
          Object.values(cartId).forEach((brand) => {
            const foundProduct = brand.find(
              (cartProduct) =>
                cartProduct.productDetailId === productInfo.productDetailId
            );
            if (foundProduct) {
              productInCartIds.push(foundProduct.productInCartId);
            }
          });
        }
      });
    });

    return productInCartIds;
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
              handleScrollToEl('ShippingAddress');
            }}
            defaultAddress={defaultAddress}
            setDefaultAddress={setDefaultAddress}
          />
        </div>
        <div id="PaymentMethod" className="scroll-mt-24">
          <Payment
            paymentClicked={paymentClicked}
            setPaymentClicked={setPaymentClicked}
            paymentProduct={paymentProduct}

            // price={parseInt(price?.totalPriceString.replace(/[₩,]/g, ""))}
            price={price?.totalPrice || 0}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full md:w-[45%] xl:w-[50%] ">
        {cartBrandProducts &&
          cartBrandProducts.map((brandProducts) => (
            <div
              key={`cart-${brandProducts.brandName}`}
              className="border-[1px] p-4 mb-2 divide-y divide-slate-200 dark:divide-slate-700"
            >
              <div className="text-lg font-semibold pb-2">
                {brandProducts.brandName}
              </div>
              {brandProducts.orderProductInfoDto.map((item) => (
                <RenderProduct2
                  key={`cart-${item.productDetailId}`}
                  item={item}
                />
              ))}
              <div className="p-4">{renderBrandPay(brandProducts)}</div>
            </div>
          ))}
      </div>
      <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 my-10 md:my-0 md:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>

      <div className="flex-1">
        <div className="flex-1 mt-8">{renderLeft()}</div>

        <div className="sticky top-28">
          <h3 className="text-lg font-semibold ">결제 정보</h3>
          <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
            {/* todo: 보유 포인트 조회 */}
            {/* <div className="pb-4">
              <div className="flex justify-between px-2">
                <Label className="text-sm">보유 포인트</Label>
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
            </div> */}
            <div className="flex justify-between py-4">
              <span>상품 가격</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {price?.originalTotalPrice.toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span>배송비</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {price?.deliveryFee.toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span>할인</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                {price?.discountTotal.toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
              <span>합계</span>
              <span>
                {price?.totalPrice.toLocaleString('ko-KR', {
                  style: 'currency',
                  currency: 'KRW',
                })}
              </span>
            </div>
          </div>
          <ButtonPrimary
            onClick={() => handlePayment(true)}
            className="mt-8 w-full"
          >
            결제하기
          </ButtonPrimary>
          <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
            <div className="block relative pl-5">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
