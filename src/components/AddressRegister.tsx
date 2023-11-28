'use client';
import { ChangeEvent, useState } from 'react';
import CustomNav2 from './Header/CustomNav2';
import Icon from './Icon';
import Checkbox from '@/shared/Checkbox/Checkbox';
import { useSession } from 'next-auth/react';
import { AddressType } from '@/types/userType';

// 핸들러들의 타입 정의
interface AddressHandlers {
  showSelect: () => void;
  showRegister: () => void;
  showEdit: () => void;
  closeModal: () => void;
  reLoadAddress: () => void;
}
// handlers: AddressHandlers
export default function AddressRegister({
  handlers,
}: {
  handlers: AddressHandlers;
}) {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;
  /** 입력 폼 데이터 */
  const [formData, setFormData] = useState({
    addressAlias: '',
    recipientName: '',
    userAddress: '',
    userDetailAddress: '',
    recipientPhoneNumber: '',
    entrancePassword: '',
    addressRequestMessage: '',
    defaultAddress: false,
  });

  /** 입력 시 저장 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // 체크박스와 일반 입력 필드를 다르게 처리
    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  /** 등록 버튼 클릭 시 제출 */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fullAddress = formData.userAddress + formData.userDetailAddress;
    const requestData = {
      ...formData,
      userAddress: fullAddress,
    };
    console.log('requestData', requestData);
    try {
      const res = await fetch(
        `${process.env.BASE_API_URL}/api/v1/user/address`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        console.log('data', data);
        // handlers.showSelect();
      }
    } catch (e) {
      console.error('Failed to fetch address', e);
    }
  }

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    await handleSubmit(e);
    handlers.reLoadAddress();
    handlers.showSelect();
  }

  return (
    <div className="p-4 lg:px-0 space-y-2 ">
      <CustomNav2 title="배송지 등록" onCloseActive={handlers.showSelect} />
      <form onSubmit={handleClick}>
        <div className="flex-col  flex space-y-2">
          <div className="flex ">
            <Icon
              type="alias"
              className="items-center flex px-2 border-black border bg-slate-100 border-r-0 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm"
            />
            <input
              name="addressAlias"
              className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm"
              type="text"
              placeholder="배송지 명"
              value={formData.addressAlias}
              onChange={handleChange}
            />
          </div>
          <div className="flex  ">
            <Icon
              type="account"
              className="items-center flex px-2 border-black border bg-slate-100 border-r-0 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm"
            />
            <input
              name="recipientName"
              className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm"
              type="text"
              placeholder="받는 사람"
              value={formData.recipientName}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <Icon
              type="map"
              className="items-center flex px-2 border-black border bg-slate-100 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm "
            />
            <div className="flex-col w-full space-y-2">
              <input
                name="userAddress"
                className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm border-l-0"
                type="text"
                disabled
                placeholder="주소인데 api 사용해야됨"
                value={formData.userAddress}
                onChange={handleChange}
              />
              <input
                name="userDetailAddress"
                className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm border-l-0"
                type="text"
                placeholder="상세 주소"
                value={formData.userDetailAddress}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex ">
            <Icon
              type="phone"
              className="items-center flex px-2 border-black border bg-slate-100 border-r-0 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm"
            />
            <input
              name="recipientPhoneNumber"
              className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm"
              type="tel"
              placeholder="핸드폰 번호"
              value={formData.recipientPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex ">
            <Icon
              type="lockopen"
              className="items-center flex px-2 border-black border bg-slate-100 border-r-0 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm"
            />
            <input
              name="entrancePassword"
              className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm"
              type="text"
              placeholder="공동현관 비밀번호(선택)"
              value={formData.entrancePassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex ">
            <Icon
              type="message"
              className="items-center flex px-2 border-black border bg-slate-100 border-r-0 dark:bg-neutral-900  dark:border-neutral-200 rounded-l-sm"
            />
            <input
              name="addressRequestMessage"
              className="w-full dark:bg-neutral-900 dark:placeholder:text-neutral-400 dark:border-neutral-200 rounded-r-sm"
              type="text"
              placeholder="요청 사항(선택)"
              value={formData.addressRequestMessage}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            name="defaultAddress"
            label="기본 배송지로 설정"
            onChange={(isChecked) =>
              setFormData({ ...formData, defaultAddress: isChecked })
            }
            isChecked={formData.defaultAddress}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            className="hidden lg:block w-full box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
            onClick={handlers.showSelect}
          >
            취소
          </button>
          <button
            className="w-full box-border border-black border-[1px] px-4 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
            type="submit"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
