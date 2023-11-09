import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";
import HeaderCustom from "./HeaderCustom";

export interface HeaderLoggedProps {}

/**
 * 
 * @returns 로그인된 헤더를 렌더링합니다. SSR
 */
const HeaderLogged: FC<HeaderLoggedProps> = () => {
  return (
    <>
    <div className="nc-HeaderLogged sticky top-0 w-full z-40">
      <MainNav2Logged />
    </div>
    </>
  );
};

export default HeaderLogged;
