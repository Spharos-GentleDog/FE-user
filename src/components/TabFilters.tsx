"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@/app/headlessui";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MySwitch from "@/components/MySwitch";
import Icon from "./Icon";
import { ChildCategoryType, ParentCategoryType } from "@/types/product/category";

// DEMO DATA
const DATA_categories = [
  {
    name: "신제품",
  },
  {
    name: "할인 중",
  },
  {
    name: "백팩",
  },
  {
    name: "여행 가방",
  },
  {
    name: "랩탑 슬리브",
  },
  {
    name: "정리용품",
  },
  {
    name: "악세서리",
  },
];

const DATA_colors = [
  { name: "흰색" },
  { name: "베이지" },
  { name: "파란색" },
  { name: "검정색" },
  { name: "갈색" },
  { name: "녹색" },
  { name: "네이비" },
];

const DATA_sizes = [
  { name: "XXS" },
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "2XL" },
];

const DATA_sortOrderRadios = [
  { name: "찜 순", id: "Most-Popular" },
  { name: "최고 평점 순", id: "Best-Rating" },
  { name: "최신순", id: "Newest" },
  { name: "가격 오름차순", id: "Price-low-hight" },
  { name: "가격 내림차순", id: "Price-hight-low" },
];

/**
 * 가격 범위 기본값
 */
const PRICE_RANGE = [1, 500000];

/**
 * 필터
 * @returns 
 */
