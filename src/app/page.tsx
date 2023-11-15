import React from 'react';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import SectionHero2 from '@/components/SectionHero/SectionHero2';
import SectionSliderProductCard from '@/components/SectionSliderProductCard';
import DiscoverMoreSlider from '@/components/DiscoverMoreSlider';
import SectionGridMoreExplore from '@/components/SectionGridMoreExplore/SectionGridMoreExplore';
import SectionGridFeatureItems from '@/components/SectionGridFeatureItems';
import Chatbot from '@/components/chatbot/Chatbot'; // Chatbot 컴포넌트 불러오기


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
          category='new'
          heading='신제품'
        />

        <SectionSliderProductCard
          category='best'
          heading="베스트 셀러"
        />

        <SectionGridFeatureItems />

      </div>
      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>
      
      {/* 챗봇 컴포넌트 추가 */}
        <Chatbot />
      
    </div>
  );
}

export default PageHome;