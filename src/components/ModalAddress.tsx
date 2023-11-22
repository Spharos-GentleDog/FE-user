import { Dialog, Transition } from '@/app/headlessui';
import ButtonClose from '@/shared/ButtonClose/ButtonClose';
import React, { Fragment } from 'react';
import AddressForm from './AddressForm';
import { AddressType } from '@/types/userType';

export interface ModalAddressProps {
  show: boolean;
  onCloseModalAddress: () => void;
  data: AddressType;
}

/**
 * todo: 사용자의 배송지 주소를 불러오는 데이터 패칭
 * 배송지 추가 버튼을 눌렀을 때 배송지를 추가하는 폼 제작, 수정을 눌렀을 때 수정하는 폼과 같이 사용하면 될 듯
 * 주소지를 선택하면 배송지 정보가 출력되도록 로직 작성
 *
 */

/**
 * 주소 모달 배경
 */
function ModalAddress({ show, onCloseModalAddress, data }: ModalAddressProps) {
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
                <div className="flex-1 overflow-y-auto hiddenScrollbar">
                  {/* todo: address 디자인 작업 컴포넌트 넣기*/}
                  <AddressForm
                    onCloseModalAddress={onCloseModalAddress}
                    data={data}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalAddress;
