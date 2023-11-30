'use client';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { DeliveryOrdersInRequest, Payment } from '@/types/payment/payment';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function PaymentSuccess() {
  const session = useSession();
  console.log(session.data?.user.userEmail)
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;
  const param = useSearchParams();
  const [data, setData] = useState<Payment>();
  const paymentKey = param.get('paymentKey');
  const orderId = param.get('orderId');
  const amount = param.get('amount');
  const [orederNumber, setOrderNumber] = useState<string>('');
  const [deliveryOrders, setDeliveryOrders] =
    useState<DeliveryOrdersInRequest>();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            paymentKey: paymentKey,
            orderId: orderId,
            amount: amount,
          },
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`
              ).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setData(response.data);

        let method = '';
        if (response.data.method === '간편결제') {
          if (response.data.easyPay.provider === '토스페이') {
            method = 'TOSS_PAY';
          } else if (response.data.easyPay.provider === '네이버페이') {
            method = 'NAVER_PAY';
          } else if (response.data.easyPay.provider === '카카오페이') {
            method = 'KAKAO_PAY';
          }
        } else {
          if (response.data.method === '카드') {
            method = 'CARD';
          }
        }

        const requestedAt = response.data.requestedAt.substring(
          0,
          response.data.requestedAt.length - 6
        );
        const approverAt = response.data.approvedAt.substring(
          0,
          response.data.approvedAt.length - 6
        );

        if (response.data) {
          console.log(
            'payment',
            localStorage.getItem('paymentProduct') || '{}'
          );

          const res = await fetch(
            `${process.env.BASE_API_URL}/api/v1/orders/payment`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentKey: response.data.paymentKey,
                paymentMethod: method,
                paymentStatus: response.data.status,
                paymentTotalAmount: response.data.totalAmount,
                isPartial: response.data.isPartialCancelable,
                receipt_url: response.data.receipt.url,
                balanceAmount: response.data.balanceAmount,
                requestedAt: requestedAt,
                approvedAt: approverAt,
                usedPoint: 0,
                productPaymentList: JSON.parse(
                  localStorage.getItem('paymentProduct') || '{}'
                ),
              }),
            }
          );
          const result = await res.json();

          if (result.code === 200) {
            setDeliveryOrders(
              JSON.parse(
                localStorage.getItem('deliveryOrdersInRequest') || '{}'
              )
            );

            fetch(`${process.env.BASE_API_URL}/api/v1/orders/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.data?.user.accessToken}`,
                userEmail: `${session.data?.user.userEmail}`,
              },
              body: JSON.stringify({
                deliveryOrdersInRequestDto: JSON.parse(
                  localStorage.getItem('deliveryOrdersInRequest') || '{}'
                ),
                vendorsOrderListInRequestDto: JSON.parse(
                  localStorage.getItem('vendorsOrderListInRequest') || '{}'
                ),
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setOrderNumber(data.result.orderNumber);
              });
            // 장바구니 삭제
            // for문으로 반복
            // productInCartId 를 가져야 한다
            const productInCartIdString =
              localStorage.getItem('productInCartId');
            const productInCartId = JSON.parse(productInCartIdString || '{}');

            if (productInCartId) {
              for (const Id of productInCartId) {
                await deleteCart(Id as number);
              }
            }
          }
        }
      } catch (err: any) {
        console.error('err', err);
      }
    };

    getData();
  }, []);

  async function deleteCart(productInCartId: number) {
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
    const result = await res.json();
    // console.log('result', result);
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-md mx-auto grid grid-cols-1 gap-4 py-32">
        <div className="box-border pb-4">
          <h1 className="text-3xl font-bold mb-10 text-center">주문 완료!</h1>
          <div className="bg-white rounded-md overflow-hidden shadow-md mb-4">
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold align-top">
                    주문번호
                  </td>
                  <td className="py-2 px-4">{orederNumber}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold align-top">배송지</td>
                  <td className="py-2 px-4">
                    <div className="flex">{deliveryOrders?.recipientName}</div>
                    <div className="flex">
                      {deliveryOrders?.recipientPhoneNumber}
                    </div>
                    <div className="flex">
                      {deliveryOrders?.recipientAddress}
                    </div>
                    <div className="flex">
                      {deliveryOrders?.entrancePassword}
                    </div>
                    <div className="flex">
                      {deliveryOrders?.deliveryRequestMessage}
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold align-top">
                    결제 수단
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex">
                      {data?.method}
                      {data?.easyPay && data?.easyPay.provider
                        ? '(' + data.easyPay.provider + ')'
                        : ''}
                    </div>
                    <div className="flex"></div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold align-top">
                    총 결제금액
                  </td>
                  <td className="py-2 px-4">
                    {data?.totalAmount.toLocaleString()}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link href="/">
            <ButtonPrimary className="w-full">홈으로</ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
