'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



interface Payment {
    orderName: string;
    approvedAt: string;
    receipt: {
        url: string;
    };
    totalAmount: number;
    method: "카드" | "가상계좌" | "계좌이체";
    paymentKey: string;
    orderId: string;
}

interface Props {
    payment: Payment;
}

function PaymentSuccess() {
    const param =useSearchParams()
    const [data, setData] = useState<Payment>()
    const paymentKey = param.get('paymentKey')
    const orderId = param.get('orderId')
    const amount = param.get('amount')
    console.log(paymentKey, orderId, amount)

useEffect(() => {
    const getData = async () => {
    try {
            const response = await axios.post<Payment>('https://api.tosspayments.com/v1/payments/confirm', {
                    paymentKey: paymentKey,
                    orderId: orderId,
                    amount: amount
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
        <main>
            <div className="result wrapper">
                <div className="box_section">
                    <h2 style={{ padding: "20px 0px 10px 0px" }}>
                        <img
                            width="35px"
                            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
                        />
                        결제 성공
                    </h2>
                    <p>paymentKey = {data?.paymentKey}</p>
                    <p>orderId =  {data?.orderId}</p>
                    <p>amount = {data?.totalAmount.toLocaleString()}원</p>
                </div>
            </div>
        </main>
    )
}

export default PaymentSuccess