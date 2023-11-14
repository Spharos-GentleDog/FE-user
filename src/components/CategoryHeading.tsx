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

    const [tabActive, setTabActive] = useState<number>(1);
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
            // console.log('data : ', data);
            setCategory(data);
        } catch (error) {
            console.log('Error Fetch : ', error);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("https://653230c34d4c2e3f333dbc82.mockapi.io/category", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setCategoryData(data);

            } catch (error) {
                console.log('Error Fetch : ', error);
            }
        }

        getData().then(() => {
            setTabActive(1);

            fetch(`https://653230c34d4c2e3f333dbc82.mockapi.io/category?parentCategoryId=${tabActive}`, {
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
                        key={index}
                        isActive={tabActive === item.categoryId}
                        onClick={() => handleCategoryFetch(item.categoryId, item.categoryName)}
                    >
                        <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm ">
                            {item.categoryName}
                        </div>
                    </NavItem2>
                ))}
            </Nav>
        </div>
    )
}

export default CategoryHeading