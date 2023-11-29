'use client'

import Input from '@/shared/Input/Input'
import Select from '@/shared/Select/Select'
import React, { useEffect, useState } from 'react'
import ColorPalette from './ColorPalette'
import { DogBreedsType, SignupDogDataType } from '@/types/formDataType'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import AWS from 'aws-sdk'
import Image from 'next/image'
import defaultImage from '@/images/upload.png'
import toast from 'react-hot-toast'
import Toast from './Toast'

function SignupDogForm() {

    const router = useRouter();
    const param = useSearchParams();
    const [color, setColor] = useState<string>("");
    const [isView, setIsView] = useState<boolean>(false);
    const email = param.get('userEmail');

    // 반려동물 데이터
    const [signupDog, setSignupDog] = useState<SignupDogDataType>({
        dogImageUrl: '',
        dogName: '',
        dogAge: 0,
        dogBreed: 0,
        dogFurColor: '',
        dogWeight: 0,
        dogGender: '',
        dogLegLength: 0,
        dogBodyLength: 0,
        dogNeckGirth: 0,
        dogBreastGirth: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignupDog({
            ...signupDog,
            [name]: value,
        })
    }

    const handleColorPicker = () => {
        setIsView(!isView)
    }

    // 숫자만 입력
    const [inputValues, setInputValues] = useState({
        dogAge: '',
        dogWeight: '',
        dogBodyLength: '',
        dogLegLength: '',
        dogNeckGirth: '',
        dogBreastGirth: '',
    });

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const result = value.replace(/[^0-9]/g, '');

        setInputValues({
            ...inputValues,
            [name]: result,
        })
    }

    // 이미지 업로드
    const [file, setFile] = React.useState<File | null>(null);
    const [show, setShow] = React.useState<string>("hidden");
    const [preview, setPreview] = React.useState<string>("");

    AWS.config.update({
        region: process.env.AWS_REGION as string,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    });

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleSignupFetch = async () => {
        console.log(file)
        if (!file) {
            return;
        }

        const upload = new AWS.S3.ManagedUpload({
            params: {
                ACL: "public-read",
                Body: file,
                Key: "profile/" + file.name,
                Bucket: process.env.AWS_BUCKET_NAME as string,
            },
        });

        const promise = upload.promise();
        // promise.then((data: any) => {
        //     console.log("업로드 성공 : ", data.Location);
        //     setSignupDog({
        //         ...signupDog,
        //         dogImageUrl: data.Location,
        //     });
        // }).catch((err: any) => {
        //     console.log("업로드 오류 : ", err.message);
        // });

        // 반려견 이미지 저장
        const dogImageUrl = (await promise).Location;

        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/dog/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: email,
                dogImageUrl: dogImageUrl || "",
                dogName: signupDog.dogName,
                dogAge: signupDog.dogAge,
                dogBreed: signupDog.dogBreed,
                dogFurColor: signupDog.dogFurColor,
                dogWeight: signupDog.dogWeight,
                dogGender: signupDog.dogGender,
                dogLegLength: signupDog.dogLegLength,
                dogBodyLength: signupDog.dogBodyLength,
                dogNeckGirth: signupDog.dogNeckGirth,
                dogBreastGirth: signupDog.dogBreastGirth,
            }),
        })

        const result = await res.json();
        if (result.code === 200) {
            toast.custom((t) => (
                <Toast message="회원가입이 완료 되었습니다." />
            ))
            router.push('/login')
        }
    }

    const handleNext = () => {
        toast.custom((t) => (
            <Toast message="회원가입이 완료 되었습니다." />
        ))
    }
    const [dogBreeds, setDogBreeds] = useState<DogBreedsType[]>([]);
    useEffect(() => {
        const getDatas = async () => {
            const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/dog/breeds`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = await res.json();
            setDogBreeds(result.result);
        }
        getDatas();
    }, [])

    useEffect((): void => {
        if (file !== null) {
            setShow("block");
        }
    }, [show, file]);

    useEffect(() => {
        if (color) {
            setSignupDog({
                ...signupDog,
                dogFurColor: color,
            })
        }
    }, [color])
    return (
        <>
            <div className="max-w-md mx-auto grid grid-cols-1 gap-4">
                <div className='box-border pb-4 mt-20'>
                    <label className='block mb-5 relative'>
                        <div className="flex justify-center">
                            <div className="relative rounded-full overflow-hidden flex">
                                <Image
                                    src={preview ? preview : defaultImage}
                                    alt="dogImage"
                                    width={1920}
                                    height={1080}
                                    className="w-40 h-40 rounded-full object-cover z-0"
                                />
                                {
                                    preview ?
                                        ""
                                        :
                                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                                        </div>
                                }
                                <input
                                    type='file'
                                    id='dogImage'
                                    name='dogImage'
                                    className='hidden'
                                    onChange={handleChangeFile}
                                    accept='image/*' // 모든 타입 이미지 파일 허용
                                />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <Input
                                type='text'
                                placeholder='이름을 입력하세요.'
                                id='dogName'
                                name='dogName'
                                className='mt-1 border-[#000000]'
                                onChange={handleChange}
                            />
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <Input
                                type='text'
                                placeholder='나이를 입력하세요.'
                                id='dogAge'
                                name='dogAge'
                                className='mt-1 border-[#000000]'
                                onChange={handleChange}
                                onInput={handleNumber}
                                value={inputValues.dogAge || ''}
                            />
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange}>
                                <Select id='dogGender' name='dogGender'>
                                    <option value="0">성별을 선택해 주세요.</option>
                                    <option value="1">모름</option>
                                    <option value="2">수컷</option>
                                    <option value="3">암컷</option>
                                </Select>
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <Input
                                type='text'
                                placeholder='털색을 선택해 주세요.'
                                id='dogFurColor'
                                name='dogFurColor'
                                className='mt-1 border-[#000000]'
                                onChange={handleChange}
                                onClick={handleColorPicker}
                                readOnly
                                value={
                                    color ?
                                        color : ''
                                }
                            />
                            <div>
                                <ColorPalette isView={isView} setIsView={setIsView} color={color} setColor={setColor} />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange}>
                                <Select id='dogBreed' name='dogBreed' className='border-[#000000]'>
                                    <option>견종을 선택해 주세요.</option>
                                    {
                                        dogBreeds &&
                                        dogBreeds.map((breed) => (
                                            <option key={breed.id} value={breed.id}>{breed.dogBreedKorName}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange} >
                                <Input
                                    type='text'
                                    placeholder='몸무게를 입력하세요.'
                                    id='dogWeight'
                                    name='dogWeight'
                                    className='mt-1 border-[#000000]'
                                    onChange={handleChange}
                                    onInput={handleNumber}
                                    value={inputValues.dogWeight || ''}
                                />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange} >
                                <Input
                                    type='text'
                                    placeholder='다리 길이'
                                    id='dogLegLength'
                                    name='dogLegLength'
                                    className='mt-1 border-[#000000]'
                                    onChange={handleChange}
                                    onInput={handleNumber}
                                    value={inputValues.dogLegLength || ''}
                                />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange} >
                                <Input
                                    type='text'
                                    placeholder='몰 길이'
                                    id='dogBodyLength'
                                    name='dogBodyLength'
                                    className='mt-1 border-[#000000]'
                                    onChange={handleChange}
                                    onInput={handleNumber}
                                    value={inputValues.dogBodyLength || ''}
                                />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange} >
                                <Input
                                    type='text'
                                    placeholder='목 둘레'
                                    id='dogNeckGirth'
                                    name='dogNeckGirth'
                                    className='mt-1 border-[#000000]'
                                    onChange={handleChange}
                                    onInput={handleNumber}
                                    value={inputValues.dogNeckGirth || ''}
                                />
                            </div>
                        </div>
                    </label>
                    <label className='block mb-5 relative'>
                        <div className='mt-2'>
                            <div className='w-full' onChange={handleChange} >
                                <Input
                                    type='text'
                                    placeholder='가슴 둘레'
                                    id='dogBreastGirth'
                                    name='dogBreastGirth'
                                    className='mt-1 border-[#000000]'
                                    onChange={handleChange}
                                    onInput={handleNumber}
                                    value={inputValues.dogBreastGirth || ''}
                                />
                            </div>
                        </div>
                    </label>
                </div >
                <ButtonPrimary onClick={handleSignupFetch}>회원가입</ButtonPrimary>
                <div className='text-center font-semibold text-xs'>
                    <Link href='/login' onClick={handleNext}>
                        다음에 작성하기
                    </Link>
                </div>
            </div >

        </>
    )
}

export default SignupDogForm