const TabFilters = () => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  //
  const [isOnSale, setIsIsOnSale] = useState(false);
  const [rangePrices, setRangePrices] = useState([100, 500]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [colorsState, setColorsState] = useState<string[]>([]);
  const [sizesState, setSizesState] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  //
  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };

  const handleChangeColors = (checked: boolean, name: string) => {
    checked
      ? setColorsState([...colorsState, name])
      : setColorsState(colorsState.filter((i) => i !== name));
  };

  const handleChangeSizes = (checked: boolean, name: string) => {
    checked
      ? setSizesState([...sizesState, name])
      : setSizesState(sizesState.filter((i) => i !== name));
  };

  const [childCategory, setChildCategory] = useState<ChildCategoryType[]>([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       // categoryData.map(async (item) => {
  //       const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-child-category?parentCategoryId=0`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })

  //       const result = await res.json();
  //       setChildCategory(result.result);
  //       // })
  //     } catch (error) {
  //       console.log('Error Fetch : ', error);
  //     }
  //   }

  //   getData();
  // }, [categoryData]);

  /**
   * 필터 적용 후 나오는 x버튼
   */
  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <Icon type="x" />
      </span>
    );
  };

  /**
   * 카테고리 탭 랜더링
   * @param 
   * @returns 
   */
  const renderTabsCategories = () => {
    return (
      childCategory ?
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open
                    ? "!border-primary-500 "
                    : "border-neutral-300 dark:border-neutral-700"
                  }
                ${!!categoriesState.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                  }
                `}
              >
                <Icon type="category" />
                <span className="ml-2">카테고리</span>
                {!categoriesState.length ? (
                  <ChevronDownIcon className="w-4 h-4 ml-3" />
                ) : (
                  <span onClick={() => setCategoriesState([])}>
                    {renderXClear()}
                  </span>
                )}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                  <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      <Checkbox
                        name="All Categories"
                        label="All Categories"
                        defaultChecked={categoriesState.includes(
                          "All Categories"
                        )}
                        onChange={(checked) =>
                          handleChangeCategories(checked, "All Categories")
                        }
                      />
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                      {/* {childCategory.map((item) => (
                        <div key={item.childCategoryName} className="">
                          <Checkbox
                            name={item.childCategoryName}
                            label={item.childCategoryName}
                            defaultChecked={categoriesState.includes(item.childCategoryName)}
                            onChange={(checked) =>
                              handleChangeCategories(checked, item.childCategoryName)
                            }
                          />
                        </div>
                      ))} */}
                      {DATA_categories.map((item) => (
                        <div key={item.name} className="">
                          <Checkbox
                            name={item.name}
                            label={item.name}
                            defaultChecked={categoriesState.includes(item.name)}
                            onChange={(checked) =>
                              handleChangeCategories(checked, item.name)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                      <ButtonThird
                        onClick={() => {
                          close();
                          setCategoriesState([]);
                        }}
                        sizeClass="px-4 py-2 sm:px-5"
                      >
                        초기화
                      </ButtonThird>
                      <ButtonPrimary
                        onClick={close}
                        sizeClass="px-4 py-2 sm:px-5"
                      >
                        적용
                      </ButtonPrimary>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        :
        ""
    );
  };

  /**
   * 정렬 순서 렌더링
   */
  const renderTabsSortOrder = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm border rounded-full focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${!!sortOrderStates.length
                  ? "!border-primary-500 bg-primary-50 text-primary-900"
                  : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <Icon type="sort" />
              <span className="ml-2">
                {sortOrderStates
                  ? DATA_sortOrderRadios.filter(
                    (i) => i.id === sortOrderStates
                  )[0].name
                  : "Sort order"}
              </span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 right-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_sortOrderRadios.map((item) => (
                      <Radio
                        id={item.id}
                        key={item.id}
                        name="radioNameSort"
                        label={item.name}
                        defaultChecked={sortOrderStates === item.id}
                        onChange={setSortOrderStates}
                      />
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setSortOrderStates("");
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      초기화
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      적용
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 컬러 탭 랜더링
   */
  const renderTabsColor = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${!!colorsState.length
                  ? "!border-primary-500 bg-primary-50 text-primary-900"
                  : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <Icon type="colors" />
              <span className="ml-2">색상</span>
              {!colorsState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setColorsState([])}>{renderXClear()}</span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_colors.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={colorsState.includes(item.name)}
                          onChange={(checked) =>
                            handleChangeColors(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setColorsState([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      초기화
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      적용
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 사이즈 탭 랜더링
   */
  const renderTabsSize = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
              ${open ? "!border-primary-500 " : ""}
                ${!!sizesState.length
                  ? "!border-primary-500 bg-primary-50 text-primary-900"
                  : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <Icon type="sizes" />
              <span className="ml-2">사이즈</span>
              {!sizesState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setSizesState([])}>{renderXClear()}</span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {DATA_sizes.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          defaultChecked={sizesState.includes(item.name)}
                          onChange={(checked) =>
                            handleChangeSizes(checked, item.name)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setSizesState([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      초기화
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      적용
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 가격범위 탭 랜더링
   */
  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
            >
              <Icon type="price" />
              <span className="ml-2 min-w-[90px]">{`${rangePrices[0]}$ - ${rangePrices[1]}$`}</span>
              {rangePrices[0] === PRICE_RANGE[0] &&
                rangePrices[1] === PRICE_RANGE[1] ? null : (
                <span onClick={() => setRangePrices(PRICE_RANGE)}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">가격 범위</span>
                      <Slider
                        range
                        min={PRICE_RANGE[0]}
                        max={PRICE_RANGE[1]}
                        step={1}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(_input: number | number[]) =>
                          setRangePrices(_input as number[])
                        }
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          최소
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">

                          </span>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          최대
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">

                          </span>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices(PRICE_RANGE);
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      최대
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      적용
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  /**
   * 할인 중 탭 랜더링
   */
  const renderTabIsOnsale = () => {
    return (
      <div
        className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer select-none ${isOnSale
          ? "border-primary-500 bg-primary-50 text-primary-900"
          : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
          }`}
        onClick={() => setIsIsOnSale(!isOnSale)}
      >
        <Icon type="sales" />
        <span className="line-clamp-1 ml-2">할인 중</span>
        {isOnSale && renderXClear()}
      </div>
    );
  };

  /**
   * 
   * @param data 
   */
  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  /**
   * FOR RESPONSIVE MOBILE
  */
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
          onClick={openModalMoreFilter}
        >
          <Icon type="mobile" />
          {/* todo: 적용된 필터 수 적용 */}
          <span className="ml-2">Product filters (3)</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Products filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">카테고리</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_categories)}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">색상</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_colors)}
                        </div>
                      </div>
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">사이즈</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(DATA_sizes)}
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">가격 범위</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={PRICE_RANGE[0]}
                                max={PRICE_RANGE[1]}
                                defaultValue={rangePrices}
                                allowCross={false}
                                onChange={(_input: number | number[]) =>
                                  setRangePrices(_input as number[])
                                }
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  최소
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm" />
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  최대
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm" />
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">정렬 순서</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-5">
                            {DATA_sortOrderRadios.map((item) => (
                              <Radio
                                id={item.id}
                                key={item.id}
                                name="radioNameSort"
                                label={item.name}
                                defaultChecked={sortOrderStates === item.id}
                                onChange={setSortOrderStates}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">할인</h3>
                        <div className="mt-6 relative ">
                          <MySwitch
                            label="할인 중!"
                            desc="현재 할인 중인 제품들"
                            enabled={isOnSale}
                            onChange={setIsIsOnSale}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setRangePrices(PRICE_RANGE);
                        setCategoriesState([]);
                        setColorsState([]);
                        setSortOrderStates("");
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      초기화
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      적용
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex flex-1 space-x-4">
        {renderTabsPriceRage()}
        {renderTabsCategories()}
        {renderTabsColor()}
        {renderTabsSize()}
        {renderTabIsOnsale()}
        <div className="!ml-auto">{renderTabsSortOrder()}</div>
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
};

export default TabFilters;
