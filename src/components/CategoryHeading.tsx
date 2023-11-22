'use client'

import React, { useEffect, useState } from 'react'
import NavItem2 from './NavItem2'
import Nav from '@/shared/Nav/Nav'
import Heading from '@/shared/Heading/Heading';
import { ParentCategoryType } from '@/types/product/category';

function CategoryHeading({
    setCategory,
}: {
    setCategory: any
}) {

    const [tabActive, setTabActive] = useState(1);
    const [categoryData, setCategoryData] = useState<ParentCategoryType[]>([]);

    const handleCategoryFetch = async (categoryId: number, categoryName: string) => {
        setTabActive(categoryId);

        try {
            const res = await fetch(`https://653230c34d4c2e3f333dbc82.mockapi.io/category?parentCategoryId=${categoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            setCategory(data);
        } catch (error) {
            console.log('Error Fetch : ', error);
        }
    }

    useEffect(() => {
        console.log(process.env.BASE_API_URL)
        const getData = async () => {
            try {
                const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                setCategoryData(data.result.parentCategoryDtoList);

            } catch (error) {
                // console.log('Error Fetch : ', error);
            }
        }

        // getData().then(() => {
        //     // todo: 데이터 받아오고 나서 첫번째 카테고리 데이터 받아오기(전체 카테고리)
        //     fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(res => res.json()).then(data => setCategory(data.result.parentCategoryDtoList));
        // });

        getData().then(() => {
            // todo: 데이터 받아오고 나서 첫번째 카테고리 데이터 받아오기(전체 카테고리)
            fetch(`https://653230c34d4c2e3f333dbc82.mockapi.io/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => setCategory(data));
        });
    }, []);

    return (
        <div>
            <Heading
                className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 text-3xl md:text-4xl 2xl:text-5xl font-semibold"
                isCenter
            >
                반려동물 1등 쇼핑몰 젠틀독
            </Heading>
            <Nav
                className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto hiddenScrollbar"
                containerClassName="mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
            >
                {categoryData?.map((item, index) => (
                    <NavItem2
                        key={item.parentCategoryId}
                        isActive={tabActive === item.parentCategoryId}
                        onClick={() => handleCategoryFetch(item.parentCategoryId, item.parentCategoryName)}
                    >
                        <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                            {item.parentCategoryName}
                        </div>
                    </NavItem2>
                ))}
            </Nav>
        </div>
    )
}

export default CategoryHeading