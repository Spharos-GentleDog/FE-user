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
import Icon from '../Icon';

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
  const [address, setAddress] = useState<AddressType[]>();
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;
  const [defaultAddress, setDefaultAddress] = useState<AddressType>();

  useEffect(() => {
    if (address) return;
    if (!token) return;
    async function loadDefaultAddress() {
      try {
        const res = await fetch(
          'https://gentledog-back.duckdns.org/api/v1/user/address/default',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              userEmail: userEmail,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log('res', res);
        const data = await res.json();
        // console.log('data', data);
        setDefaultAddress(data.result as AddressType);
      } catch (e) {
        console.error('Failed to fetch defaultAddress', e);
      }
    }
    loadDefaultAddress();
  }, []);

  async function loadAddress() {
    try {
      const res = await fetch(
        'https://gentledog-back.duckdns.org/api/v1/user/address',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAddress(data.result as AddressType[]);
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
          <div className="sm:ml-4">
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
              <div
                key={`address-${defaultAddress?.addressId}`}
                className="flex-col font-semibold mt-1 text-sm divide-y-2"
              >
                <div className="flex gap-1">
                  <Icon type="account" />
                  <span className="">{defaultAddress?.addressAlias}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="account" />
                  <span className="">{defaultAddress?.recipientName}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="map" />
                  <span className="">{defaultAddress?.userAddress}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="phone" />
                  <span className="">
                    {defaultAddress?.recipientPhoneNumber}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Icon type="lockopen" />
                  <span className="">{`공동현관 비밀번호: ${defaultAddress?.entrancePassword}`}</span>
                </div>
                <div className="flex gap-1">
                  <Icon type="message" />
                  <span className="">{`요청사항: ${defaultAddress?.addressRequestMessage}`}</span>
                </div>
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
            // show={true}
            onCloseModalAddress={() => setIsModalAddress(false)}
            data={address}
            loadAddress={loadAddress}
            setAddress={setAddress}
            setDefaultAddress={setDefaultAddress}/>
        )}
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
