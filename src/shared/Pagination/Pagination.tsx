import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

export interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  categoryTypeParam: string;
  categoryIdParam: string;
  isDiscountParam: string;
}

const Pagination: FC<PaginationProps> = ({ className = "", currentPage, totalPages, categoryTypeParam, categoryIdParam, isDiscountParam }) => {

  const generatePagination = () => {
    const pages: CustomLink[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push({
        label: i.toString(),
        href: `/collection?categoryType=${categoryTypeParam}${categoryIdParam ? `&CategoryId=${categoryIdParam}` : ""}&isDiscount=${isDiscountParam}&page=${i}`
      })
    }
    return pages;
  }
  const renderItem = (pag: CustomLink, index: number) => {
    if (index + 1 === currentPage) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        href={pag.href}
      >
        {pag.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {generatePagination().map(renderItem)}
    </nav>
  );
};

export default Pagination;
