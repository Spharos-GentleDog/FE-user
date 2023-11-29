import Checkbox from '@/shared/Checkbox/Checkbox';
import { CartProductType } from '@/types/productType';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import NcInputNumber from './NcInputNumber';
import Prices from './Prices';
import RenderStatusInstock from './RenderStatusInstock';
import RenderStatusSoldout from './RenderStatusSoldout';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ProductCartDto } from '@/types/cartType';
import Prices2 from './Prices2';
import { getServerSession } from 'next-auth';

/**
 * 장바구니 상품 출력
 * @param onItemCheck 체크 박스
 * @param onCountChange 수량 변경
 * @param onItemDelete 상품 삭제
 */
export default function RenderProduct({
  item,
  onItemCheck,
  onCountChange,
  onItemDelete,
}: {
  item: ProductCartDto;
  onItemCheck: (checked: boolean) => void;
  onCountChange?: (newCount: number) => void;
  onItemDelete?: (id: number) => void;
}) {
  return (
    <div
      key={`cart-${item.productDetailId}`}
      className=" py-6 sm:py-4 xl:py-8 first:pt-0 last:pb-0 last:mb-8"
    >
      <div className="flex pb-2 justify-between">
        <Checkbox
          name={`cart-${item.productDetailId}`}
          label={item.productName}
          labelClassName="text-base font-semibold"
          className="mb-4 flex items-center"
          isChecked={item.checked}
          onChange={(checked) => onItemCheck(checked)}
        />
        <button
          className="flex"
          onClick={() =>
            onItemDelete && onItemDelete(item.productInCartId as number)
          }
        >
          <XMarkIcon className="w-6" />
        </button>
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
          <div className="flex">
            <div className="flex-col justify-between ">
              <div className="flex-[1.5] ">
                <div className="flex flex-col lg:flex-row mt-1.5 sm:mt-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <Icon type="color" />

                    <span>{item.color}</span>
                  </div>
                  <span className="hidden lg:block mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                  <div className="flex items-center space-x-1.5">
                    <Icon type="size" />
                    <span>{item.size}</span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                  <select
                    name={`qty-${item.productDetailId}`}
                    id={`qty-${item.productDetailId}`}
                    className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                    onChange={(e) => onCountChange?.(Number(e.target.value))}
                    defaultValue={item.count}
                  >
                    {/* todo: 최대 수량을 재고까지 */}
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
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
              {/* todo: 재고 수량에 따라 표시 다르게 하기 */}
              <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                {/* {productStock > 0 ? (
                  <RenderStatusInstock />
                ) : (
                  <RenderStatusSoldout />
                )} */}
              </div>
            </div>
            <div className=" flex-1 sm:flex justify-end">
              <Prices2
                price={item.productPrice}
                discountRate={item.discountRate}
                discountedPrice={item.discountedPrice}
                className="mt-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
