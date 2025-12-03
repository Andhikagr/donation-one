import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaCircle, FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "motion/react";
import AnimateIn from "./AnimateIn";

const BigSlides = ({ slides }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Swiper
            key={slides.length}
            modules={[EffectFade, Autoplay]}
            loop={true}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            slidesPerView={1}
            speed={1000}
            className="w-full h-full "
            effect="fade"
            onSwiper={(swiper) => {
                // Bind custom navigation buttons
                setTimeout(() => {
                    if (swiper.params) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }
                });
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <AnimateIn
                        direction="up"
                        duration={1}
                        className="w-full h-full flex relative "
                    >
                        <img
                            src={slide.image_url}
                            alt=""
                            className="w-full h-full "
                        />
                    </AnimateIn>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BigSlides;
