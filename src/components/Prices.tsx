import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
}



/**
 * 가격 표시
 * @param price 상품 가격 
 * @returns 
 */
const Prices: FC<PricesProps> = ({
  className = "",
  price,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {

  const formattedPrice = price?.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-blue-500 rounded-lg ${contentClass}`}
      >
        {/* todo: $ 표시 원으로 바꾸기 원화 표시 삭제하고 3자리마다 , 표시 */}
        <span className="text-blue-500 !leading-none">{formattedPrice}</span>
      </div>
    </div>
  );
};

export default Prices;
