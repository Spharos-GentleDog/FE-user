'use client';

import React, { createRef, FC, use, useState } from 'react';
import Logo from '@/shared/Logo/Logo';
import MenuBar from '@/shared/MenuBar/MenuBar';
import AvatarDropdown from './AvatarDropdown';
import Navigation from '@/shared/Navigation/Navigation';
import CartDropdown from './CartDropdown';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '../Icon';
import { useSession } from 'next-auth/react';

export interface MainNav2LoggedProps { }

/**
 *
 * @returns 로그인된 메인 네비게이션바를 렌더링합니다.
 */
const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const router = useRouter();
  const session = useSession();

  /** 돋보기 아이콘 랜더링 */
  const renderMagnifyingGlassIcon = () => {
    return (
      <Icon type='magnifyingGlass' />
    );
  };

  /** 검색 폼을 렌더링합니다. */
  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/search');
          inputRef.current?.blur();
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            ref={inputRef}
            type="text"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
          />
          <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  /** 컨텐츠를 렌더링합니다. */
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Link href="/" className='w-[200px] h-auto'>
            <Logo className="flex-shrink-0" />
          </Link>
        </div>

        <div className="flex-[4] hidden lg:flex justify-center">
          {showSearchForm ? renderSearchForm() : <Navigation />}
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {!showSearchForm && (
            <button
              className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
              onClick={() => setShowSearchForm(!showSearchForm)}
            >
              {renderMagnifyingGlassIcon()}
            </button>
          )}
          {
            // 로그인 상태 판단
            session.status === "unauthenticated" ?
              <>
                <Link href='/login' className='px-3'>
                  <Icon type="user" />
                </Link>
                <CartDropdown />
              </>
              :
              <>
                <AvatarDropdown />
                <CartDropdown />
              </>
          }
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
