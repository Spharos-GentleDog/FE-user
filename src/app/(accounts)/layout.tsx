"use client";

import { Route } from "@/routers/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
    {
      name: "회원정보 수정",
      link: "/account",
    },
    {
      name: "비밀번호 변경",
      link: "/account-password",
    },
    {
      name: "배송지",
      link: "/account-address",
    },
    {
      name: "반려견 정보",
      link: "/account-savelists",
    },
    // {
    //   name: " My order",
    //   link: "/account-order",
    // },
    // {
    //   name: "Change Billing",
    //   link: "/account-billing",
    // },
  ];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="nc-AccountCommonLayout container">
      <div>
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${pathname === item.link
                    ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
