'use client'

import React from 'react'

// 상품 사이즈 리스트
function RenderSizeList({
    sizeName,
    notifyAddTocart,
}: {
    sizeName: any,
    notifyAddTocart: any
}) {

    if (!sizeName || !sizeName.length) {
        return null;
    }
    return (
        <div className="absolute bottom-0 inset-x-1 space-x-1.5 rtl:space-x-reverse flex justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
            {sizeName.map((sizeName: string, index: number) => {
                return (
                    <div
                        key={index}
                        className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900"
                        onClick={() => notifyAddTocart({ sizeName })}
                    >
                        {sizeName}
                    </div>
                );
            })}
        </div>
    )
}

export default RenderSizeList