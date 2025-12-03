import { usePage } from "@inertiajs/react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingButton = () => {
    const message = encodeURIComponent(
        "Assalamu'alaikum, saya ingin bertanya mengenai SIP"
    );

    return (
        <div>
            <div className="flex items-center gap-x-4 fixed bottom-8 right-6 z-1000 cursor-pointer ">
                <div className="flex flex-col bg-white py-2 px-4  rounded-xl shadow-theme">
                    <a
                        href={`https://wa.me/6281553023775?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-xs">Butuh Bantuan?</p>
                        <p>Hubungi Kami</p>
                    </a>
                </div>
                <div className="relative">
                    <span
                        className="absolute inset-0 rounded-full bg-green-400 opacity-50"
                        style={{
                            animation:
                                "customPing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }}
                    ></span>
                    <div className="relative text-[28px] bg-green-500 text-stone-100 rounded-full  w-fit h-fit p-3 hover:scale-110">
                        <a
                            href={`https://wa.me/6281553023775?text=${message}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer text-3xl"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingButton;
