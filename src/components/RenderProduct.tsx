import { CartProductType } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import Prices from './Prices';
import NcInputNumber from './NcInputNumber';
import RenderStatusInstock from './RenderStatusInstock';
import RenderStatusSoldout from './RenderStatusSoldout';
import Checkbox from '@/shared/Checkbox/Checkbox';

/**
 * 장바구니 상품 출력
 */
export default function RenderProduct({
  item,
  onItemCheck,
  onCountChange,
  isChecked,
}: {
  item: CartProductType;
  onItemCheck: (checked: boolean) => void;
  onCountChange?: (count: number) => void;
  newCount?: number;
  isChecked: boolean;
}) {
  return (
    <div
      key={`cart-${item.productDetailId}`}
      className=" py-6 sm:py-4 xl:py-8 first:pt-0 last:pb-0 last:mb-8"
    >
      <div className="flex pb-2 items-center">
        <Checkbox
          name={`cart-${item.productDetailId}`}
          label={item.productName}
          labelClassName="text-base font-semibold"
          className="mb-4 flex items-center"
          isChecked={isChecked}
          onChange={(checked) => onItemCheck(checked)}
        />
      </div>
      <div className="relative flex px-8">
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={item.imgUrl}
            alt={item.productName}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link
            href={`/product/${item.productId}`}
            className="absolute inset-0"
          ></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Icon type="color" />

                    <span>{item.color}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon type="size" />
                    <span>{item.size}</span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name="qty"
                    id="qty"
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                    price={
                      item.discountedPrice ? item.discountedPrice : item.price
                    }
                  />
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                <Prices
                  price={
                    item.discountedPrice ? item.discountedPrice : item.price
                  }
                  className="mt-0.5"
                />
                
              </div>
            </div>
            <div className="hidden sm:block text-center relative pt-4">
              <NcInputNumber
                defaultValue={item.count}
                className="relative z-10"
                onCountChange={(newCount) =>
                  onCountChange && onCountChange(newCount)
                }
              />
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {item.productStock > 0 ? (
              <RenderStatusInstock />
            ) : (
              <RenderStatusSoldout />
            )}

            {/* <a
            href="##"
            className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
          >
            todo: 기능 활성화
            <span>제거</span>
          </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
