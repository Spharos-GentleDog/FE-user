import { AddressType } from '@/types/userType';
import CustomNav2 from './Header/CustomNav2';
import Icon from './Icon';
import { useSession } from 'next-auth/react';

// 핸들러들의 타입 정의
interface AddressHandlers {
  showSelect: () => void;
  showRegister: () => void;
  showEdit: () => void;
  closeModal: () => void;
  reLoadAddress: () => void;
  setDefaultAddress: (address: AddressType) => void;
  setEditAddress: (address: AddressType) => void;
}

// AddressForm 컴포넌트의 props 타입 정의
interface AddressFormProps {
  // onCloseModalAddress: () => void;
  data: AddressType[];
  handlers: AddressHandlers; // 여기에 핸들러들의 타입을 추가
}

/**
 * 배송지 주소
 */
export default function AddressForm({
  // onCloseModalAddress,
  data,
  handlers,
}: AddressFormProps) {
  const address = data;
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  async function deletAddress(addressId: number) {
    try {
      const res = await fetch(
        `${process.env.BASE_API_URL}/api/v1/user/address?addressId=` +
          addressId +
          ``,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log('data', data);
    } catch (e) {
      console.error('Failed to fetch address', e);
    }
  }

  const handleDeleteAddress = async (addressId: number) => {
    await deletAddress(addressId);
    handlers.reLoadAddress();
  };

  const handleSelectAddress = (address: AddressType) => {
    handlers.setDefaultAddress(address);
    handlers.closeModal();
  };

  const handleEditAddress = (address: AddressType) => {
    handlers.setEditAddress(address);
    handlers.showEdit();
  };

  return (
    <>
      {/* todo: 색상 변경 */}
      <div className="p-4 lg:px-0 space-y-2">
        <CustomNav2 title="배송지 선택" onCloseActive={handlers.closeModal} />
        {address &&
          address.map((address) => (
            <div
              key={`address-${address?.addressId}`}
              className="box-border border-gray-400 rounded-sm border-[1.5px] p-4 "
            >
              <div className="flex flex-col rounded-none text-slate-700 dark:text-slate-300 ">
                <div className="flex gap-1">
                  <span className="">{address?.addressAlias}</span>
                  {address?.defaultAddress === true && (
                    <div className="gap-0 flex">
                      <Icon
                        className="text-blue-600 dark:text-yellow-300"
                        type="alias"
                      />
                      <div className="text-blue-600 dark:text-yellow-300">
                        기본 배송지
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Icon type="account" />
                  <span className="">{address?.recipientName}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="map" />
                  <span className="">{address?.userAddress}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="phone" />
                  <span className="">{address?.recipientPhoneNumber}</span>
                </div>
                {address?.entrancePassword !== '' && (
                  <div className="flex gap-1">
                    <Icon type="lockopen" />
                    <span className="">{`공동현관 비밀번호: ${address.entrancePassword}`}</span>
                  </div>
                )}
                {address?.addressRequestMessage !== '' && (
                  <div className="flex gap-1">
                    <Icon type="message" />
                    <span className="">{`요청사항: ${address.addressRequestMessage}`}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  onClick={() => handleEditAddress(address)}
                >
                  수정
                </button>
                <button
                  className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  onClick={() => handleSelectAddress(address)}
                >
                  선택
                </button>
                <button
                  className="box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  onClick={() => handleDeleteAddress(address?.addressId)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        <div className="">
          <button
            className="box-border border-black border-[1px] px-4 py-2 rounded-md w-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={handlers.showRegister}
          >
            배송지 추가
          </button>
        </div>
      </div>
    </>
  );
}
