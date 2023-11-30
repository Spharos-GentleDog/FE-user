'use client';

import OrderList from '@/components/OrderList';
import Image from 'next/image';
import React from 'react';

export default function Order() {
  return (
    <>
      <div className="p-8">
        <h2 className="hidden md:block text-lg lg:text-3xl font-semibold mb-4">
          주문내역
        </h2>
        <OrderList />
      </div>
    </>
  );
}
