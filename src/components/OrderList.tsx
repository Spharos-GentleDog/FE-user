import { OrderListProps, OrderListType } from '@/types/orderType';
import { Disclosure } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Icon from './Icon';

export default function OrderList() {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  const [nextGroup, setNextGroup] = useState();
  const [groupedOrders, setGroupedOrders] = useState<
    Record<string, Record<string, Record<string, OrderListType[]>>>
  >({});

  // 데이터 페칭
  async function fetchOrderList(groupId?: number) {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/v1/orders/user?groupId=${groupId || ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          userEmail: userEmail,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const orderList = await response.json();
    if (orderList.result.nextGroupId !== null) {
      setNextGroup(orderList.result.nextGroupId);
    }
    const newGroupedOrders = groupOrders(
      orderList.result.vendorsOrderSummaryOutResponseDtoList
    );
    setGroupedOrders((prev) => ({ ...prev, ...newGroupedOrders }));
  }

  /** 형식 변환 */
  const groupOrders = (orders: OrderListType[]) => {
    const groupedByDate: Record<
      string,
      Record<string, Record<string, OrderListType[]>>
    > = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString('ko-KR');
      const orderNumber = order.orderNumber;
      const brandName = order.brandName;

      if (!groupedByDate[date]) {
        groupedByDate[date] = {};
      }
      if (!groupedByDate[date][orderNumber]) {
        groupedByDate[date][orderNumber] = {};
      }
      if (!groupedByDate[date][orderNumber][brandName]) {
        groupedByDate[date][orderNumber][brandName] = [];
      }

      groupedByDate[date][orderNumber][brandName].push(order);
    });

    return groupedByDate;
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  // 스크롤 위치에 따라 추가적인 페칭을 진행
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 10 &&
        nextGroup
      ) {
        await fetchOrderList(nextGroup);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextGroup]);

  return (
    <>
      {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
        <div key={date} className="date-group">
          <span className="font-semibold lg:text-lg">{date}</span>
          {Object.entries(ordersOnDate).map(([orderNumber, brandName]) => (
            <div
              key={orderNumber}
              className="border-[1.5px] rounded-md pt-2 pb-4 px-4 w-full my-4 shadow-lg"
            >
              <div className="order-number text-end text-sm">
                <div className="pt-2">{orderNumber}</div>
                {Object.entries(brandName).map(([brand, orders]) => (
                  <div key={brand}>
                    {orders.map((order) => (
                      <Disclosure key={order.groupId}>
                        <div className="flex flex-col border-[1.5px] rounded-md my-4 shadow-md">
                          <Disclosure.Button className="h-full flex p-4">
                            <div className="flex p-4">
                              <Image
                                src={order.productImageUrl}
                                alt={order.productNameAndTotalCount}
                                width={100}
                                height={100}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex flex-col w-full text-start p-4">
                              <span className="font-semibold text-lg lg:text-2xl">
                                {order.brandName}
                              </span>
                              <div className="border-t border-slate-200 dark:border-slate-700 my-4 md:my-4 flex-shrink-0"></div>
                              <span className="text-base font-semibold">
                                {order.productNameAndTotalCount}
                              </span>
                              <span className="">
                                {order.totalPrice.toLocaleString('ko-KR', {
                                  style: 'currency',
                                  currency: 'KRW',
                                })}
                              </span>
                              <div className="flex gap-4">
                                {/* <span className="">
                                  {order.vendorsOrderListStatus}
                                </span> */}
                                <span className="">
                                  {order.vendorsOrderListStatusDescription}
                                </span>
                              </div>
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col h-fulld p-4">
                            {order.orderDetailList.map((product) => (
                              <div
                                key={product.productId}
                                className="flex border-[0.5px] my-1 rounded-md shadow-md"
                              >
                                <div>
                                  <Link href={`/product/${product.productId}`}>
                                    <Image
                                      src={`${product.productImageUrl}`}
                                      alt={`${product.productName}`}
                                      width={150}
                                      height={150}
                                    />
                                  </Link>
                                </div>
                                <div className="flex flex-col w-full h-full text-start p-4 ">
                                  <span className="font-semibold">
                                    {product.productName}
                                  </span>
                                  <div className="border-t border-slate-200 dark:border-slate-700 my-2 md:my-2 flex-shrink-0"></div>
                                  <div className="flex gap-2">
                                    <Icon type="color" />
                                    <span className="">
                                      {product.productColor}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Icon type="size" />
                                    <span className="">
                                      {product.productSize}
                                    </span>
                                  </div>
                                  <span className="">
                                    {product.productStock}개
                                  </span>
                                  <span className="">
                                    {product.productPrice.toLocaleString(
                                      'ko-KR',
                                      {
                                        style: 'currency',
                                        currency: 'KRW',
                                      }
                                    )}
                                    원
                                  </span>
                                  <span className="">
                                    {product.productDiscountRate !== 0
                                      ? '-' +
                                        product.productDiscountRate.toLocaleString(
                                          'ko-KR',
                                          {
                                            style: 'currency',
                                            currency: 'KRW',
                                          }
                                        ) +
                                        '원'
                                      : ''}
                                  </span>
                                  <span className="">
                                    {product.couponDiscountPrice !== 0
                                      ? '-' +
                                        product.couponDiscountPrice.toLocaleString(
                                          'ko-KR',
                                          {
                                            style: 'currency',
                                            currency: 'KRW',
                                          }
                                        ) +
                                        '원'
                                      : ''}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </div>
                      </Disclosure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
