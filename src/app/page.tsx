import React, { Suspense } from 'react';
import SectionHero2 from '@/components/SectionHero/SectionHero2';
import SectionSliderProductCard from '@/components/SectionSliderProductCard';
import SectionGridFeatureItems from '@/components/SectionGridFeatureItems';
import Chatbot from '@/components/Chatbot/Chatbot';
import loading from './loading';
import { ProductList } from '@/types/product/productList';

async function getProductData() {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/api/v1/product/product-find?categoryType=all&isDiscount=false&page=1`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();
    // console.log('data', data)
    return data
  }
  catch (err) {
    console.log(err);
  }
}

const PageHome = async () => {

  const myData = await getProductData();
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <div className="container relative space-y-16 my-24">
        <Suspense fallback={<p>...loading</p>}>
          <SectionSliderProductCard
            category='all'
            heading='HOT 신상'
            produdtData={myData.result as ProductList[]}
          />
        </Suspense>

        {/* <SectionSliderProductCard
          category='best'
          heading="베스트 셀러"
        /> */}

        <SectionGridFeatureItems />

      </div>
      <div className="mt-24 lg:mt-32 z-[9999]">
        <Chatbot />
      </div>
    </div>
  );
}

export default PageHome;
