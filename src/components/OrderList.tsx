import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

export default function OrderList() {
  return (
    <>
      <span className="my-4">2023. 11. 26 주문</span>
      <div className="border-[1.5px] p-4 w-full mt-2">
        {/* 여기 누르면 드랍다운으로 상세보기 */}
        <div className="">
          <span>주문번호@!@@@@@@@@@@</span>
          <div className="flex w-full mt-4"></div>
          <Disclosure>
            <div className="flex flex-col">
              <Disclosure.Button className="h-full flex h-auto">
                <Image
                  src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                  alt="임시 이름 어쩌구"
                  width={100}
                  height={100}
                />
                <div className="border-[1.5px] p-4 flex flex-col w-full h-full">
                  <span className="">브랜드 이름</span>
                  <span className="">브랜드 이름</span>
                  <span className="">브랜드 이름</span>
                  <span className="">브랜드 이름</span>
                  <span className="">브랜드 이름</span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <Image
                  src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                  alt="임시 이름 어쩌구"
                  width={100}
                  height={100}
                />
              </Disclosure.Panel>
            </div>
          </Disclosure>
        </div>
      </div>
    </>
  );
}
