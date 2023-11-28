'use client'

import React, { useEffect, useState } from 'react'
import Prices from '../Prices'
import Link from 'next/link'
import NcImage from '@/shared/NcImage/NcImage'

function AiRecomment() {
    const [product, setProduct] = useState<any>([])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setProduct(JSON.parse(localStorage.getItem('aiProductDetail') || '[]'));
        }
    }, []);

    return (
        <>
            {product.map((item: any) => (
                console.log(item),
                <div key={item.productId} className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={`/product/${item.productId}`} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={item.mainImgUrl}
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>

                    <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                        <div>
                            <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                                {item.productName}
                            </h2>
                            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}>
                                {item.brandName}
                            </p>
                        </div>

                        <div className="flex justify-between items-end ">
                            <Prices price={item.productPrice} />
                            <div className="flex items-center mb-0.5">
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default AiRecomment