"use client";

import React from "react";
import { usePathname } from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import { useThemeMode } from "@/hooks/useThemeMode";
import HeaderCustom from "@/components/Header/HeaderCustom";

const SiteHeader = () => {
  useThemeMode();

  let pathname = usePathname();

  return pathname === "/" ? <HeaderLogged /> : <HeaderCustom />;
};

export default SiteHeader;
