; 'use client'

import React from 'react'

// 상품 컬러 리스트
function RenderColor({
    variantActive,
    setVariantActive,
    color
}
    : {
        variantActive: any,
        setVariantActive: any,
        color: any
    }) {


    const getBorderClass = (Bgclass = '') => {
        return 'border-gray-500';
    };

    if (!color || !color.length) {
        return null;
    }

    return (
        <div className="flex space-x-1">
            {color?.map((variant: { colorName: string; colorCode: string; }, index: number) => (
                <div
                    key={index}
                    onClick={() => setVariantActive(index)}
                    className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive === index
                        ? getBorderClass(variant.colorName)
                        : 'border-transparent'
                        }`}
                    title={variant.colorName}
                >
                    <div
                        className={`absolute inset-0.5 rounded-full z-0`}
                        style={{ backgroundColor: variant.colorCode }}
                    ></div>
                </div>
            ))}
        </div>
    )
}

export default RenderColor