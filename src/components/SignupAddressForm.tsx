'use client'

import Input from '@/shared/Input/Input'
import React, { useEffect, useState } from 'react'
import Postcode from './Postcode'
import { daumAddressType } from '@/types/daumAddressType'

function SignupAddressForm(
    {
        signupAddress,
        setSignupAddress,
    }:
        {
            signupAddress: any,
            setSignupAddress: React.Dispatch<React.SetStateAction<any>>
        }) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignupAddress({
            ...signupAddress,
            [name]: value,
        })
    }

    const handleOpenModal = () => {
        setIsView(!isView);
    }

    // 우편 주소
    const [isView, setIsView] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");


    useEffect(() => {
        if (address) {
            setSignupAddress({
                ...signupAddress,
                address: address,
            })
        }
    }, [address])

    return (
        <div><label className='block mb-5 relative'>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                주소
            </span>
            <div className='flex'>
                <Input
                    className='mt-1 border-[#000000]'
                    type='text'
                    id='address'
                    name='address'
                    onChange={handleChange}
                    readOnly
                    onClick={handleOpenModal}
                    value={
                        signupAddress.address
                    }
                />
                <div>
                    <Postcode isView={isView} setIsView={setIsView} setAddress={setAddress} />
                </div>
            </div>
            <Input
                className='mt-1 border-[#000000]'
                type='text'
                id='addressDetail'
                name='addressDetail'
                placeholder='상세주소 입력'
                onChange={handleChange}
            />
        </label>
        </div>
    )
}

export default SignupAddressForm