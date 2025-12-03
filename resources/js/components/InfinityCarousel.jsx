import React from "react";

const InfiniteCarousel = ({ items }) => {
    const repeatedItems = [...items, ...items]; // 2x duplikasi

    return (
        <div className="relative w-full overflow-hidden">
            {/* Fade Left */}
            <div
                className="pointer-events-none absolute left-0 top-0 h-full w-32 
                            bg-linear-to-r from-white to-transparent z-20"
            ></div>

            {/* Fade Right */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-full w-32 
                            bg-linear-to-l from-white to-transparent z-20"
            ></div>
            <div
                className="flex will-change-transform animate-scroll"
                style={{
                    width: "max-content",
                }}
            >
                {repeatedItems.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="flex-none w-64 h-52 p-2 rounded-2xl overflow-hidden cursor-default mx-2 flex flex-col items-center justify-between  bg-white "
                        >
                            <div className="py-1">
                                <img
                                    src={item.image_url}
                                    alt={item.campus}
                                    className="h-32 object-contain mx-auto"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
