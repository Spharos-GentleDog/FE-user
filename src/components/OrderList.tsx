import { OrderListProps, OrderListType } from '@/types/orderType';
import { Disclosure } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';

// 3. CSS 수정도 필요하다
// 4. 대표 상품의 이미지를 출력해야 한다.
// 5. 변동이 생길 예정

export default function OrderList() {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  const [nextGroup, setNextGroup] = useState();
  const [groupedOrders, setGroupedOrders] = useState<
    Record<string, Record<string, Record<string, OrderListType[]>>>
  >({});

  // 데이터 페칭
  useEffect(() => {
    async function fetchOrderList() {
      const response = await fetch(
        `${process.env.BASE_API_URL}/api/v1/orders/user?groupId=`,
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
      console.log(orderList);
      setNextGroup(orderList.result.nextGroupId);
      const groupedordersList = groupOrders(
        orderList.result.vendorsOrderSummaryOutResponseDtoList
      );
      setGroupedOrders(groupedordersList);
      console.log('groupedordersList', groupedordersList);
    }
    fetchOrderList();
  }, []);

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

  // 스크롤 위치에 따라 추가적인 페칭을 진행
  async function fetchNextOrderList() {
    if (nextGroup === null) {
      return;
    }
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/v1/orders/user?groupId=${nextGroup}`,
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
    console.log(orderList);
    setNextGroup(orderList.result.nextGroupId);
    const nextGroupedOrders = groupOrders(
      orderList.result.vendorsOrderSummaryOutResponseDtoList
    );
    setGroupedOrders({ ...groupedOrders, ...nextGroupedOrders });
  }

  // 스크롤 위치를 감지해서 페칭 진행
  useEffect(() => {
    const handleScroll = async () => {
      // 스크롤 위치가 페이지 하단에 도달했는지 확인
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        await fetchNextOrderList(); // 페이지 하단에 도달했을 때 추가 데이터 페칭
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
        <div key={date} className="date-group">
          <span className="my-4">{date} 주문</span>
          {Object.entries(ordersOnDate).map(([orderNumber, brandName]) => (
            <div
              key={orderNumber}
              className="border-[1.5px] rounded-md p-4 w-full mt-2"
            >
              <div className="order-number">
                <span>주문번호: {orderNumber}</span>
                {Object.entries(brandName).map(([brand, orders]) => (
                  <div key={brand}>
                    {orders.map((order) => (
                      <Disclosure key={order.groupId}>
                        <div className="flex flex-col border-[1.5px] rounded-md divide-y-2">
                          <Disclosure.Button className="h-full flex space-y-6 ">
                            <div className="flex">
                              <Image
                                src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                                alt="임시 이름 어쩌구"
                                width={100}
                                height={100}
                                className="rounded-md"
                              />
                            </div>
                            <div className="flex flex-col w-full">
                              <span className="">{order.brandName}</span>
                              <span className="">
                                {order.productNameAndTotalCount}
                              </span>
                              <span className="">{order.totalPrice}</span>
                              <span className="">
                                {order.vendorsOrderListStatus}
                              </span>
                              <span className="">
                                {order.vendorsOrderListStatusDescription}
                              </span>
                            </div>
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col h-full">
                            {order.orderDetailList.map((product) => (
                              <div
                                key={product.productId}
                                className="flex space-y-2"
                              >
                                <div>
                                  <Link href={`/product/${product.productId}`}>
                                    <Image
                                      src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                                      // src={`${product.productImageUrl}`}
                                      alt={`${product.productName}`}
                                      width={100}
                                      height={100}
                                    />
                                  </Link>
                                </div>
                                <div className="py-4 flex flex-col w-full h-full">
                                  <span className="">
                                    {product.productName}
                                  </span>
                                  <span className="">
                                    {product.productColor}
                                  </span>
                                  <span className="">
                                    {product.productSize}
                                  </span>
                                  <span className="">
                                    {product.productStock}
                                  </span>
                                  <span className="">
                                    {product.productPrice}
                                  </span>
                                  <span className="">
                                    {product.productDiscountRate}
                                  </span>
                                  <span className="">
                                    {product.couponDiscountPrice}
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
