import Image from 'next/image';
import React from 'react';

export default function Order() {
  return (
    <>
      <div className="p-8">
        <h2>주문내역</h2>
        <span className="my-4">2023. 11. 26 주문</span>
        <div className="border-[1.5px] p-4 w-full mt-2">
          {/* 여기 누르면 드랍다운으로 상세보기 */}
          <div className="">
            <span>주문번호@!@@@@@@@@@@</span>
            <div className="flex w-full mt-4">
              <Image
                src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                alt="임시 이름 어쩌구"
                width={100}
                height={100}
              />
              <div className="border-[1.5px] p-4 flex flex-col w-full">
                <span>브랜드 이름</span>
                <span>상품이름 어쩌구 저쩌구 외 2개</span>
              </div>
              <div className="border-[1.5px] border-l-0">
                이것저것 추가할 내용
              </div>
            </div>

            <div className="flex w-full mt-4">
              <Image
                src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                alt="임시 이름 어쩌구"
                width={100}
                height={100}
              />
              <div className="border-[1.5px] p-4 flex flex-col w-full">
                <span>브랜드 이름</span>
                <span>상품이름 어쩌구 저쩌구 외 2개</span>
              </div>
              <div className="border-[1.5px] border-l-0">
                이것저것 추가할 내용
              </div>
            </div>

            <div className="flex w-full mt-4">
              <Image
                src="https://gentledog.s3.ap-northeast-2.amazonaws.com/product/10.jpg"
                alt="임시 이름 어쩌구"
                width={100}
                height={100}
              />
              <div className="border-[1.5px] p-4 flex flex-col w-full">
                <span>브랜드 이름</span>
                <span>상품이름 어쩌구 저쩌구 외 2개</span>
              </div>
              <div className="border-[1.5px] border-l-0">
                이것저것 추가할 내용
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
