import React from 'react';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionHero2 from '@/components/SectionHero/SectionHero2';
import SectionSliderProductCard from '@/components/SectionSliderProductCard';
import SectionGridMoreExplore from '@/components/SectionGridMoreExplore/SectionGridMoreExplore';
import SectionGridFeatureItems from '@/components/SectionGridFeatureItems';
import Chatbot from '@/components/Chatbot/Chatbot';

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          category='all'
          heading='HOT 신상'
        />

        {/* <SectionSliderProductCard
          category='best'
          heading="베스트 셀러"
        /> */}

        <SectionGridFeatureItems />

      </div>
      <div className="mt-24 lg:mt-32">
        {/* <DiscoverMoreSlider /> */}
        {/* 챗봇 컴포넌트 추가 */}
        <Chatbot />
      </div>
    </div>
  );
}

export default PageHome;
