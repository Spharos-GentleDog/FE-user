import React from 'react'
import Image from 'next/image'
import loadingImage from '@/images/loading.gif'

const loading = () => {
    return (
        <div className="w-full h-screen relative flex justify-center items-center bg-white bg-opacity-50 z-[9999]">
            <Image src={loadingImage} alt="loading" width={50} height={50} />
        </div>
    )
}

export default loading