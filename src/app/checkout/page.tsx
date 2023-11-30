import CheckoutList from '@/components/CheckoutList';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const CheckoutPage = async () => {
  const session = await getServerSession(options);
  console.log('session', session);

  if (!session?.user.usersName) {
    return redirect('/login?callBackUrl=checkout');
  }

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16 hidden lg:block">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            주문
          </h2>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          {/* 상품리스트 주문 정보 */}
          <CheckoutList />

          {/* <div className="text-sm sticky top-24 mt-8">{renderPay()}</div> */}
          {/* <div className="flex-1 mt-8">{renderLeft()}</div> */}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
