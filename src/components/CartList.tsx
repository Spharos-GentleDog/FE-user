'use client';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Checkbox from '@/shared/Checkbox/Checkbox';
import {
  BrandCartType,
  BrandProductCartDto,
  BrandProductDto,
  CartIdType,
  ProductCartDto,
} from '@/types/cartType';
import { CartBrandProductsType, CartProductType } from '@/types/productType';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import RenderProduct from './RenderProduct';

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 브랜드 체크 박스 수정@@@@@@@@@@@@@@@@@
// 삭제 로직 수정

/**
 * 장바구니 상품 출력
 */
export default function CartList() {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  const [cartBrandProducts, setCartBrandProducts] =
    useState<BrandProductCartDto>();
  const [checkoutInfo, setCheckoutInfo] = useState<{
    originalTotalPriceString: string;
    deliveryFeeString: string;
    discountTotalString: string;
    totalPriceString: string;
  }>({
    originalTotalPriceString: '',
    deliveryFeeString: '',
    discountTotalString: '',
    totalPriceString: '',
  });
  const [isBrandChecked, setIsBrandChecked] = useState<Record<string, boolean>>(
    {}
  );
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [cartId, setCartId] = useState<CartIdType>();
  const [cartProducts, setCartProducts] = useState<BrandCartType>();

  /** 체크된 상품 주문 정보 */
  const calculateCheckoutInfo = () => {
    let originalTotalPrice = 0;
    let deliveryFee = 0;
    let discountTotal = 0;
    let totalPrice = 0;
    const freeShippingThreshold = 50000;
    3;
    const deliveryFeePerBrand = 3000;

    if (cartBrandProducts) {
      Object.values(cartBrandProducts).forEach((brandItems) => {
        let brandTotalPrice = 0;
        let brandHasCheckedItem = false; // 브랜드 내 체크된 상품이 있는지 확인

        brandItems.forEach((item) => {
          if (item.checked) {
            brandHasCheckedItem = true; // 체크된 상품이 있으면 true로 설정
            const originalPrice = item.productPrice * item.count;
            originalTotalPrice += originalPrice;

            const discountAmount = item.discountedPrice
              ? originalPrice - item.discountedPrice * item.count
              : 0;
            discountTotal += discountAmount;

            const priceToUse = item.discountedPrice
              ? item.discountedPrice
              : item.productPrice;
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

  /**
   * 상품 수량 변경 핸들러
   * @param productDetailId 상품 상세 아이디
   * @returns 상품 수량 변경
   */
  const handleCountChange = (
    productInCartId: number,
    productDetailId: number,
    newCount: number
  ) => {
    async function countfetch() {
      try {
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/wish/cart/${productInCartId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              count: { newCount },
            }),
          }
        );
        if (!res.ok) throw new Error(res.statusText);
        setCartBrandProducts((prevState) => {
          const newState = { ...prevState };
          for (const brand in newState) {
            newState[brand] = newState[brand].map((product) =>
              product.productDetailId === productDetailId
                ? { ...product, count: newCount }
                : product
            );
          }
          return newState;
        });
      } catch (e) {
        console.error('Failed to fetch loadCartId', e);
      }
    }
    countfetch();
  };

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

  /**  */

  // 상품 정보 패칭
  useEffect(() => {
    /**
     * 장바구니 상품 정보 패칭, 할인 적용, 브랜드별 상품 그룹핑
     * @returns 브랜드 별 상품 정보
     */
    async function loadCartProducts() {
      try {
        const fetchId = formatCartDataForProduct(cartId as CartIdType);
        // console.log('fetchId', fetchId);
        /**
         * 장바구니 상품 정보
         */
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/product/find-product-detail`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(fetchId),
          }
        );
        if (!res.ok) throw new Error(res.statusText);

        const cartProducts = await res.json();
        // console.log('cartProducts', cartProducts);
        const formated = formatProducts(
          cartProducts.result.productDetailBrandDtoList
        );
        // console.log('cartProducts', cartProducts);
        setCartProducts(formated);
        // console.log('formated', formated);
      } catch (e) {
        console.error('Failed to fetch cart products', e);
      }
    }
    loadCartProducts();
  }, [cartId]);

  // 장바구니 정보와 상품 정보 합치기
  useEffect(() => {
    if (cartProducts && cartId) {
      const combinedData = combineBrandData(cartProducts, cartId);
      setCartBrandProducts(combinedData);
      // console.log('combinedData', combinedData);
    }
  }, [cartProducts]);

  // 주문 정보 출력
  useEffect(() => {
    const { originalTotalPrice, deliveryFee, discountTotal, totalPrice } =
      calculateCheckoutInfo();
    setCheckoutInfo({
      originalTotalPriceString: originalTotalPrice.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }),
      deliveryFeeString: deliveryFee.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }),
      discountTotalString: discountTotal.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }),
      totalPriceString: totalPrice.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
      }),
    });
    // console.log('cartBrandProducts', cartBrandProducts)
  }, [isAllChecked, isBrandChecked, cartBrandProducts]);

  /** 개별 체크박스 상태 변경 핸들러 */
  const handleItemCheck = (
    checked: boolean,
    productDetailId: number,
    productInCartId: number
  ) => {
    // 현재 체크 상태의 반대를 백에 전송하는 fetch를 진행하고 이후 setCartBrandProducts를 업데이트
    async function checkboxfetch() {
      try {
        // console.log('productInCartId', productInCartId);
        // console.log('checked', checked);
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/wish/cart/checked`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              changedCheckedList: [
                {
                  productInCartId: productInCartId,
                  checked: checked,
                },
              ],
            }),
          }
        );
        if (!res.ok) throw new Error(res.statusText);

        const checkbox = await res.json();
        // console.log('checkbox', checkbox);
        setCartBrandProducts((prevState) => {
          const newState = { ...prevState };

          for (const brand in newState) {
            newState[brand] = newState[brand].map((product) =>
              product.productDetailId === productDetailId
                ? { ...product, checked: checked }
                : product
            );
          }

          return newState;
        });
      } catch (e) {
        console.error('Failed to fetch loadCartId', e);
      }
    }
    checkboxfetch();
  };

  /** 브랜드별 체크박스 상태 변경 핸들러 */
  const handleBrandCheck = (
    checked: boolean,
    brandName: string,
    cartBrandProducts: BrandProductCartDto
  ) => {
    console.log('handleBrandCheck called', brandName); // 함수 호출 확인
    // 변경할 상품의 productInCartId 리스트 생성
    const changedCheckedList = cartBrandProducts[brandName].map((product) => ({
      productInCartId: product.productInCartId,
      checked: checked,
    }));
    // console.log('changedCheckedList', changedCheckedList);
    async function brandcheckboxfetch() {
      try {
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/wish/cart/checked`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ changedCheckedList }),
          }
        );
        if (!res.ok) throw new Error(res.statusText);

        const checkbox = await res.json();
        console.log('checkbox', checkbox);

        // 상태 업데이트
        setCartBrandProducts((prevState) => {
          const newState = { ...prevState };

          if (newState[brandName]) {
            newState[brandName] = newState[brandName].map((product) => ({
              ...product,
              checked: checked,
            }));
          }

          return newState;
        });
        setIsBrandChecked((prev) => ({ ...prev, [brandName]: checked }));
      } catch (e) {
        console.error('Failed to update checkbox state', e);
      }
    }
    brandcheckboxfetch();
  };

  /** 전체 선택 체크박스 상태 변경 핸들러 */
  const handleAllCheck = (checked: boolean) => {
    setCartBrandProducts((prevState) => {
      const newState = { ...prevState };

      Object.keys(newState).forEach((brandName) => {
        newState[brandName] = newState[brandName].map((product) => ({
          ...product,
          checked: checked,
        }));
      });
      return newState;
    });

    setIsAllChecked(checked);
  };

  /**  개별 체크박스 상태에 따라 전체 선택 체크박스 상태 갱신*/
  useEffect(() => {
    if (cartBrandProducts) {
      // 브랜드별 체크 상태 업데이트
      const newIsBrandChecked: Record<string, boolean> = {};
      Object.keys(cartBrandProducts).forEach((brandName) => {
        newIsBrandChecked[brandName] = cartBrandProducts[brandName].every(
          (product) => product.checked
        );
      });
      setIsBrandChecked(newIsBrandChecked);

      // 전체 선택 체크박스 상태 업데이트
      const allChecked = Object.values(cartBrandProducts)
        .flat()
        .every((product) => product.checked);
      setIsAllChecked(allChecked);
    }
  }, [cartBrandProducts]);

  /** 개별 상품 삭제 헨들러 */
  async function handleItemDelete(productInCartId: number) {
    try {
      const res = await fetch(
        `${process.env.BASE_API_URL}/api/v1/wish/cart/${productInCartId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error('Failed to delete product');
      // console.log('res', res);
      // 클라이언트 사이드에서 상품 제거 및 브랜드 확인
      setCartBrandProducts((prevState) => {
        const newState = { ...prevState };

        for (const brand in newState) {
          // 상품 제거
          newState[brand] = newState[brand].filter(
            (product) => product.productInCartId !== productInCartId
          );

          // 해당 브랜드의 모든 상품이 삭제되었는지 확인
          if (newState[brand].length === 0) {
            delete newState[brand]; // 브랜드 삭제
          }
        }

        return newState;
      });
    } catch (error) {
      console.error('Error deleting product', error);
    }
  }

  /** 체크된 상품들 삭제 핸들러 */
  const handleCheckedDelete = async (
    cartBrandProducts: BrandProductCartDto[]
  ) => {
    const checkedProductIds = Object.values(cartBrandProducts)
      .flat()
      .map((items) => items.productInCartId);
    console.log('checkedProductIds', checkedProductIds);

    // 장바구니에서 삭제
    if (checkedProductIds) {
      for (const id in checkedProductIds) {
        console.log('id', typeof Number(id));
        await handleItemDelete(Number(id));
      }

      // 상태 업데이트
      setCartBrandProducts((prevState) => {
        const newState = { ...prevState };

        for (const brand in newState) {
          newState[brand] = newState[brand].filter(
            (product) => !product.checked
          );
        }

        return newState;
      });
    }
    // 클라이언트 사이드에서 상품 제거 및 브랜드 확인
    setCartBrandProducts((prevState) => {
      const newState = { ...prevState };

      for (const brand in newState) {
        // 해당 브랜드의 모든 상품이 삭제되었는지 확인
        if (newState[brand].length === 0) {
          delete newState[brand]; // 브랜드 삭제
        }
      }

      return newState;
    });
  };

  // 페칭 전 데이터 정리)
  function formatCartDataForProduct(cartIdData: CartIdType): {
    requestProductsList: Array<{
      brandName: string;
      productDetailIds: number[];
    }>;
  } {
    const requestProductsList = Object.entries(cartIdData).map(
      ([brandName, products]) => ({
        brandName,
        productDetailIds: products.map((product) => product.productDetailId),
      })
    );

    return { requestProductsList };
  }

  // 상품 데이터 변경
  function formatProducts(inputData: BrandProductDto[]): BrandCartType {
    const transformed: BrandCartType = {};

    inputData.forEach((item) => {
      transformed[item.brandName] = item.productDetailDtoList.map((product) => {
        // discountRate가 null이면 discountRate와 discountedPrice를 제외
        const { discountRate, discountedPrice, ...productWithoutDiscount } =
          product;
        return discountRate === null ? productWithoutDiscount : product;
      });
    });

    return transformed;
  }

  // 장바구니와 상품 데이터 합치기
  function combineBrandData(
    brandCartData: BrandCartType,
    cartIdData: CartIdType
  ): BrandProductCartDto {
    const combinedData: BrandProductCartDto = {};

    for (const brand in brandCartData) {
      combinedData[brand] = brandCartData[brand].map((cartItem) => {
        const productCartItem = cartIdData[brand]?.find(
          (productCartItem) =>
            productCartItem.productDetailId === cartItem.productDetailId
        );

        return {
          ...cartItem, // CartType에서 제공하는 상품 상세 정보
          count: productCartItem ? productCartItem.count : 0, // ProductCartType에서 제공하는 장바구니 정보
          checked: productCartItem ? productCartItem.checked : false,
          productInCartId: productCartItem
            ? productCartItem.productInCartId
            : 0,
        };
      });
    }

    return combinedData;
  }
  // console.log('cartBrandProducts', cartBrandProducts);

  return (
    <>
      <div className="w-full md:w-[60%] xl:w-[55%] ">
        {cartBrandProducts && Object.keys(cartBrandProducts).length > 0 && (
          <div className="flex justify-between">
            <Checkbox
              name="cart-all"
              label="전체 선택"
              labelClassName="text-lg font-bold"
              className="mb-4 flex items-center"
              isChecked={isAllChecked}
              onChange={(checked) => handleAllCheck(checked)}
            />

            {/* todo: 선택 삭제 */}
            <button
              className="flex"
              onClick={() =>
                cartBrandProducts &&
                handleCheckedDelete(cartBrandProducts as any)
              }
            >
              <div className="font-semibold text-base text-blue-500 dark:text-slate-200">
                선택 삭제
              </div>
            </button>
          </div>
        )}
        {cartBrandProducts &&
          Object.entries(cartBrandProducts).map(([brandName, items]) => (
            <div
              key={`cart-${brandName}`}
              className="border-[1px] shadow-md p-4 mb-2 divide-y divide-slate-200 dark:divide-slate-700"
            >
              <Checkbox
                name={`cart-${brandName}`}
                label={brandName}
                labelClassName="break-keep text-base font-semibold"
                className="mb-4 flex items-center"
                isChecked={isBrandChecked[brandName]}
                onChange={(checked) =>
                  handleBrandCheck(checked, brandName, cartBrandProducts)
                }
              />
              {items.map((item) => (
                <RenderProduct
                  key={`cart-${item.productDetailId}`}
                  item={item}
                  isChecked={item.checked}
                  onItemCheck={(checked) =>
                    handleItemCheck(
                      checked,
                      item.productDetailId,
                      item.productInCartId
                    )
                  }
                  onCountChange={(newCount) =>
                    handleCountChange(
                      item.productDetailId,
                      newCount,
                      item.productInCartId
                    )
                  }
                  onItemDelete={() => handleItemDelete(item.productInCartId)}
                />
              ))}
            </div>
          ))}
        {(!cartBrandProducts ||
          Object.keys(cartBrandProducts).length === 0) && (
          <div className="flex flex-col justify-center items-center">
            <svg
              className="w-40 h-40 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              width="100%"
              viewBox="0 0 1024 1024"
              enable-background="new 0 0 1024 1024"
            >
              <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M644.230347,779.350952   C621.284729,788.858276 597.900513,795.285706 573.501709,797.309875   C544.736633,799.696350 515.883728,797.650085 487.080231,798.352966   C467.533722,798.830017 448.156067,797.504517 429.060394,793.261719   C393.244598,785.304016 360.458832,770.851562 332.081879,747.206116   C328.121185,743.905762 324.953430,741.671753 318.993866,744.541382   C269.926422,768.168152 216.910706,752.627197 187.940765,706.453491   C173.095490,682.792297 164.968231,657.280396 165.484421,628.960571   C166.064362,597.142822 165.795517,565.304016 165.478592,533.478516   C165.369125,522.484497 165.723999,511.496490 165.525940,500.517609   C164.916840,466.749268 173.383743,435.270386 189.046066,405.609344   C211.328705,363.410767 245.502716,334.106323 288.660370,314.794586   C308.157715,306.070160 328.247559,299.122864 349.541016,296.196930   C350.364777,296.083740 351.215851,295.673462 351.993225,295.794189   C361.149841,297.215942 368.042480,292.387146 375.487366,288.135956   C405.005310,271.280518 436.636505,260.476349 470.509399,256.609802   C499.082611,253.348190 527.757874,253.744171 556.298645,256.067200   C589.420532,258.763123 620.371765,269.422791 649.396912,285.523621   C659.250305,290.989532 668.780212,295.682739 680.689758,296.784241   C701.844421,298.740845 721.606750,306.845917 740.911926,315.660828   C778.795959,332.958984 810.166626,358.027161 832.655090,393.372620   C848.687622,418.571289 858.689209,446.075745 862.472351,475.813416   C863.255798,481.971558 863.358459,488.090820 863.359924,494.241638   C863.371155,542.567749 864.727661,590.945923 862.911804,639.204285   C861.309143,681.798340 842.924927,717.285583 806.014893,740.381775   C774.449097,760.133850 740.947693,760.818115 707.402893,744.360474   C704.059875,742.720337 701.982910,742.849548 699.088257,745.263550   C682.507568,759.091431 664.578125,770.828491 644.230347,779.350952  M735.409790,480.026459   C729.686523,450.638733 718.715759,423.211761 703.931885,397.307312   C672.943420,343.008881 626.216553,310.694244 565.007690,299.343445   C537.135681,294.174805 508.891602,295.459534 480.832031,297.371063   C450.638489,299.428009 422.447693,308.881836 396.442444,324.368195   C359.774536,346.204376 333.673676,377.568604 315.638123,415.858185   C302.277863,444.222046 292.483765,473.969727 290.812195,505.286438   C289.226257,534.997925 288.430725,564.956421 291.422180,594.659851   C294.800690,628.205933 307.075531,658.836914 328.193481,685.041626   C366.188263,732.188354 416.349060,755.061096 476.715729,755.641357   C503.710022,755.900818 530.708984,755.648865 557.705750,755.681824   C567.882080,755.694275 577.955750,754.798584 587.943420,752.839050   C647.635864,741.127625 692.373413,709.175171 719.638123,654.360840   C732.144226,629.218018 739.647888,602.609436 738.951599,574.070129   C738.545288,557.416138 738.807678,540.741577 738.991150,524.078735   C739.151062,509.558228 738.579285,495.122803 735.409790,480.026459  M248.725601,500.699921   C254.290619,448.825958 272.067688,401.397186 301.149597,357.880951   C295.706604,358.049255 291.817261,360.961456 287.783173,363.291718   C251.110321,384.475891 226.424561,415.226593 213.651199,455.702118   C208.038055,473.488678 207.580856,491.743225 207.475510,510.031677   C207.244156,550.194519 207.288635,590.359985 207.447998,630.523499   C207.519821,648.621582 210.948090,666.010010 221.198044,681.365906   C235.949112,703.465027 256.061829,715.251587 283.293884,712.609192   C286.840302,712.265076 290.458038,711.657654 293.470825,709.671631   C293.525116,707.722351 292.422607,706.616455 291.564178,705.417358   C278.967773,687.822327 269.319916,668.710449 261.946930,648.391357   C254.522446,627.930237 249.291260,606.925903 248.832993,585.151001   C248.247528,557.331848 248.698776,529.490906 248.725601,500.699921  M743.565002,364.955139   C738.536621,362.136597 733.754822,358.738983 727.471985,357.015747   C727.704163,358.709198 727.647400,359.248169 727.857971,359.645599   C728.401794,360.672180 729.022156,361.664978 729.684631,362.620941   C746.795654,387.312378 759.639771,414.079773 768.644836,442.711884   C776.072571,466.328949 780.657410,490.382935 780.368469,515.275940   C780.140320,534.933228 780.262146,554.595398 780.321411,574.255066   C780.467957,622.846924 764.953674,666.349670 737.632996,706.035522   C736.899719,707.100586 735.741333,707.984680 736.159424,709.522949   C736.853088,710.672913 738.090393,710.873169 739.183105,711.113342   C757.313477,715.098633 774.280334,713.190002 789.172119,701.058228   C809.961243,684.122131 820.513306,662.074158 820.810547,635.427063   C821.325256,589.286011 821.344604,543.139526 821.637634,496.995697   C821.761963,477.407074 817.677124,458.763885 810.187256,440.685944   C796.672180,408.064972 774.028992,383.579224 743.565002,364.955139  z"
              />
              <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M366.924133,565.288635   C340.400299,553.817749 326.151611,533.388123 325.453796,505.421814   C324.635620,472.630981 346.359833,444.128448 381.031097,438.828247   C412.303192,434.047668 440.648254,450.611420 451.974701,479.332062   C467.028778,517.504822 442.661835,561.044006 402.160278,568.298401   C390.294220,570.423767 378.635590,569.776367 366.924133,565.288635  M387.292480,467.130035   C378.965881,461.635376 370.274323,461.721863 362.225830,467.379333   C354.702942,472.667389 351.070709,483.732819 354.066620,492.236053   C357.028961,500.644043 365.793213,506.399048 375.105743,506.051331   C384.069458,505.716675 391.325043,500.096985 394.725555,490.855072   C397.764038,482.597107 395.386749,474.527527 387.292480,467.130035  z"
              />
              <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M668.556702,562.725220   C643.460999,573.939392 619.710999,571.642700 598.722961,554.853516   C577.800110,538.116516 569.536377,515.505127 575.231689,488.938995   C580.738464,463.252258 597.011841,446.977142 622.182739,440.365143   C665.812134,428.904388 707.286011,463.198334 704.081299,508.144043   C702.352539,532.389343 690.854492,551.034851 668.556702,562.725220  M608.781738,470.300018   C604.783386,474.661011 602.530151,479.986633 602.610657,485.708588   C602.720276,493.503052 606.298828,500.125336 613.441589,503.568054   C621.208130,507.311432 629.347839,507.366394 636.533081,501.770325   C643.196594,496.580536 646.155334,489.475891 644.983521,481.105072   C642.845947,465.835022 624.445984,455.491455 608.781738,470.300018  z"
              />
              <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M490.501404,629.477417   C499.718109,623.429810 496.378357,614.420654 496.335327,606.477173   C496.318176,603.316650 492.663666,604.429626 490.539856,604.350037   C480.525238,603.974731 472.991455,598.253540 470.320831,588.793823   C466.921387,576.752502 476.462006,563.838013 488.943420,563.649475   C504.591492,563.413025 520.245300,563.928589 535.891602,563.151184   C543.183289,562.788940 549.880371,564.618408 554.721558,570.466003   C559.837585,576.645630 561.761780,583.710876 558.528564,591.398132   C555.182312,599.354065 548.770874,603.407593 540.336548,604.218079   C533.371826,604.887451 533.992493,604.834229 533.191223,611.622314   C532.028320,621.474365 535.502258,628.189270 543.551514,633.865967   C552.370117,640.085266 560.372803,647.462219 568.723633,654.343750   C577.671631,661.717285 579.419678,672.567993 572.999451,680.808228   C565.985107,689.811035 554.223267,691.517700 545.120178,684.355286   C536.228149,677.358887 527.559814,670.053894 519.120850,662.517700   C515.730286,659.489868 513.667236,659.117737 510.114594,662.429932   C501.965149,670.027710 493.586731,677.443726 484.772644,684.248901   C473.598450,692.876221 458.348022,688.195435 454.391052,675.303040   C452.197632,668.156433 453.991272,661.822205 459.318878,656.559631   C469.048492,646.948792 480.092468,638.848267 490.501404,629.477417  z"
              />
              <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M623.714111,620.810059   C625.779419,613.722534 627.418823,606.904358 629.812439,600.362000   C632.453369,593.143738 639.349060,589.925171 646.716309,591.638184   C650.986633,592.631042 653.786743,595.242920 655.299438,599.224060   C660.032471,611.679871 663.453430,624.563904 666.914795,637.390564   C669.468079,646.852051 664.663635,656.377075 656.183044,661.837463   C648.204773,666.974487 637.462158,666.581848 629.385742,660.858154   C621.078064,654.970398 616.936646,644.863159 619.282349,635.527893   C620.496887,630.694092 622.160156,625.972961 623.714111,620.810059  z"
              />
              {/* <path
                fill="currentColor"
                opacity="1.000000"
                stroke="none"
                d=" M387.564606,591.587524   C393.974121,592.001648 397.894135,595.136719 399.589355,600.864258   C403.174652,612.977478 407.118317,625.011353 410.050781,637.284302   C414.038910,653.975586 396.851868,669.505554 380.276733,664.767822   C366.217773,660.749329 358.953552,647.443481 363.279419,634.113892   C366.717194,623.520752 369.449554,612.700623 372.749878,602.060303   C375.086578,594.526611 379.188843,591.753723 387.564606,591.587524  z"
              /> */}
            </svg>
            <div className="text-2xl font-semibold ">장바구니가 비어있어요</div>
          </div>
        )}
      </div>
      <div className="border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 my-10 md:my-0 md:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>

      <div className="flex-1">
        <div className="sticky top-28">
          <h3 className="text-lg font-semibold ">주문 정보</h3>
          <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
            <div className="flex justify-between pb-4">
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
                {checkoutInfo.discountTotalString !== '₩0'
                  ? `- ${checkoutInfo.discountTotalString}`
                  : checkoutInfo.discountTotalString}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
              <span>합계</span>
              <span>{checkoutInfo.totalPriceString}</span>
            </div>
          </div>
          <ButtonPrimary href="/checkout" className="mt-8 w-full">
            주문하기
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
