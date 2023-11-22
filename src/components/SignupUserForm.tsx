import React, { useState } from 'react'
import ButtonSecondary from '@/shared/Button/ButtonSecondary'
import Input from '@/shared/Input/Input'
import Select from '@/shared/Select/Select'
import coolsms from 'coolsms-node-sdk'


function SignupUserForm(
    { setSignup,
        signup,
        signupError,
        setSignupError,
        authEmailConfirm,
        setAuthEmailConfirm,
        authPhoneConfirm,
        setAuthPhoneConfirm,
        refs,
    }:
        {
            setSignup: React.Dispatch<React.SetStateAction<any>>,
            signup: any,
            signupError: any,
            setSignupError: React.Dispatch<React.SetStateAction<any>>
            authEmailConfirm: boolean,
            setAuthEmailConfirm: React.Dispatch<React.SetStateAction<boolean>>
            authPhoneConfirm: boolean,
            setAuthPhoneConfirm: React.Dispatch<React.SetStateAction<boolean>>
            refs: any
        }) {

    // 정규식
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const error = signupError[name];
        if (error) {
            setSignupError({
                ...signupError,
                [name]: ''
            })
        }

        setSignup({
            ...signup,
            [name]: value,
        })
    }

    // 인증 관리
    const [authEmail, setAuthEmail] = useState<boolean>(false);
    const [authPhone, setAuthPhone] = useState<boolean>(false);
    const [authPhoneClick, setAuthPhoneClick] = useState<boolean>(false);

    // 이메일 인증
    const handleEmailAuth = async () => {
        if (signup.email === '') {
            setSignupError({
                ...signupError,
                email: '이메일을 입력해주세요.'
            })
            return;
        } else if (!emailRegEx.test(signup.email)) {
            setSignupError({
                ...signupError,
                email: '이메일 형식이 올바르지 않습니다.'
            })
            return;
        }

        const response = await fetch(`${process.env.BASE_API_URL}/api/v1/user/signup/email-check?userEmail=${signup.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        console.log(data);
        if (!data.result) {
            const response = await fetch(`${process.env.BASE_API_URL}/api/v1/user/signup/email-auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: signup.email,
                })
            })

            const data = await response.json();

            if (data.code === 200) {
                setAuthEmail(true);
            }
        } else {
            setSignupError({
                ...signupError,
                email: "이미 가입된 이메일 입니다!"
            })
        }
    }

    // 인증 코드 확인
    const handleAuthEmailCheck = async () => {
        const response = await fetch(`${process.env.BASE_API_URL}/api/v1/user/signup/email-verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: signup.email,
                code: signup.authEmail
            })
        })

        const data = await response.json();
        console.log(data);

        if (data.code === 200) {
            setAuthEmail(false);
            setAuthEmailConfirm(true);
        } else {
            setSignupError({
                ...signupError,
                authNumber: data.message
            })
        }
    }

    // cors 
    const messageService = new coolsms("NCSMAKYXI7OJI1SK", "V69IIMIHQSOTKLMJ4XHMHCIWHUT43FKR");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    // 휴대폰 인증
    const handlePhoneAuth = async () => {
        setRandomNumber(Math.floor(1000 + Math.random() * 9000));

        if (signup.phoneNumber === '') {
            setSignupError({
                ...signupError,
                phoneNumber: '휴대폰번호를 입력해주세요.'
            })
            return;
        }

        try {
            const result = await messageService.sendOne({
                to: signup.phoneNumber,
                from: '01049126545',
                text: `[젠틀독] 인증번호 [${randomNumber}]를 입력해주세요.`,
                autoTypeDetect: false
            })
                .then((result: any) => {
                    console.log(result);
                    setAuthPhone(true);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleAuthPhoneCheck = async () => {
        if (signup.authPhone === '') {
            setSignupError({
                ...signupError,
                authNumber: '인증번호를 입력해주세요.'
            })
            return;
        } else if (signup.authPhone !== randomNumber) {
            setSignupError({
                ...signupError,
                authNumber: '인증번호가 일치하지 않습니다.'
            })
            return;
        }

        if (signup.authPhone === randomNumber) {

            setAuthPhone(false);
            setAuthPhoneConfirm(true);
        }
    }
    // 나이 및 휴대폰번호 숫자만 입력
    const [intputAge, setIntputAge] = useState<string>('');
    const [intputPhoneNumber, setIntputPhoneNumber] = useState<string>('');

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const result = value.replace(/[^0-9]/g, '');
        if (name === 'age') {
            setIntputAge(result);
        } else if (name === 'phoneNumber') {
            setIntputPhoneNumber(result);
        }
    }

    return (
        <>
            <label className='block relative'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    이메일
                    <span className='absolute text-red-600 ml-1.5 mt-1.5'> * </span>
                </span>
                <div className='flex'>
                    <Input
                        type='email'
                        placeholder='이메일 형식으로 입력'
                        id='email'
                        name='email'
                        className='mt-1 border-[#000000]'
                        ref={refs.emailRef}
                        onChange={handleChange}
                    />
                    {
                        authEmailConfirm ?
                            <div className='absolute -right-0 '>
                                <ButtonSecondary
                                    fontSize='text-[10px]'
                                    sizeClass='py-2 px-3'
                                    translate='top-[5px]'
                                    onClick={handleEmailAuth}
                                    disabled
                                >
                                    인증 완료
                                </ButtonSecondary>
                            </div>
                            :
                            <div className='absolute -right-0 '>
                                <ButtonSecondary
                                    fontSize='text-[10px]'
                                    sizeClass='py-2 px-3'
                                    translate='top-[5px]'
                                    onClick={handleEmailAuth}
                                >
                                    이메일 인증
                                </ButtonSecondary>
                            </div>
                    }
                </div>
                <span className='animate-errorTxt text-xs ml-4'>{signupError.email}</span>
            </label>
            {
                authEmail ?
                    <label className='block mb-5 relative'>
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            인증코드
                        </span>
                        <div className='flex'>
                            <Input
                                className='mt-1 border-[#000000]'
                                type='text'
                                placeholder='인증코드 6자리'
                                id='authEmail'
                                name='authEmail'
                                onChange={handleChange}
                            />
                            <div className='absolute -right-1'>
                                <ButtonSecondary
                                    fontSize='text-[10px]'
                                    sizeClass='py-2 px-3'
                                    translate='top-[5px]'
                                    // onClick={() => setAuthEmailClick(true)}
                                    onClick={handleAuthEmailCheck}
                                >
                                    인증확인
                                </ButtonSecondary>
                            </div>
                        </div>
                        <div className='animate-errorTxt text-xs ml-4 mt-1'>{signupError.authNumber}</div>
                    </label>
                    :
                    null
            }
            <label className='block mb-5 '>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    비밀번호
                    <span className='absolute text-red-600 ml-1.5 mt-1.5'> * </span>
                </span>
                <Input
                    className='mt-1 border-[#000000]'
                    type='password'
                    placeholder='영문자, 특수문자 포함 8자 이상'
                    id='password'
                    name='password'
                    ref={refs.passwordRef}
                    onChange={handleChange}
                />
                <div className='animate-errorTxt text-xs ml-4 mt-1'>{signupError.password}</div>
            </label>
            <label className='block mb-5'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    비밀번호 확인
                    <span className='absolute text-red-600 ml-1.5 mt-1.5'> * </span>
                </span>
                <Input
                    className='mt-1 border-[#000000]'
                    type='password'
                    placeholder='위에 비밀번호와 동일하게 입력'
                    id='passwordConfirm'
                    name='passwordConfirm'
                    ref={refs.passwordConfirmRef}
                    onChange={handleChange}
                />
                <div className='animate-errorTxt text-xs ml-4 mt-1'>{signupError.passwordConfirm}</div>
            </label>
            <label className='block mb-5'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    이름
                    <span className='absolute text-red-600 ml-1.5 mt-1.5'> * </span>
                </span>
                <Input
                    className='mt-1 border-[#000000]'
                    type='text'
                    placeholder='이름 입력'
                    id='name'
                    name='name'
                    ref={refs.nameRef}
                    onChange={handleChange}
                />
                <div className='animate-errorTxt text-xs ml-4'>{signupError.name}</div>
            </label>
            <label className='block mb-5 relative'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    성별
                </span>
                <div className='flex' onChange={handleChange}>
                    <Select id='gender' name='gender'>
                        <option value="0">선택안함</option>
                        <option value="1">남자</option>
                        <option value="2">여자</option>
                    </Select>
                </div>
            </label>
            <label className='block mb-5 relative'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    나이
                </span>
                <div className='flex'>
                    <Input
                        className='mt-1 border-[#000000]'
                        type='text'
                        placeholder='나이 입력'
                        id='age'
                        name='age'
                        onChange={handleChange}
                        onInput={handleNumber}
                        value={intputAge || ''}
                    />
                </div>
            </label>
            <label className='block mb-5 relative'>
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    휴대폰번호
                    <span className='absolute text-red-600 ml-1.5 mt-1.5'> * </span>
                </span>
                <div className='flex'>
                    <Input
                        className='mt-1 border-[#000000]'
                        type='text'
                        placeholder='ex) 01091224781'
                        id='phoneNumber'
                        name='phoneNumber'
                        ref={refs.phoneNumberRef}
                        onChange={handleChange}
                        onInput={handleNumber}
                        value={intputPhoneNumber || ''}
                    />
                    <div className='absolute -right-0 '>
                        <ButtonSecondary
                            fontSize='text-[10px]'
                            sizeClass='py-2 px-3'
                            translate='top-[5px]'
                            onClick={handlePhoneAuth}
                        >
                            휴대전화 인증
                        </ButtonSecondary>
                    </div>
                </div>
                {
                    authPhone ?
                        <label className='block mb-5 relative'>
                            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                                인증번호
                            </span>
                            <div className='flex'>
                                <Input
                                    className='mt-1 border-[#000000]'
                                    type='text'
                                    placeholder='인증번호 6자리'
                                    id='authPhone'
                                    name='authPhone'
                                    onChange={handleChange}
                                />
                                <div className='absolute -right-1'>
                                    <ButtonSecondary
                                        fontSize='text-[10px]'
                                        sizeClass='py-2 px-3'
                                        translate='top-[5px]'
                                        // onClick={() => setAuthPhoneClick(true)}
                                        onClick={handleAuthPhoneCheck}
                                    >
                                        인증확인
                                    </ButtonSecondary>
                                </div>
                            </div>
                            <div className='animate-errorTxt text-xs ml-4 mt-1'>{signupError.authNumber}</div>
                        </label>
                        :
                        null
                }
                <div className='animate-errorTxt text-xs ml-4 mt-1'>{signupError.phoneNumber}</div>
            </label>

        </>
    )
}

export default SignupUserForm