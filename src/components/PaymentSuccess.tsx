'use client'
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { Payment } from '@/types/payment/payment';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function PaymentSuccess() {
    const param = useSearchParams()
    const [data, setData] = useState<Payment>()
    const paymentKey = param.get('paymentKey')
    const orderId = param.get('orderId')
    const amount = param.get('amount')

    if (typeof window !== 'undefined') {
        const paymentProduct = localStorage.getItem('paymentProduct')
    }


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post<Payment>('https://api.tosspayments.com/v1/payments/confirm', {
                    paymentKey: paymentKey,
                    orderId: orderId,
                    amount: amount,
                }, {
                    headers: {
                        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_PAYMENTS_SECRET_KEY}:`).toString("base64")}`,
                        'Content-Type': 'application/json'
                    }
                });

                setData(response.data);
                console.log(response.data)
            } catch (err: any) {
                console.error("err", err.response.data);
            }

        }

        getData();
    }, [])


    return (
        <div className='bg-gray-100'>
            <div className="max-w-md mx-auto grid grid-cols-1 gap-4 py-32">
                <div className='box-border pb-4'>
                    <h1 className="text-3xl font-bold mb-10 text-center">주문 완료!</h1>
                    <div className="bg-white rounded-md overflow-hidden shadow-md mb-4">
                        <table className="min-w-full">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold align-top">주문번호</td>
                                    <td className="py-2 px-4">
                                        2165464656156446465
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold align-top">배송지</td>
                                    <td className="py-2 px-4">
                                        <div className='flex'>소정완</div>
                                        <div className='flex'>01012345678</div>
                                        <div className='flex'>부산광역시 해운대구</div>
                                        <div className='flex'>5202</div>
                                        <div className='flex'>경비실에 두세요</div>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold align-top">결제 수단</td>
                                    <td className="py-2 px-4">
                                        <div className='flex'>네이버페이</div>
                                        <div className='flex'></div>
                                    </td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold align-top">총 결제금액</td>
                                    <td className="py-2 px-4">15730000원</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link href='/'>
                        <ButtonPrimary className='w-full'>
                            홈으로
                        </ButtonPrimary>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess