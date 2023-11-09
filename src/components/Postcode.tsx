'use client'

import React from 'react'
import DaumPostcode from 'react-daum-postcode';

function Postcode({ isView, setIsView, setAddress }: { isView: boolean, setIsView: any, setAddress: React.Dispatch<React.SetStateAction<any>> }) {

    /**
     * 
     * @returns 주소 정보를 받아온다.
     */
    const handleComplete = (data: any) => {
        setAddress(data.zonecode + ", " + data.address)
    };

    return (
        <div>
            {
                isView &&
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9998]'>
                    <DaumPostcode
                        className='fixed top-1/2 left-[35%] transform -translate-x-1/2 -translate-y-1/2 z-[9999]'
                        style={
                            {
                                width: '200px',
                                height: '400px',
                            }
                        }
                        onComplete={(data) => {
                            handleComplete(data)
                            setIsView(false)
                        }
                        }
                    />
                </div>
            }
        </div>
    );
}

export default Postcode