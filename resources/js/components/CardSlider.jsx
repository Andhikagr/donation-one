import "swiper/css";
import "swiper/css/navigation";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "motion/react";

const CardSlider = ({ items }) => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderCard = (item, index) => (
        <motion.div
            key={index}
            className="relative group w-full hover:w-full lg:hover:w-[3000px] transition-all duration-1000 ease-in-out  overflow-hidden h-full "
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: index * 0.2,
            }}
        >
            <motion.img
                src={item.thumbnail_url}
                alt={item.title}
                className="w-full h-[500px] object-cover   "
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/50"></div>

            <motion.div
                className="absolute inset-x-0 bottom-0 h-1/3 flex items-end justify-center 
             bg-linear-to-t from-black/80 via-black/40 to-transparent 
             opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none "
            >
                <h5
                    className="text-center text-stone-200 translate-y-0 opacity-0 group-hover:-translate-y-10 group-hover:opacity-100 
               transition-all duration-800 pointer-events-none"
                >
                    {item.title}
                </h5>
                {/* <h5 className="text-center">{item.date}</h5>
                <p className="text-center">{item.unit}</p> */}
            </motion.div>
        </motion.div>
    );

    return isMobile ? (
        <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            autoplay={{ delay: 5000 }}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 2,
                },
            }}
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>{renderCard(item, index)}</SwiperSlide>
            ))}
        </Swiper>
    ) : (
        <div className="flex gap-1 mt-5 items-center justify-center">
            {items.slice(0, 5).map((item, index) => renderCard(item, index))}
        </div>
    );
};

export default CardSlider;
