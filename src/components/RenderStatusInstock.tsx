import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

/**
 * 재고 현황 아이콘 랜더링
 */
export default function RenderStatusInstock() {
  return (
    <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      <CheckIcon className="w-3.5 h-3.5" />
      <span className="ml-1 leading-none">재고 있음</span>
    </div>
  );
}
