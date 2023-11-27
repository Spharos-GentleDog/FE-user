import React, { FC } from 'react';

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
  discountRate?: number;
  discountedPrice?: number;
}

const Prices2: FC<PricesProps> = ({
  className = '',
  price,
  discountRate,
  discountedPrice,
  contentClass = 'py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium',
}) => {
  const formattedDiscountedPrice = discountedPrice?.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
  const formattedPrice = price?.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });

  return (
    <div className={`${className} flex-col flex items-end lg:items-start`}>
      {discountRate ? (
        <>
          <div className={`items-center rounded-lg ${contentClass}`}>
            <span className="font-semibold text-blue-500 !leading-none">
              {discountRate}%
            </span>
          </div>
          <div className={`items-center rounded-lg ${contentClass}`}>
            <span className="line-through font-semibold text-gray-400 !leading-none">
              {formattedPrice}
            </span>
          </div>
          <div className={`items-center rounded-lg ${contentClass}`}>
            <span className="font-bold text-red-600 text-lg lg:text-2xl !leading-none">
              {formattedDiscountedPrice}
            </span>
          </div>
        </>
      ) : (
        <div className={`items-center rounded-lg ${contentClass}`}>
          <span className="font-bold text-red-600 text-lg lg:text-2xl !leading-none">
            {formattedPrice}
          </span>
        </div>
      )}
    </div>
  );
};

export default Prices2;
