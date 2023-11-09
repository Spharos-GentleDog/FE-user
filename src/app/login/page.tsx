import React from "react";
import Link from "next/link";
import Logo from "@/shared/Logo/Logo";
import LoginOauth from "@/components/LoginOauth";
import LoginForm from "@/components/LoginForm";


const PageLogin = () => {
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <Logo isLogoName className="h-40" />
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <LoginOauth />
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          <LoginForm />
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            회원이 아닌가요? {` `}
            <Link className="text-green-600" href="/signup" prefetch={false}>
              회원가입
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
