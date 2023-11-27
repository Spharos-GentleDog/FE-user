import AiRecomment from '@/components/ai/AiRecomment'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import React from 'react'

function page() {
    return (
        <div className='container mb-32 lg:mb-40'>
            <div className='text-center font-bold text-xl my-10'>
                반려동물에게 어울리는 상품을 추천해드릴게요!
            </div>
            <AiRecomment />
            <ButtonPrimary className='w-full mt-10'>
                홈으로
            </ButtonPrimary>
        </div>
    )
}

export default page