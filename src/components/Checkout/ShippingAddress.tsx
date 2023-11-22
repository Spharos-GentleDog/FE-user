'use client';

import Label from '@/components/Label/Label';
import React, { FC, useEffect, useState } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Input from '@/shared/Input/Input';
import Radio from '@/shared/Radio/Radio';
import Select from '@/shared/Select/Select';
import ModalAddress from '@/components/ModalAddress';
import { useSession } from 'next-auth/react';
import { on } from 'events';
import { AddressType } from '@/types/userType';

interface Props {
  onOpenActive: () => void;
}

/**
 * todo: 대표 배송지 바로 불러오도록 데이터 패칭
 * 출력되는 정보 추가
 * 지도 이미지 아이콘 변경
 * 모달 내용 수정
 * addressId: number;
  userAddress: string;
  recipientName: string;
  recipientPhoneNumber: string;
  addressName: string;
  entrancePassword: string;
  addressRequestMessage: string;
  isDefault: boolean;
 */

/**
 * 배송지 주소 모달로 변경
 * @param onOpenActive 클릭 시 실행 모달 열기, 스크롤 이동
 */
const ShippingAddress = ({ onOpenActive }: Props) => {
  const [address, setAddress] = React.useState<AddressType>();
  const session = useSession();
  const token = session?.data?.user.accessToken;
  console.log('token', token);
  const [defaultAddress, setDefaultAddress] = useState<AddressType>();

  
  useEffect(() => {
    if(address) return;
    if(!token) return;
    async function loadDefaultAddress() {
      try {
        const res = await fetch(
          'https://gentledog-back.duckdns.org/api/v1/user/address/default',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              userEmail: 'jeongs9203@naver.com',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('res', res);
        const data = await res.json();
        // console.log('data', data);
        setDefaultAddress(data.result);
      } catch (e) {
        console.error('Failed to fetch defaultAddress', e);
      }
    }
    loadDefaultAddress();
  },[]);

  async function loadAddress() {
    try {
      const res = await fetch(
        'https://gentledog-back.duckdns.org/api/v1/user/address',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userEmail: 'jeongs9203@naver.com',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      setAddress(data.result);
      if (res.status === 200) {
        setIsModalAddress(true);
        onOpenActive();
      }
    } catch (e) {
      console.error('Failed to fetch address', e);
    }
  }

  const handleOpenModal = async () => {
    await loadAddress();
  };

  const [isModalAddress, setIsModalAddress] = useState(false);
  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">배송 정보</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            {defaultAddress && (
              <div className="flex-col font-semibold mt-1 text-sm">
                <span className="flex">{defaultAddress?.addressAlias}</span>
                <span className="flex">{defaultAddress?.recipientName}</span>
                <span className="flex">{defaultAddress?.userAddress}</span>
                <span className="flex">
                  {defaultAddress?.recipientPhoneNumber}
                </span>
                <span className="flex">{`공동현관 비밀번호: ${defaultAddress?.entrancePassword}`}</span>
                <span className="flex">{`요청사항: ${defaultAddress?.addressRequestMessage}`}</span>
              </div>
            )}
          </div>
          {/* 클릭시 모달이 열리고 스크롤 이동 */}
          <button
            className="break-keep py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={handleOpenModal}
          >
            변경
          </button>
        </div>

        {isModalAddress && address && (
          <ModalAddress
            show={isModalAddress}
            onCloseModalAddress={() => setIsModalAddress(false)}
            data={address}
          />
        )}
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
