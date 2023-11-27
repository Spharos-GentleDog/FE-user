'use client';

import React from 'react';
import Icon from '../Icon';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MenuBar from '@/shared/MenuBar/MenuBar';
import CartDropdown from './CartDropdown';

const CustomNav = ({ title }: { title: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="nc-CustomNav relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
            <div className="container">
                <div className="h-20 flex justify-between">
                    <div className="flex items-center" onClick={router.back}>
                        <Icon type='back' />
                    </div>
                    <div className='flex items-center'>
                        <MenuBar />
                    </div>
                    <div className="flex items-center text-xl font-bold mx-auto">
                        {title}
                    </div>
                    <div className='flex items-center pr-3'>
                        <Link href='/'>
                            <Icon type='home' />
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <CartDropdown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomNav;
