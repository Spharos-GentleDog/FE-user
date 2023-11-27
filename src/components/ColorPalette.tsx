'use client'

import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import { SketchPicker } from 'react-color';
import React from 'react'

function ColorPalette(
    {
        color,
        setColor,
        isView,
        setIsView,
    }:
        {
            color: string,
            setColor: React.Dispatch<React.SetStateAction<string>>,
            isView: boolean,
            setIsView: React.Dispatch<React.SetStateAction<boolean>>,
        }) {
    const onChangeComplete = (color: any) => {
        setColor(color.hex);
    }
    return (
        <>
            {
                isView &&
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9998] '>
                    <div className='fixed top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-[9999]'>
                        {/* todo: 에러 발생 수정해야함 */}
                        <SketchPicker
                            className='h-[360px]'
                            color={color}
                            onChangeComplete={(color) => onChangeComplete(color)}
                        />
                        <div className='flex absolute bottom-2 gap-2 w-full'>
                            <ButtonSecondary
                                className='w-1/2 ml-1'
                                fontSize='text-[13px]'
                                sizeClass='py-2 px-3'
                                onClick={() => setIsView(false)}

                            >
                                확인
                            </ButtonSecondary>
                            <ButtonSecondary
                                className='w-1/2 mr-1'
                                fontSize='text-[13px]'
                                sizeClass='py-2 px-3'
                                onClick={() => setIsView(false)}
                            >
                                close
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default ColorPalette