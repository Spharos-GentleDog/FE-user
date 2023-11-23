import { AddressType } from '@/types/userType';
import CustomNav2 from './Header/CustomNav2';

/**
 * 배송지 주소
 */
export default function AddressForm({
  onCloseModalAddress,
  data,
}: {
  onCloseModalAddress: () => void;
  data: AddressType;
}) {
  const address = data || [];

  return (
    <>
      {/* todo: 색상 변경, 데이터 패칭 */}
      <div className="p-4 lg:px-0 space-y-2">
        <CustomNav2 title="배송지 선택" onCloseActive={onCloseModalAddress} />

        { address && address.map((address) =>(
          <div
            key={`address-${address?.id}`}
            className="box-border border-gray-400 rounded-sm border-[1.5px] p-4 "
          >
            <h3 className="flex-col rounded-none text-slate-700 dark:text-slate-300 flex ">
              <span className="flex">{address.addressAlias}</span>
              <span className="flex">{address.recipientName}</span>
              <span className="flex">{address.userAddress}</span>
              <span className="flex">{address.recipientPhoneNumber}</span>
              <span className="flex">{`공동현관 비밀번호: ${address.entrancePassword}`}</span>
              <span className="flex">{`요청사항: ${address.addressRequestMessage}`}</span>
            </h3>
            <div className="flex gap-2 pt-2">
              <button className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
                수정
              </button>
              <button className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
                선택
              </button>
            </div>
          </div>
        ))}
        <div className="">
          <button className="box-border border-black border-[1px] px-4 py-2 rounded-md w-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
            배송지 추가
          </button>
        </div>
      </div>
    </>
  );
}
