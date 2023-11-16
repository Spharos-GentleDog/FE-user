import React from 'react'
import { useEffect, useRef, useState } from "react";
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";

function Payment() {
    // const clientKey = process.env.TOSS_PAYMENTS_;
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance["renderPaymentMethods"]
    > | null>(null);
    const [price, setPrice] = useState(50);

    useAsync(async () => {
        const paymentWidget = await loadPaymentWidget('test_ck_jExPeJWYVQ1RezQ2XYPnV49R5gvN', nanoid());
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(

            "#payment-widget",
            { value: price },
            // { variantKey: "DEFAULT" }
        );
        paymentWidget.renderAgreement("#agreement");

        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, []);


    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div id="payment-widget" style={{ width: "100%" }} />
            <div id="agreement" style={{ width: "100%" }} />
            <button
                onClick={async () => {
                    const paymentWidget = paymentWidgetRef.current;

                    try {
                        await paymentWidget?.requestPayment({
                            orderId: nanoid(),
                            orderName: "토스 티셔츠 외 2건",
                            customerName: "김토스",
                            customerEmail: "customer123@gmail.com",
                            totalAmount: price,
                            successUrl: `${window.location.origin}/checkout/success`,
                            failUrl: `${window.location.origin}/checkout/fail`,
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                결제하기
            </button>
        </main>
    )
}

export default Payment