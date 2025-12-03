import React, { useEffect, useState } from "react";
import { MenuLeft } from "./MenuLeft";
import { MenuRight } from "./MenuRight";
import logo from "../../assets/logo.png";
import { DataMenu } from "../../data/DataMenu";
import { BiMenu } from "react-icons/bi";
import Drawer from "./Drawer";
import { FaRegWindowClose } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { usePage } from "@inertiajs/react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [search, setSearch] = useState("");
    const [showDrawer, setShowDrawer] = useState(false);
    const { url: currentUrl } = usePage();

    useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * 0.1;
            const isSmall = window.innerWidth <= 1024;
            const isNot = ["/formulir"].some((path) =>
                currentUrl.startsWith(path)
            );

            if (isNot) {
                // Search -> selalu scrolled true seperti small screen
                setScrolled(true);
                return;
            }

            // Semua halaman lain termasuk /, /profile, /kegiatan, /guru, /about, dll
            if (isSmall) {
                setScrolled(true);
            } else {
                setScrolled(window.scrollY > threshold);
            }
        };

        handleScroll(); // cek awal saat page load
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll); // cek juga saat resize
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <nav>
            <section
                className={`hidden fixed z-9999 w-full py-4 md:flex items-center  justify-between px-[10%] transition-all ease-in-out duration-500  ${
                    scrolled ? "shadow-theme bg-white " : "bg-transparent  "
                }`}
            >
                <MenuLeft />
                <img
                    src={logo}
                    alt=""
                    className={`hidden md:flex w-14 xl:absolute left-1/2 transition-all duration-400 ease-in-out  ${
                        scrolled
                            ? "scale-100  translate-y-0"
                            : "scale-200  bg-white rounded-full translate-y-10"
                    }`}
                />
                <MenuRight />
                <div className="hidden md:flex items-center xl:hidden gap-5">
                    {DataMenu.map((menu, i) => {
                        return (
                            <li key={i} className="list-none">
                                <a
                                    href=""
                                    className={`  ${
                                        scrolled
                                            ? "text-theme"
                                            : " text-neutral-100"
                                    }`}
                                >
                                    {menu.label}
                                </a>
                            </li>
                        );
                    })}
                    <div className="relative flex items-center gap-5 text-white ">
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`px-3 py-1.5 rounded-full border-2 border-lime-600 text-sm w-20 focus:w-56 transition-all duration-300
                        ${
                            scrolled
                                ? "placeholder-neutral-700"
                                : "placeholder-white"
                        }
                        `}
                        />
                    </div>
                </div>
            </section>
            <div className="flex fixed bg-white w-full z-9999 items-center justify-between px-[10%] py-2 md:hidden">
                <img src={logo} alt="" className="w-14 md:hidden" />
                <div className="flex items-center gap-8">
                    <div className="relative flex items-center gap-5 text-white ">
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`px-3 py-1.5 rounded-full border-2 border-lime-600 text-sm w-20 focus:w-56 transition-all duration-300
                        ${
                            scrolled
                                ? "placeholder-neutral-700"
                                : "placeholder-white"
                        }
                        `}
                        />
                    </div>
                    <button
                        className="cursor-pointer flex lg:hidden"
                        onClick={() => setShowDrawer(!showDrawer)}
                    >
                        {/* Menu icon */}
                        <span
                            className={`absolute right-7 -translate-y-1/2 flex transition-all duration-500 ease-in-out transform  `}
                        >
                            <IoMenu className="text-3xl text-lime-900 active:scale-105" />
                        </span>
                    </button>
                </div>
            </div>
            <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
        </nav>
    );
};

export default Navbar;
