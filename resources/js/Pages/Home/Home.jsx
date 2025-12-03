import React, { useState } from "react";
import Layout from "../../Layout/layout";
import TextSlider from "../../components/TetxSLider";
import EditorFlat from "../../components/EditorFlat";
import AnimateIn from "../../components/AnimateIn";
import { Link, usePage } from "@inertiajs/react";
import logo from "../../../assets/logo.png";
import { DataMenuLeft } from "../../../data/DataMenuLeft";
import { div, title } from "motion/react-client";
import CardSlider from "../../components/CardSlider";
import SlidesImages from "../../components/SlidesImage";
import SliderFive from "../../components/SliderFive";
import InfiniteCarousel from "../../components/InfinityCarousel";
import BigSlides from "../../components/BigSlides";
import CustomMap from "../../components/CustomMap";

const Home = () => {
    const {
        tentang,
        bantuan,
        article,
        hero,
        galeri,
        sponsor,
        banner,
        report,
        province,
    } = usePage().props;
    // ambil submenu
    // const programBantuanMenu = DataMenuLeft.find(
    //     (item) => item.label === "Program Bantuan"
    // );
    // const programBantuanSubmenu = programBantuanMenu?.submenu || [];

    return (
        <div className="text-theme">
            <section className="flex  items-center min-h-screen relative   ">
                <div className="fixed ">
                    <SlidesImages heroSlides={hero} />
                    <Link
                        href={"/formulir"}
                        className=" absolute bottom-[5%] z-10 left-[5%] py-3 px-5 border-2 border-neutral-100 rounded-4xl cursor-pointer hover:bg-lime-600 group hover:border-lime-600 "
                    >
                        <p className="font-bold  text-neutral-100">
                            Pengajuan Bantuan
                        </p>
                    </Link>
                </div>
            </section>
            <section
                id="about"
                className="py-20 px-[10%] z-20 relative bg-white "
            >
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-center justify-items-center ">
                    <AnimateIn
                        direction="up"
                        duration={2}
                        delay={0.5}
                        className="flex flex-col gap-5 max-w-[700px]"
                    >
                        <h3 className="text-neutral-800 font-bold">
                            Tentang Kami
                        </h3>
                        <EditorFlat
                            content={tentang.content}
                            truncateLength={800}
                            className="font-bold"
                        />
                        <div className=" hover:bg-lime-600 border-2 border-lime-600  py-3 px-5 rounded-4xl  w-fit cursor-pointer g group">
                            <p className="font-medium  group-hover:text-white">
                                Lihat Selengkapnya
                            </p>
                        </div>
                    </AnimateIn>
                    <AnimateIn
                        duration={2}
                        delay={0.5}
                        direction="up"
                        className="bg-lime-50 rounded-full w-80 h-80 md:h-96 md:w-96 px-5 flex items-center justify-center"
                    >
                        <img src={logo} alt="" className="w-[80%] md:w-full" />
                    </AnimateIn>
                </div>
            </section>
            <section className="  py-10   w-full z-20 relative bg-white ">
                <AnimateIn
                    direction="up"
                    duration={1}
                    className="mb-10 flex items-center justify-center "
                >
                    <h3 className="text-neutral-800 font-bold text-center">
                        Mari Berta'awun Bersama Program Kami
                    </h3>
                </AnimateIn>
                <SliderFive
                    items={galeri.map((g) => {
                        return {
                            image_url: g.image_url,
                            title: g.title,

                            // gunakan url yang sudah disimpan
                        };
                    })}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1268: { slidesPerView: 5 },
                    }}
                    className="relative group flex flex-col justify-center items-center overflow-hidden cursor-pointer h-full  mt-5"
                    imageClass="rounded-0 md:rounded-2xl group-hover:grayscale object-contain transition-all duration-500 ease-in-out overflow-hidden"
                    direction="horizontal"
                    titleClassname=" text-[18px] font-semibold text-base group-hover:hover:text-gray-500 text-center "
                />
            </section>

            <section className="py-20 px-[10%] min-h-screen z-10  bg-white relative">
                <div className="flex flex-col gap-5">
                    <AnimateIn
                        direction="up"
                        duration={1}
                        className="flex justify-between items-center"
                    >
                        <h3 className="text-neutral-800 font-bold mb-5">
                            Kegiatan Terkini SIP
                        </h3>
                        <div className=" hover:bg-lime-600 border-2 border-lime-600  py-1 md:py-3 px-5 rounded-4xl  w-fit cursor-pointer g group">
                            <p className="font-medium  group-hover:text-white text-center">
                                Lihat Selengkapnya
                            </p>
                        </div>
                    </AnimateIn>
                    <BigSlides slides={banner} />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
                        {report.map((rep, i) => {
                            return (
                                <AnimateIn
                                    direction="left"
                                    delay={0.3 * i}
                                    duration={1}
                                    key={i}
                                    className="flex flex-col  shadow-theme rounded-2xl"
                                >
                                    <img
                                        src={rep.thumbnail_url}
                                        alt=""
                                        className="w-full h-full md:h-80 rounded-t-2xl"
                                    />
                                    <div className="flex flex-col gap-1 p-5">
                                        <h6 className="text-center font-semibold">
                                            {rep.title}
                                        </h6>
                                        <hr className="text-neutral-200 py-0.5 " />
                                        <EditorFlat
                                            content={rep.content}
                                            truncateLength={80}
                                            className="text-neutral-400 editor-override "
                                        />
                                        <p className="font-medium text-[15px]">
                                            Lihat Selengkapnya
                                        </p>
                                    </div>
                                </AnimateIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-10 px-[10%]  min-h-screen z-20 relative bg-white">
                <AnimateIn
                    direction="up"
                    duration={1}
                    className="flex items-center justify-center"
                >
                    <h3 className="text-center">Jangkauan Penerima Manfaat</h3>
                </AnimateIn>
                <CustomMap provinces={province} />
            </section>
            <section className="py-10 px-[10%]  z-20 relative bg-white">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <AnimateIn
                        direction="up"
                        duration={1}
                        className="flex flex-col gap-2 items-center justify-center"
                    >
                        <h3 className="text-center font-bold">
                            Jazaakumullahu Khairan
                        </h3>
                        <p>
                            Atas donasi dan dukungan Muhsinin SIP hingga saat
                            ini...
                        </p>
                    </AnimateIn>
                    <InfiniteCarousel items={sponsor} />
                </div>
            </section>
        </div>
    );
};

Home.layout = (page) => <Layout children={page} />;
export default Home;
