'use client'

import { OauthLogin } from '@/data/oauthData'
import { signIn } from 'next-auth/react'

/**
 * 소셜로그인 버튼
 * @returns 이름, 전화번호, 이메일
 */
function LoginOauth() {
    return (
        <>
            <div className='max-w-md mx-auto space-y-6'>
                <div className='grid gap-3'>
                    {
                        OauthLogin.map((item, index) => (
                            <div
                                key={index}
                                className={`flex w-full rounded-lg ${item.background}  px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]`}
                                onClick={() => signIn(item.provider)}   // 소셜로그인 버튼 클릭시 해당 소셜로그인 페이지로 이동
                            >
                                <div className={`flex-grow text-center text-sm font-bold ${item.text} sm:text-sm`}>
                                    {item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default LoginOauth