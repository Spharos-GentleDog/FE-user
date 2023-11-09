import Label from "@/components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

/**
 * 주문자 정보 수정
 */
const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
  const renderAccount = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">수령자 정보</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            {/* todo: 데이터  */}
            <div className="font-semibold mt-1 text-sm">
              <span className="">소정완</span>
              <span className="ml-3 tracking-tighter">+82 010 - 6666 - 7744</span>
            </div>
          </div>
          <button
            className="break-keep py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={() => onOpenActive()}
          >
            변경
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between flex-wrap items-baseline">
            <h3 className="text-lg font-semibold">주문자 정보</h3>
            <span className="block text-sm my-1 md:my-0">
              계정있냐?{` `}
              <a href="##" className="text-primary-500 font-medium">
                Log in
              </a>
            </span>
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">연락처</Label>
            <Input className="mt-1.5" defaultValue={"+808 xxx"} type={"tel"} />
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">이메일 주소</Label>
            <Input className="mt-1.5" type={"email"} />
          </div>
          <div>
            <Checkbox
              className="!text-sm"
              name="uudai"
              label="이메일로 할인, 새로운 제품, 이벤트 등의 소식을 받겠습니다."
              defaultChecked
            />
          </div>

          {/* 기능 활성화 */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="w-full sm:!px-7 shadow-none"
              onClick={() => onCloseActive()}
            >
              저장
            </ButtonPrimary>
            <ButtonSecondary
              className="w-full mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              취소
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
