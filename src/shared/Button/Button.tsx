"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import { Route } from "@/routers/types";
import Link from "next/link";
import Icon from "@/components/Icon";

export interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: Route;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

/** 
 * @returns 버튼
 */
const Button: FC<ButtonProps> = ({
  className = "text-neutral-700 dark:text-neutral-200 disabled:cursor-not-allowed",
  translate = "",
  sizeClass = "py-3 px-4 sm:py-3.5 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
}) => {
  const CLASSES =
    `nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${translate} ${className} ` +
    twFocusClass(true);

    /** 로딩중 아이콘*/
  const _renderLoading = () => {
    return (
      <Icon type="loading"/>
    );
  };

  if (!!href) {
    return (
      <Link href={href} className={`${CLASSES} `} onClick={onClick}>
        {children || `This is Link`}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && _renderLoading()}
      {children || `This is Button`}
    </button>
  );
};

export default Button;
