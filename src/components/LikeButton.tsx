'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export interface LikeButtonProps {
  className?: string;
  productId: number;
}

/**
 * 찜하기 버튼
 * @param productId 상품 아이디
 * @param whishProductId 찜 아이디
 */
const LikeButton: React.FC<LikeButtonProps> = ({
  className = '',
  productId,
}) => {
  const session = useSession();
  const token = session?.data?.user.accessToken;
  const userEmail = session?.data?.user.userEmail;
  const [isLiked, setIsLiked] = useState<boolean>();

  // todo: 유저의 찜 상태를 가져오기
  useEffect(() => {
    /** 초기 랜더링 */
    async function getWishStatus() {
      console.log('productId', productId);
      const res = await fetch(
        `https://gentledog-back.duckdns.org/api/v1/wish/wishproductlist/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log('data', data);
      if (res.ok) {
        // null 값이면 찜 안한 상태
        // null 값이 아니면 찜 한 상태
        if (res.ok) {
          if (data.result === true) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      }
    }

    getWishStatus();
  }, []);

  /** 찜하기 */
  async function handleWish() {
    try {
      const res = await fetch(
        'https://gentledog-back.duckdns.org/api/v1/wish/wishproductlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            userEmail: userEmail,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );
      const data = await res.json();
      console.log('data', data);
      if (res.ok) {
        if (res.ok) {
          if (data.result === true) {
            setIsLiked(true);
          } else {
            setIsLiked(false);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg ${className}`}
      onClick={() => handleWish()}
    >
      {/* todo: 이미지 변경하기 */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? '#ef4444' : 'currentColor'}
          fill={isLiked ? '#ef4444' : 'none'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
