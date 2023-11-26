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

    const handleCategoryFetch = async (categoryId: number) => {
        setTabActive(categoryId);

        try {
            const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-child-category-count?parentCategoryId=${categoryId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const childCategory = await res.json();
            setCategory(childCategory.result);
        } catch (error) {
            console.log('Error Fetch : ', error);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-parent-category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const parentCategory = await res.json();
                setCategoryData(parentCategory.result.parentCategoryDtoList);

                if (res.status === 200) {
                    const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/read-child-category-count?parentCategoryId=${parentCategory.result.parentCategoryDtoList[0].parentCategoryId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const result = await res.json();
                    setCategory(result.result);
                }

            } catch (error) {
                // console.log('Error Fetch : ', error);
            }
        }

        getData();
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
                        key={index}
                        isActive={tabActive === item.parentCategoryId}
                        onClick={() => handleCategoryFetch(item.parentCategoryId)}
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