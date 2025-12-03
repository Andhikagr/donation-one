import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { motion, AnimatePresence } from "motion/react";
import { DataMenu } from "../../data/DataMenu"; // pastikan path benar
import { Link } from "@inertiajs/react";
import logo from "../../assets/logo.png";
import { FaRegWindowClose } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";

const Drawer = ({ showDrawer, setShowDrawer }) => {
    const [openSubMobile, setOpenSubMobile] = useState(false);

    const handleOpen = (label) => {
        setOpenSubMobile(openSubMobile === label ? false : label);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-white  
            transform transition-transform duration-500 ease-in-out 
            flex flex-col overflow-y-auto scrollbar-hide lg:hidden z-9999 text-theme
            ${showDrawer ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Logo */}
            <button
                className="absolute top-5 right-7 cursor-pointer  flex transition-all duration-500 ease-in-out transform
                "
                onClick={() => setShowDrawer(false)}
            >
                <IoIosCloseCircle className="text-3xl text-red-600 active:scale-105" />
            </button>
            <div className="w-full pt-6 flex justify-center items-center flex-col gap-5">
                <img src={logo} className="w-20" alt="" />
            </div>

            {/* Menu */}
            <ul className="flex flex-col mt-6 font-medium cursor-pointer text-theme">
                {DataMenu.map((item) => (
                    <li key={item.label}>
                        {/* MENU TANPA SUBMENU */}
                        {!item.submenu ? (
                            <Link
                                href={item.href}
                                className="block w-full px-6 py-4 hover:bg-stone-100"
                                onClick={() => setShowDrawer(false)}
                            >
                                <h6>{item.label}</h6>
                            </Link>
                        ) : (
                            <>
                                {/* MENU DENGAN SUBMENU */}
                                <div
                                    className="w-full hover:bg-stone-100 flex items-center justify-between px-6 py-4 relative"
                                    onClick={() => handleOpen(item.label)}
                                >
                                    <h6>{item.label}</h6>

                                    <span
                                        className={`transition-transform duration-300 ${
                                            openSubMobile === item.label
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    >
                                        <RiArrowDownSFill size={22} />
                                    </span>

                                    {/* Garis bawah */}
                                    <span className="absolute bottom-0 left-6 right-6 border-b-2 border-gray-200"></span>
                                </div>

                                {/* SUBMENU ANIMATED */}
                                <AnimatePresence>
                                    {openSubMobile === item.label && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeInOut",
                                            }}
                                            className="overflow-hidden bg-gray-50"
                                        >
                                            {item.submenu.map((child) => (
                                                <li
                                                    key={child.label}
                                                    className="relative"
                                                >
                                                    <a
                                                        href={child.href}
                                                        className="block py-3 pl-8 text-[14px] hover:text-red-700"
                                                        onClick={() =>
                                                            setShowDrawer(false)
                                                        }
                                                    >
                                                        {child.label}
                                                    </a>

                                                    {/* garis bawah */}
                                                    <span className="absolute bottom-0 left-6 right-6 border-b border-gray-200"></span>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drawer;
