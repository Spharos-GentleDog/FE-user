'use client'

import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { SignupAddressDataType, SignupDataType, SignupDogDataType } from '@/types/formDataType'
import React, { useRef, useState } from 'react'
import SignupUserForm from './SignupUserForm'
import SignupAddressForm from './SignupAddressForm'
import { useRouter } from 'next/navigation'

function SignupForm() {
  // 회원가입 폼 데이터
  const [signup, setSignup] = useState<SignupDataType>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    age: 0,
    gender: 0,
    phoneNumber: '',
    authEmail: '',
  })

  // 회원가입 에러 처리
  const [signupError, setSignupError] = useState<any>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phoneNumber: '',
  })

  // 회원가입 주소 데이터
  const [signupAddress, setSignupAddress] = useState<SignupAddressDataType>({
    address: '',
    addressDetail: '',
  });


  // 이메일 인증 확인
  const [authEmailConfirm, setAuthEmailConfirm] = useState<boolean>(false);
  const [authPhoneConfirm, setAuthPhoneConfirm] = useState<boolean>(false);

  // 포커스
  const refs = {
    emailRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
    passwordConfirmRef: useRef<HTMLInputElement>(null),
    nameRef: useRef<HTMLInputElement>(null),
    phoneNumberRef: useRef<HTMLInputElement>(null),
  }

  const { emailRef, passwordRef, passwordConfirmRef, nameRef, phoneNumberRef } = refs;

  // 정규식
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;
  const phoneNumberRegEx = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

  const router = useRouter();
  // 회원가입
  const handleSignupFetch = async () => {
    // 이메일 정규식
    if (signup.email === '') {
      setSignupError({
        ...signupError,
        email: '이메일을 입력해주세요.'
      })

      if (emailRef.current) {
        emailRef.current.focus();
      }

      return;
    } else if (!emailRegEx.test(signup.email)) {
      setSignupError({
        ...signupError,
        email: '이메일 형식이 올바르지 않습니다.'
      })
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    } else if (!authEmailConfirm) {
      setSignupError({
        ...signupError,
        email: '이메일 인증을 해주세요.'
      })
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    // 비밀번호 정규식
    if (signup.password === '') {
      setSignupError({
        ...signupError,
        password: '비밀번호를 입력해주세요.'
      })

      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    } else if (!passwordRegEx.test(signup.password)) {
      setSignupError({
        ...signupError,
        password: '비밀번호는 영문자, 특수문자 포함 8자 이상 16자 이하입니다.'
      })

      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return;
    }

    // 비밀번호 확인
    if (signup.password !== signup.passwordConfirm) {
      setSignupError({
        ...signupError,
        passwordConfirm: '비밀번호가 일치하지 않습니다.'
      })
      if (passwordConfirmRef.current) {
        passwordConfirmRef.current.focus();
      }
      return;
    }

    // 이름
    if (signup.name === '') {
      setSignupError({
        ...signupError,
        name: '이름을 입력해주세요.'
      })
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }

    // 휴대폰번호 정규식
    if (signup.phoneNumber === '') {
      setSignupError({
        ...signupError,
        phoneNumber: '휴대폰번호를 입력해주세요.'
      })
      if (phoneNumberRef.current) {
        phoneNumberRef.current.focus();
      }
      return;
    } else if (!phoneNumberRegEx.test(signup.phoneNumber)) {
      setSignupError({
        ...signupError,
        phoneNumber: '형식에 맞지 않는 번호입니다.'
      })
      if (phoneNumberRef.current) {
        phoneNumberRef.current.focus();
      }
      return;
      // } else if (!authPhoneConfirm) {
      //   setSignupError({
      //     ...signupError,
      //     phoneNumber: '휴대폰번호 인증을 해주세요.'
      //   })
      //   if (phoneNumberRef.current) {
      //     phoneNumberRef.current.focus();
      //   }
      //   return;
    }

    try {
      const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: signup.email,
          password: signup.password,
          usersName: signup.name,
          userGender: signup.gender,
          userAge: signup.age,
          userPhoneNumber: signup.phoneNumber,
          userAddress: signupAddress.address + signupAddress.addressDetail,
        })
      })
      const result = await res.json();
      if (result.code === 200) {
        alert('회원가입이 완료되었습니다.')
        router.push(`/signup/pet?${signup.email}`)
      }
    } catch (error) {
      console.log(error)
    }

    console.log(signup)
    console.log(signupAddress)

    // router.push(`/signup/pet?${signup.email}`)
  }

  return (
    <div className="max-w-md mx-auto grid grid-cols-1 gap-4">
      <div className='box-border pb-4'>
        <SignupUserForm
          setSignup={setSignup}
          setSignupError={setSignupError}
          signup={signup}
          signupError={signupError}
          setAuthEmailConfirm={setAuthEmailConfirm}
          setAuthPhoneConfirm={setAuthPhoneConfirm}
          refs={refs}
        />
        <SignupAddressForm
          signupAddress={signupAddress}
          setSignupAddress={setSignupAddress}
        />

      </div>
      <ButtonPrimary onClick={handleSignupFetch}>다음으로</ButtonPrimary>
    </div>
  )
}

export default SignupForm