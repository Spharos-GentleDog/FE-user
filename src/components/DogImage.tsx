'use client'

import React, { useState } from 'react'
import Icon from './Icon'

function DogImage() {

    const [myfile, setMyfile] = useState<File | null>(null)

    return (
        <>
            <div className='relative mt-2 mx-auto w-32 h-32 border-[1px] border-solid border-[#000000] rounded-full flex items-center justify-center cursor-pointer'>
                <form>
                    <input
                        type='file'
                        id='dogImage'
                        name='dogImage'
                        className='hidden'
                    />
                    <button type='submit' hidden>클릭</button>
                </form>
                <div className='absolute'>
                    <Icon type='download' />
                </div>
            </div>
        </>
    )
}

export default DogImage