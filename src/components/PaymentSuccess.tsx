import React from 'react'
import axios from "axios";
import { GetServerSideProps } from "next";

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

console.log("error : 1")
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    console.log("error : 2")
    const {
        query: { paymentKey, orderId, amount },
    } = context;

    try {
        // ------  결제 승인 ------
        // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
        const { data: payment } = await axios.post<Payment>(
            "https://api.tosspayments.com/v1/payments/confirm",
            {
                paymentKey,
                orderId,
                amount,
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`
                    ).toString("base64")}`,
                },
            }
        );
        console.log("error : 3")
        console.log("payment", payment)
        return {
            props: { payment },
        };
    } catch (err: any) {
        console.error("err", err.response.data);

        return {
            redirect: {
                destination: `fail?code=${err.response.data.code}&message=${encodeURIComponent(err.response.data.message)}`,
                permanent: false,
            },
        };
    }


};

interface Props {
    payment: Payment;
}

function PaymentSuccess({ payment }: any) {
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
                    <p>paymentKey = {payment?.paymentKey}</p>
                    <p>orderId =  {payment?.orderId}</p>
                    <p>amount = {payment?.totalAmount.toLocaleString()}원</p>
                </div>
            </div>
        </main>
    )
}

export default PaymentSuccess