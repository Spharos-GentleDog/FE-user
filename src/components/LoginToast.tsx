import { Transition } from '@/app/headlessui'
import React from 'react'

/** 
 * 로그인 실패 토스트
 */
function LoginToast({ message }: { message: string }) {
    return (
        <Transition
            // appear
            show={true}
            className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
            enter="transition-all duration-150"
            enterFrom="opacity-0 translate-x-20"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-20"
        >
            <div className='flex'>
                <div className='ml-4 flex flex-1 flex-col text-[11px] text-center text-black dark:text-white'>
                    <div>
                        <h3 className='text-base font-bold text-center text-red-500'>알림</h3>
                    </div>
                    {/* 존재하지 않는 이메일거나 비밀번호가 일치하지 않습니다. */}
                    {message}
                </div>
            </div>
        </Transition>
    )
}

export default LoginToast