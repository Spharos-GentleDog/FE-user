'use client';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import { LoginFormDataType } from '@/types/formDataType';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import LoginToast from './LoginToast';

function LoginForm() {

  const query = useSearchParams();
  const callBackUrl = query.get('callbackUrl');

  // 이메일 정규식
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  // 로그인 입력 에러 처리
  const [logInError, setLogInError] = useState<any>({
    loginEmail: '',
    password: '',
  });

  // 로그인 입력 데이터
  const [loginData, setLoginData] = useState<LoginFormDataType>({
    loginEmail: '',
    password: '',
  });

  const handleLoginFetch = async () => {

    if (loginData.loginEmail === '') {
      setLogInError({
        ...logInError,
        loginEmail: '아이디를 입력해주세요.'
      })
      return;
    } else if (!emailRegEx.test(loginData.loginEmail)) {
      setLogInError({
        ...logInError,
        loginEmail: '이메일 형식이 올바르지 않습니다.'
      })
      return;
    }

    if (loginData.password === '') {
      setLogInError({
        ...logInError,
        password: '비밀번호를 입력해주세요.'
      })
      return;
    }

    try {
      const result = await signIn('credentials', {
        loginEmail: loginData.loginEmail,
        password: loginData.password,
        redirect: false,
        callbackUrl: callBackUrl ? callBackUrl : '/'
      });
      console.log(result);
      if (result?.status !== 200) {
        toast.custom((t) => (
          <LoginToast message='존재하지않음' />
        ));
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 로그인 입력 에러 처리
    if (name === 'loginEmail') {
      setLogInError({
        ...logInError,
        loginEmail: ''
      })
    } else if (name === 'password') {
      setLogInError({
        ...logInError,
        password: ''
      })
    }

    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  return (
    <div className="max-w-md mx-auto grid grid-cols-1 gap-4">
      <label className='block'>
        <span className='flex justify-between items-center text-base font-bold text-neutral-800 dark:text-neutral-200'>
          이메일
          <Link className="text-xs text-green-600" href='/'>
            이메일 찾기
          </Link>
        </span>
        <Input
          type="email"
          name="loginEmail"
          id="loginEmail"
          placeholder='example@example.com'
          className='mt-1'
          onChange={handleOnChange}
        />
        <div>{logInError.loginEmail}</div>
      </label>
      <label className='block'>
        <span className='flex justify-between items-center text-base font-bold text-neutral-800 dark:text-neutral-200'>
          비밀번호
          <Link className="text-xs text-green-600" href='/'>
            비밀번호 찾기
          </Link>
        </span>
        <Input
          type="password"
          name="password"
          id="password"
          defaultValue=''
          onChange={handleOnChange}
        />
        <div>{logInError.password}</div>
      </label>
      <ButtonPrimary onClick={handleLoginFetch}>로그인</ButtonPrimary>
    </div>
  )
}

export default LoginForm