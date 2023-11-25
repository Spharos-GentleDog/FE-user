"use client";

import React, { useEffect } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Logo from "@/shared/Logo/Logo";
import { Disclosure } from "@/app/headlessui";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useThemeMode } from "@/hooks/useThemeMode";
import { ChildCategory, ParentCategoryType } from "@/types/product/category";

export interface NavMobileProps {
  onClickClose?: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
const NavMobile: React.FC<NavMobileProps> = ({
  onClickClose,
}) => {
  /**
   * 하위 카테고리를 렌더링합니다.
   */
  const _renderMenuChild = (
    item: ChildCategory,
    itemClass = "pl-3 text-neutral-900 dark:text-neutral-200 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu break-keep pl-6 pb-1 text-base">
        {item.result?.map((i, index) => (
          <Disclosure as="li" key={index}>
            <Link
              href={{
                pathname: `/collection?categoryId=${i.childCategoryId}` || undefined,
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!item.isSuccess ? "block w-full" : ""}`}
                onClick={onClickClose}
              >
                {i.childCategoryName}
              </span>
            </Link>
            {item.isSuccess && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i as unknown as ChildCategory,
                  "pl-3 text-slate-600 dark:text-slate-400",
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  /**
   * 상위 카테고리를 렌더링합니다.
   */
  const _renderItem = (item: ParentCategoryType, index: number) => {
    return (
      <div>
        <Disclosure
          key={index}
          as="li"
          className="break-keep text-slate-900 dark:text-white"
        >
          <Link
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            href={{
              pathname: `/collection?categoryId=${item.parentCategoryId}` || undefined,
            }}
          >
            <span
              // className="block w-full"
              className={categoryData[index]?.isSuccess ? "block w-full" : ""}
              onClick={onClickClose}
            >
              {item.parentCategoryName}
            </span>
            {categoryData[index]?.isSuccess && (
              <span
                className="block flex-grow"
                onClick={(e) => e.preventDefault()}
              >
                <Disclosure.Button
                  as="span"
                  className="flex justify-end flex-grow"
                >
                  <ChevronDownIcon
                    className="ml-2 h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                  />
                </Disclosure.Button>
              </span>
            )}
          </Link>
          {categoryData[index]?.isSuccess && (
            <Disclosure.Panel>{_renderMenuChild(categoryData[index])}</Disclosure.Panel>
          )}
        </Disclosure>
      </div>
    );
  };

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 text-slate-900 dark:text-slate-200"
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
          {renderMagnifyingGlassIcon()}
          <input
            type="search"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
          />
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  const { _toogleDarkMode } = useThemeMode();

  const [parentCategoryData, setParentCategoryData] = React.useState<ParentCategoryType[]>([]);
  const [categoryData, setCategoryData] = React.useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        setParentCategoryData(data.result.parentCategoryDtoList);

        if (data.isSuccess) {
          const child = data.result.parentCategoryDtoList.map(async (item: ParentCategoryType) => {
            const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-child-category?parentCategoryId=${item.parentCategoryId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            return res.json();
          });

          const result = await Promise.all(child);
          setCategoryData(result);
        }

      } catch (error) {
        console.log('Error Fetch : ', error);
      }
    }

    getData();

  }, []);

  return (
    <div className="break-keep overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <button
          onClick={_toogleDarkMode}
        >
          <Logo />
        </button>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>

        <div className="mt-5">{renderSearchForm()}</div>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        <Disclosure
          as="li"
          className="break-keep text-slate-900 dark:text-white"
        >
          <Link
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            href={{
              pathname: `/collection?categoryId=all` || undefined,
            }}
          >
            <span
              // className="block w-full"
              onClick={onClickClose}
            >
              전체
            </span>
          </Link>
        </Disclosure>
        <Disclosure
          as="li"
          className="break-keep text-slate-900 dark:text-white"
        >
          <Link
            className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            href={{
              pathname: `/collection?categoryId=new` || undefined,
            }}
          >
            <span
              // className="block w-full"
              onClick={onClickClose}
            >
              신상
            </span>
          </Link>
        </Disclosure>
        {parentCategoryData.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavMobile;
