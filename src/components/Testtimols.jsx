import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import TestimalContent from './TestimalContent';

export default function Testtimols() {
    const testimonials = [
        { name: 'Ahmed Khan', position: 'XYZ Hospital', comment: 'The simulation tool has transformed how we model and analyze complex scenarios. Highly effective and intuitive!' },
        { name: 'Fatima Noor', position: 'XYZ Hospital', comment: 'We\'ve been utilizing the simulator for over a year, and it has greatly improved our decision-making processes by providing accurate results.' },
        { name: 'Aisha Siddiqui', position: 'XYZ Hospital', comment: 'An outstanding simulator that helps us predict outcomes and streamline our workflow efficiently.' },
        { name: 'Omar Farooq', position: 'XYZ Hospital', comment: 'This simulator simplifies the analysis of critical operations. A powerful tool for any organization looking to enhance their processes.' },
        { name: 'Hassan Ali', position: 'XYZ Hospital', comment: 'The simulator has become an indispensable part of our training sessions. Its realism and accuracy are unparalleled.' },
    ];
    
    
  return (
    <div >
        <h1 className='text-center md:text-5xl text-3xl mt-5 font-bold'>Reviews</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 60,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {
            testimonials.map((item,index)=>{
                return(<>
                <SwiperSlide>
                    <TestimalContent data={item} idx={index}/>
                </SwiperSlide>
                </>)
            })
        }
      </Swiper>
    </div>
  );
}
