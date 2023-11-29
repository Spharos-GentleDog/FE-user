'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import defaultImage from '@/images/upload.png';
import { useRouter } from 'next/navigation';
import loadingImage from '@/images/loading.gif'

function Ai() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const res = await fetch(`https://gentledog-ai-new.duckdns.org/image_predict`, {
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
          const dogId = await res.json();

          console.log('dogId: ', dogId);
          if (dogId) {
            const res = await fetch(`${process.env.BASE_API_URL}/api/v1/review/find-review-dogId`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                dogIds: Array.of(2)
              }),
            });
            const productId = await res.json();

            console.log('productId: ', productId);
            if (productId) {
              const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/ai-product-detail`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  productIds: productId.result.productIdsList
                }),
              });

              const productDetail = await res.json();
              console.log('productDetail: ', productDetail);

              if (productDetail) {
                localStorage.setItem('aiProductDetail', JSON.stringify(productDetail.result));
                router.push('/ai/recommend');
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  return (
    <>
      {
        loading ?
          <div className="w-full h-screen relative flex justify-center items-center bg-white bg-opacity-50 z-[9999]">
            <Image src={loadingImage} alt="loading" width={25} height={25} />
            <div className='font-bold text-end'>
              AI 분석 중입니다.
            </div>
          </div>
          :
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
                    accept='image/jpg'
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
      }
    </>
  );
}

export default Ai;