"use client";
import React,{useState} from "react";
import Image from "next/image";
import Meal50 from "./../../../../public/images/promotions/Meal-50.webp";
import Kfc from "./../../../../public/images/promotions/kfc-coupons.jpg";
import Dominos from "./../../../../public/images/promotions/dominos.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ActivePromotions() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false, 
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };
  return (
    <div className="bg-[#1B2537]! flex-1 rounded">
      <p className="font-semibold py-2 px-2">Active Promotions</p>
      <Slider {...settings} style={{ 
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <div className={`px-2 border-none flex items-center justify-center ${
            currentSlide === 0 ? 'border-none' : ''
          }`}>
          <Image src={Dominos} alt={'Dominos'} className="rounded-lg" />
        </div>
        <div className={`px-2 border-none ${
            currentSlide === 0 ? 'border-none' : ''
          }`}>
          <Image src={Meal50} alt={'meal-50'} className="rounded-lg" />
        </div>
        {/* 1024x512 */}
        <div className="px-2 ">
          <Image src={Kfc} alt={'kfc-coupon'} className="rounded-lg !border-none" />
        </div>
      </Slider>
    </div>
  );
}

export default ActivePromotions;
