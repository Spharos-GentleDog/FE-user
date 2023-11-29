'use client'

import React from 'react'
import { useEffect, useRef, useState } from "react";
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";
import toast from 'react-hot-toast';
import Toast from './Toast';

function Payment({
    paymentClicked,
    setPaymentClicked,
    paymentProduct,
    price
}: {
    paymentClicked: boolean
    setPaymentClicked: React.Dispatch<React.SetStateAction<boolean>>
    paymentProduct: any
    price: number
}) {
    // const clientKey = process.env.TOSS_PAYMENTS_;
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance["renderPaymentMethods"]
    > | null>(null);
    console.log("paymentPrice", price)
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
        if (paymentClicked) {
            // const productCodes = paymentProduct.map((product: { productCode: number }) => product.productCode);
            // const queryParams = JSON.stringify(productCodes);
            // console.log(queryParams)

            // const inventoryCheck = async () => {
            //     const res = await fetch(`/api/inventor?productCode=${queryParams}`, {
            //         method: "GET",
            //         headers: {
            //             "Content-Type": "application/json",~V
            //         },
            //     });
            //     const result = await res.json();
            //     if (result.result === true) {
            //         return true
            //     }
            // }


            const getData = async () => {
                const paymentWidget = paymentWidgetRef.current;
                try {
                    await paymentWidget?.requestPayment({
                        orderId: nanoid(),
                        orderName: `${paymentProduct[0].productName} 외 ${paymentProduct.length - 1}건`,
                        customerName: "김토스",
                        customerEmail: "customer123@gmail.com",
                        totalAmount: price,
                        successUrl: `${window.location.origin}/checkout/success`,
                        failUrl: `${window.location.origin}/checkout/fail`,
                    });
                } catch (error) {
                    toast.custom((t) => (
                        <Toast message=
                            {(error as Error).message} />
                    ));
                }
            };
            getData();
            setPaymentClicked(false)
        }
    }, [paymentClicked]);

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
        </main>
    )
}

export default Payment