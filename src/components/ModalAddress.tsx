'use client';
import { Dialog, Transition } from '@/app/headlessui';
import { AddressType } from '@/types/userType';
import { Fragment, useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import CustomNav2 from './Header/CustomNav2';
import AddressRegister from './AddressRegister';
import AddressEdit from './AddressEdit';
import { useSession } from 'next-auth/react';

export interface ModalAddressProps {
  show: boolean;
  onCloseModalAddress: () => void;
  data: AddressType[];
  loadAddress: () => void;
  setAddress: (address: AddressType[]) => void;
  setDefaultAddress: (address: AddressType) => void;
}

/**
 * 주소 모달 배경
 */
export default function ModalAddress({
  show,
  onCloseModalAddress,
  data,
  setAddress,
  setDefaultAddress,
}: ModalAddressProps) {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;

  // 초기 화면은 주소 목록
  const [activeAddress, setActiveAddress] = useState<string>('select');
  // 주소 수정 시 수정할 주소 정보
  const [editAddress, setEditAddress] = useState<AddressType>();

  const addressHandlers = {
    showSelect: () => setActiveAddress('select'),
    showRegister: () => setActiveAddress('register'),
    showEdit: () => setActiveAddress('edit'),
    closeModal: onCloseModalAddress,
    reLoadAddress: reLoadAddress,
    setDefaultAddress: setDefaultAddress,
    setEditAddress: setEditAddress,
  };

  async function reLoadAddress() {
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
      if (res.status === 200) {
        setAddress(data.result);
      }
    } catch (e) {
      console.error('Failed to fetch address', e);
    }
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50"
        onClose={onCloseModalAddress}
      >
        <div className="flex items-stretch md:items-center justify-center h-full text-center md:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-flex xl:py-8 w-full max-w-5xl max-h-full">
              <div
                className="flex-1 flex overflow-hidden max-h-full lg:px-8 w-full text-left align-middle transition-all transform lg:rounded-2xl bg-white 
              dark:bg-neutral-900 dark:border dark:border-slate-700 dark:text-slate-100 shadow-xl"
              >
                <div className="AddressList flex-1 overflow-y-auto hiddenScrollbar">
                  {/* todo: address 디자인 작업 컴포넌트 넣기*/}
                  {activeAddress === 'select' && (
                    <AddressForm data={data} handlers={addressHandlers} />
                  )}
                  {activeAddress === 'register' && (
                    <AddressRegister handlers={addressHandlers} />
                  )}
                  {activeAddress === 'edit' && editAddress && (
                    <AddressEdit editAddress={editAddress} handlers={addressHandlers} />
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
