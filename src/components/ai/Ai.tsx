'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import defaultImage from '@/images/upload.png';

function Ai() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {

      // formData 생성
      const formData = new FormData();
      formData.append('img', selectedFile);

      console.log('formData: ', formData.get('img'))
      try {

        const res = await fetch(`http://gentledog-back.duckdns.org:5000/image_predict`, {
          method: 'POST',
          body: formData,
        });
        const breed = await res.json();
        const breedName = breed.result1.toLowerCase();

        if (breed) {
          const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/dog/breeds/eng-name/${breedName}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const breedId = await res.json();
          console.log(breedId);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  return (
    <div className="mt-10">
      <label className='block mb-5 relative'>
        <div className="flex justify-center">
          <div className="relative overflow-hidden flex">
            <Image
              src={selectedFile ? URL.createObjectURL(selectedFile) : defaultImage}
              alt="dogImage"
              width={300}
              height={300}
              className="w-300 h-300 mx-auto"
            />
            {
              selectedFile ?
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
              onChange={handleFileChange}
              accept='image/jpg' // 모든 타입 이미지 파일 허용
            />
          </div>
        </div>
      </label>
      <br />
      <div className="flex justify-center gap-[10px] mb-5">
        <button
          onClick={handleFileUpload}
          className="bg-black text-white px-5 py-[10px] border-none cursor-pointer rounded-3xl mr-50"
        >
          Upload
        </button>
        <button
          onClick={handleFileDelete}
          className="bg-white text-black px-5 py-[10px] border-2 border-black cursor-pointer rounded-3xl"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Ai;