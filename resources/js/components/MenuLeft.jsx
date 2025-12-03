import React, { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiBarChart2,
    FiChevronDown,
    FiHome,
    FiPieChart,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { SiGofundme } from "react-icons/si";
import { DataMenuLeft } from "../../data/DataMenuLeft";
import { Link, usePage } from "@inertiajs/react";

export const MenuLeft = () => {
    const [selected, setSelected] = useState(null);
    const [dir, setDir] = useState(null);

    const handleSetSelected = (val) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <div
            onMouseLeave={() => handleSetSelected(null)}
            className="relative flex w-fit h-fit gap-2 "
        >
            {TABS.map((t, index) => (
                <Tab
                    key={t.id}
                    selected={selected}
                    handleSetSelected={handleSetSelected}
                    tab={t.id}
                    childrenComponent={<t.Component />}
                    hasSubmenu={t.hasSubmenu}
                >
                    {t.title}
                </Tab>
            ))}
        </div>
    );
};

const Tab = ({
    children,
    tab,
    handleSetSelected,
    selected,
    childrenComponent,
    hasSubmenu,
}) => {
    const isActive = selected === tab;
    const [scrolled, setScrolled] = useState(false);

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
        <div
            className="relative"
            onMouseEnter={() => handleSetSelected(tab)}
            onMouseLeave={() => handleSetSelected(null)}
        >
            {/* Tombol menu utama */}

            <button
                id={`shift-tab-${tab}`}
                className={`hidden xl:flex items-center gap-1 rounded-full w-fit h-fit px-3 py-1.5 text-sm transition-colors cursor-pointer relative ${
                    isActive ? "bg-lime-500 text-neutral-100 " : "  "
                }
                ${!isActive && (scrolled ? "text-theme" : "text-neutral-100")}
                
                `}
            >
                <Link
                    href={DataMenuLeft.find((m) => m.label === children)?.href}
                >
                    <p>{children}</p>
                </Link>
                {hasSubmenu && (
                    <FiChevronDown
                        className={`transition-transform ${
                            isActive ? "rotate-180" : ""
                        }`}
                    />
                )}
            </button>
            <div className="absolute top-8 left-0 w-full h-6 bg-transparent"></div>
            {/* Dropdown submenu */}
            <AnimatePresence>
                {hasSubmenu && isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-1/2 -translate-x-1/2 top-12
                                   bg-white shadow-theme rounded-2xl px-6 py-4 w-max z-50"
                    >
                        {childrenComponent}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const generateMenuComponent = (menu) => {
    return () => (
        <div className="w-fit h-fit">
            <div className="grid grid-cols-2 gap-4">
                {menu.submenu?.length > 0 &&
                    menu.submenu.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="block text-sm text-theme hover:text-lime-500"
                        >
                            {item.label}
                        </a>
                    ))}
            </div>
        </div>
    );
};

export const TABS = DataMenuLeft.map((menu, idx) => ({
    id: idx + 1,
    title: menu.label,
    hasSubmenu: menu.submenu && menu.submenu.length > 0,
    Component: generateMenuComponent(menu),
}));
