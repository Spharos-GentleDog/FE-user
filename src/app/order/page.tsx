'use client';

import OrderList from '@/components/OrderList';
import Image from 'next/image';
import React from 'react';

export default function Order() {
  return (
    <>
      <div className="p-8">
        <h2>주문내역</h2>
        <OrderList />
      </div>
    </>
  );
}
