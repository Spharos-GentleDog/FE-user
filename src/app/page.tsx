import React from 'react';
import SectionHowItWork from '@/components/SectionHowItWork/SectionHowItWork';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionPromo1 from '@/components/SectionPromo1';
import SectionHero2 from '@/components/SectionHero/SectionHero2';
import SectionSliderLargeProduct from '@/components/SectionSliderLargeProduct';
import SectionSliderProductCard from '@/components/SectionSliderProductCard';
import DiscoverMoreSlider from '@/components/DiscoverMoreSlider';
import SectionGridMoreExplore from '@/components/SectionGridMoreExplore/SectionGridMoreExplore';
import SectionPromo2 from '@/components/SectionPromo2';
import SectionSliderCategories from '@/components/SectionSliderCategories/SectionSliderCategories';
import SectionPromo3 from '@/components/SectionPromo3';
import SectionClientSay from '@/components/SectionClientSay/SectionClientSay';
import Heading from '@/components/Heading/Heading';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import { PRODUCTS, SPORT_PRODUCTS } from '@/data/data';
import SectionGridFeatureItems from '@/components/SectionGridFeatureItems';
import SectionMagazine5 from '@/app/blog/SectionMagazine5';
import SectionSliderProductCard2 from '@/components/SectionSliderProductCard2';

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      {/* make slider */}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard
          heading='신제품'
        />

        {/* <SectionSliderProductCard2 heading='신제품' /> */}

        <SectionSliderProductCard
          heading="베스트 셀러"
        />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore boxCard='box4' />
        </div>

        <SectionGridFeatureItems />

        <div className="mt-24 lg:mt-32">
          <DiscoverMoreSlider />
        </div>
      </div>
    </div>
  );
}

export default PageHome;
