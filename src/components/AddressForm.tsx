import React from 'react';
import CustomNav2 from './Header/CustomNav2';

/**
 * 배송지 주소
 */
function AddressForm({
  onCloseModalAddress,
}: {
  onCloseModalAddress: () => void;
}) {
  return (
    <>
      {/* todo: 색상 변경, 데이터 패칭 */}
      <div className="px-4 lg:px-0">
        <CustomNav2 title="배송지 선택" onCloseActive={onCloseModalAddress} />
        <div className="box-border border-gray-400 border-[1.5px] p-4 ">
          <h3 className="rounded-none text-slate-700 dark:text-slate-300 flex ">
            <span className="uppercase font-semibold">소정완</span>
          </h3>
          <div>부산광역시 해운대구 APEC로 17</div>
          <div>010-9999-9999</div>
          <div>요청사항: 문앞에 놓아주세요</div>
          <div className="flex gap-2">
            <button className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
              수정
            </button>
            <button className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
              선택
            </button>
          </div>
        </div>
        <div className='py-4'>
          <button className="box-border border-black border-[1px] px-4 py-2 rounded-md w-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
            배송지 추가
          </button>
        </div>
      </div>
    </>
  );
}

export default AddressForm;
