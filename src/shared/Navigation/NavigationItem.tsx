'use client';

import { Popover, Transition } from '@/app/headlessui';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { FC, Fragment, useState } from 'react';
import { Route } from '@/routers/types';
import Link from 'next/link';
import {
  ChildCategoryType,
  ParentCategoryType,
} from '@/types/product/category';

export interface NavItemType {
  id: string;
  name: string;
  href: Route;
  targetBlank?: boolean;
  children?: NavItemType[];
  type?: 'dropdown' | 'megaMenu' | 'none';
  isNew?: boolean;
}

export interface NavigationItemProps {
  menuItem: ParentCategoryType;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  /**
   * 호버
   */
  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  /**
   * 호버
   */
  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  const [data, setData] = useState<ChildCategoryType[]>([]);
  const [checked, setChecked] = useState(false);

  React.useEffect(() => {
    const getData = async () => {
      if (menuItem) {
        const res = await fetch(
          `${process.env.BASE_API_URL}/api/v1/product/read-child-category?parentCategoryId=${menuItem.parentCategoryId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        setData(result.result);
        if (result.isSuccess) {

          setChecked(true);
        }
      }
    };
    getData();
  }, []);
  // ===================== MENU DROPDOW =====================
  /**
   *
   * @param 메뉴 드랍다운을 렌더링합니다.
   * @returns
   */
  const renderDropdownMenu = (menuDropdown: ParentCategoryType) => {
    const isHover = menuCurrentHovers.includes(
      menuDropdown.parentCategoryId.toString()
    );
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative"
        onMouseEnter={() =>
          onMouseEnterMenu(menuDropdown.parentCategoryId.toString())
        }
        onMouseLeave={() =>
          onMouseLeaveMenu(menuDropdown.parentCategoryId.toString())
        }
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute transform z-10 w-56 top-full left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {data?.map((i, index) => {
                    return (
                      <li key={index} className="px-2">
                        {renderDropdownMenuNavlink(i)}
                      </li>
                    );
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 하위 카테고리
   * @param item
   * @returns
   */
  const renderDropdownMenuNavlink = (item: ChildCategoryType) => {
    return (
      <Link
        className="flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: `/collection`,
          query: {
            categoryType: 'all',
            categoryId: item.childCategoryId,
            categoryName: item.childCategoryName,
            isDiscount: false,
            page: 1
          }
        }}
      >
        {item.childCategoryName}
      </Link>
    );
  };

  // ===================== MENU MAIN MENU =====================
  /**
   * 상위 카테고리
   * @param item
   * @returns
   */
  const renderMainItem = (item: ParentCategoryType) => {
    return (
      <div className="h-20 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-2 xl:px-3 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: `/collection`,
            query: {
              categoryType: 'all',
              categoryId: item.parentCategoryId,
              categoryName: item.parentCategoryName,
              isDiscount: false,
              page: 1
            }
          }}
        >
          {item.parentCategoryName}
          {
            checked ?
              <ChevronDownIcon
                className="ml-1 -mr-1 h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              :
              ""
          }
        </Link>
      </div>
    );
  };


  switch ("dropdown") {
    case checked ? "dropdown" : "none":
      return renderDropdownMenu(menuItem);
    default:
      return (
        <li className="menu-item flex-shrink-0 break-keep">
          {renderMainItem(menuItem)}
        </li>
      );
  }
};

export default NavigationItem;
