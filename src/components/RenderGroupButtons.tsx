import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import React from 'react'
import BagIcon from './BagIcon'

function RenderGroupButtons({
    notifyAddTocart,
}: {
    notifyAddTocart: any
}) {
    return (
        <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <ButtonPrimary
                className="shadow-lg"
                fontSize="text-xs"
                sizeClass="py-2 px-4"
                onClick={() => notifyAddTocart({ sizeName: 'FREE' })}
            >
                <BagIcon className="w-3.5 h-3.5 mb-0.5" />
                <span className="ms-1">장바구니 추가</span>
            </ButtonPrimary>
        </div>
    )
}

export default RenderGroupButtons