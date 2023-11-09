import React from 'react';
import Icon from '../Icon';

/**
 * 모달 창 위에 사용할 커스텀 네비게이션
 * @param title 현재 위치 이름
 * @param onCloseActive 모달 닫기
 */
const CustomNav2 = ({
  title,
  onCloseActive,
}: {
  title: string;
  onCloseActive: () => void;
}) => {
  return (
    <div className="nc-CustomNav2 relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container">
        <div className="h-20 flex justify-between">
          <button
            className="flex items-center lg:hidden"
            onClick={onCloseActive}
          >
            <Icon type="back" />
          </button>
          <div className="flex items-center text-xl font-bold mx-auto pr-3">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNav2;
