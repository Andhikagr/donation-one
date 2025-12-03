import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "motion/react";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoIosArrowRoundBack,
    IoIosArrowRoundForward,
} from "react-icons/io";
import AnimateIn from "./AnimateIn";
import { Link } from "@inertiajs/react";
import {
    MdArrowBack,
    MdArrowBackIosNew,
    MdArrowForwardIos,
} from "react-icons/md";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const SliderFive = ({
    reverse,
    items,
    breakpoints,
    imageClass = "w-full h-full object-cover",
    prevClass = "",
    nextClass = "",
    className = "",
    titleClassname = "",
    getArticleUrl,
}) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const renderCard = (item, index) => {
        const TitleTag = item.titleTag || "h3";
        const getHeightByIndex = (i) => (i % 2 === 0 ? " md:mt-10" : "");
        return (
            <AnimateIn
                direction="up"
                duration={1}
                key={index}
                className={className}
            >
                <Link
                    href={item.urls || "#"}
                    onClick={() => console.log("Clicked URL:", item.urls)}
                >
                    <div className="overflow-hidden h-full w-full ">
                        <img
                            src={item.image_url}
                            alt={item.title}
                            className={`${imageClass} ${getHeightByIndex(
                                index
                            )}`}
                            loading="lazy"
                        />
                    </div>
                    <div className="py-2 flex items-center flex-col gap-2">
                        <TitleTag className={titleClassname}>
                            {item.title}
                        </TitleTag>
                        <span className="bg-amber-400 px-4 py-1 rounded-4xl text-white">
                            Infaq Sekarang
                        </span>
                    </div>
                </Link>
            </AnimateIn>
        );
    };

    return (
        <div className=" relative">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                speed={700}
                breakpoints={breakpoints}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        {renderCard(item, index)}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderFive;
