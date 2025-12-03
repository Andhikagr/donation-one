import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaCircle, FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "motion/react";
import TextSlider from "./TetxSLider";
import { Link } from "@inertiajs/react";

const SlidesImages = ({ heroSlides }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Swiper
            key={heroSlides.length}
            modules={[EffectFade, Navigation, Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            slidesPerView={1}
            speed={1000}
            className="h-screen w-screen "
            effect="fade"
            navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
                // bind refs ke Swiper sebelum init
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
            }}
        >
            {heroSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div
                        className="bg-cover bg-center h-screen w-full flex relative "
                        style={{ backgroundImage: `url(${slide.image_url})` }}
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/80 pointer-events-none"></div>

                        <div className="absolute top-[15%] md:top-[20%] z-10 pointer-events-auto flex flex-col w-fit h-fit gap-5 items-center justify-center  ">
                            <div className="h-48 max-w-[90%] lg:max-w-[50%] ">
                                <TextSlider />
                            </div>
                            <h6 className="mt-10 font-semibold text-center max-w-[50%] lg:max-w-[50%] text-neutral-100 text-shadow-lg ">
                                Solidaritas Insan Peduli menyalurkan bantuan
                                dana infaq, sedekah dan zakat yang bersifat
                                insidentil kepada yang membutuhkan melalui tahap
                                verifikasi sesuai dengan SOP dan program yang
                                berjalan
                            </h6>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            {/* 🔽 Custom navigation buttons */}
            <button
                ref={prevRef}
                className="custom-prev absolute top-1/2 left-5 z-20 bg-black/50 text-stone-200 rounded-full p-2 border-2 border-stone-200 transform -translate-y-1/2 cursor-pointer active:scale-110 transition-all ease-in-out duration-300 hover:border-lime-600 hover:text-lime-600"
            >
                <FaLongArrowAltLeft size={22} />
            </button>
            <button
                ref={nextRef}
                className="custom-next absolute top-1/2 right-8 z-20 transform -translate-y-1/2 bg-black/50 text-stone-200  rounded-full p-2 border-2 border-stone-200 cursor-pointer active:scale-110 transition-all ease-in-out duration-300  hover:border-lime-600 hover:text-lime-600"
            >
                <FaLongArrowAltRight size={22} />
            </button>
        </Swiper>
    );
};

export default SlidesImages;
