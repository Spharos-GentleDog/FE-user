"use client";

import { Popover, Transition } from "@/app/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, use, useState } from "react";
import { Route } from "@/routers/types";
import Link from "next/link";
import { ChildCategory, ParentCategoryType } from "@/types/product/category";
import { get } from "http";

export interface NavItemType {
  id: string;
  name: string;
  href: Route;
  targetBlank?: boolean;
  children?: NavItemType[];
  type?: "dropdown" | "megaMenu" | "none";
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

  // ===================== MENU MEGAMENU =====================
  /**
   * 
   * @param menu 
   * @returns 
   */
  // const renderMegaMenu = (menu: NavItemType) => {
  //   if (!menu.children) {
  //     return null;
  //   }
  //   return (
  //     <li
  //       className={`menu-item flex-shrink-0 menu-megamenu menu-megamenu--large`}
  //     >
  //       {renderMainItem(menu)}

  //       <div className="invisible sub-menu absolute top-full inset-x-0 transform z-50">
  //         <div className="bg-white dark:bg-neutral-900 shadow-lg">
  //           <div className="container">
  //             <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-14">
  //               <div className="flex-1 grid grid-cols-4 gap-6 xl:gap-8 pr-6 xl:pr-8">
  //                 {menu.children.map((item, index) => (
  //                   <div key={index}>
  //                     <p className="font-medium text-slate-900 dark:text-neutral-200">
  //                       {/* {item.name} */}
  //                       sssss
  //                     </p>
  //                     <ul className="grid space-y-4 mt-4">
  //                       {item.children?.map(renderMegaMenuNavlink)}
  //                     </ul>
  //                   </div>
  //                 ))}
  //               </div>
  //               <div className="w-[40%] xl:w-[35%]">
  //                 <CardCategory3 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </li>
  //   );
  // };

  /**
   * 
   * @param item 
   * @returns 
   */
  // const renderMegaMenuNavlink = (item: NavItemType) => {
  //   return (
  //     <li key={item.id} className={`${item.isNew ? "menuIsNew" : ""}`}>
  //       <Link
  //         className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white "
  //         href={{
  //           pathname: item.href || undefined,
  //         }}
  //       >
  //         {item.name}ssssssssssssssss
  //       </Link>
  //     </li>
  //   );
  // };

  const [data, setData] = useState<ChildCategory[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      if (menuItem) {
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-child-category?parentCategoryId=${menuItem.parentCategoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }

        const result = await res.json();
        setData(result);
      }
    }
    getData();
  }, []);

  // ===================== MENU DROPDOW =====================
  /**
   * 
   * @param 메뉴 드랍다운을 렌더링합니다. 
   * @returns 
   */
  const renderDropdownMenu = (menuDropdown: ParentCategoryType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.parentCategoryId.toString());
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.parentCategoryId.toString())}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.parentCategoryId.toString())}
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
                  {/* {data?.map((i, index) => {
                    return (
                      <li key={index} className="px-2">
                        {renderDropdownMenuNavlink(data)}
                      </li>
                    )
                  })} */}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 
   * @param item 
   * @returns 
   */
  const renderDropdownMenuNavlinkHasChild = (item: ParentCategoryType) => {
    const isHover = menuCurrentHovers.includes(item.parentCategoryId.toString());
    return (
      <Popover
        as="li"
        key={item.parentCategoryId}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.parentCategoryId.toString())}
        onMouseLeave={() => onMouseLeaveMenu(item.parentCategoryId.toString())}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(data[item.parentCategoryId])}
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
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {/* {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })} */}
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
  const renderDropdownMenuNavlink = (item: ChildCategory) => {
    return (
      <Link
        className="flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: '/collection' || undefined,
        }}
      >
        {/* {item.name}
        {item.type && (
          <ChevronDownIcon
            className="ml-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        )} */}
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
          className="inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: '/collection' || undefined,
          }}
        >
          {item.parentCategoryName}
          {/* {item.type && (
            <ChevronDownIcon
              className="ml-1 -mr-1 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          )} */}
        </Link>
      </div>
    );
  };

  switch ("dropdown") {
    case "dropdown":
      return renderDropdownMenu(menuItem);
    default:
      return (
        <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>
      );
  }
};

export default NavigationItem;
