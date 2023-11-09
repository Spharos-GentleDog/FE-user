'use client';

import React, { useEffect } from 'react';
import CustomNav from './CustomNav';
import { PathData } from '@/data/pathData';
import { usePathname } from 'next/navigation';
import MainNav2Logged from './MainNav2Logged';

/**
 * 커스텀된 헤더
 */
function HeaderCustom() {
  const pathname = usePathname();
  const [title, setTitle] = React.useState<string>('');

  useEffect(() => {
    const result = PathData.find((data) => data.path === pathname)?.title;
    if (result === undefined) {
      setTitle('');
    } else {
      setTitle(result);
    }
  }, [pathname]);

  return (
    <>
      <div className="nc-HeaderLogged sticky top-0 w-full z-40 block sm:block lg:hidden">
        <CustomNav title={title} />
      </div>
      <div className="nc-HeaderLogged sticky top-0 w-full z-40 hidden lg:block">
        <MainNav2Logged />
      </div>
    </>
  );
}

export default HeaderCustom;
