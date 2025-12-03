import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const textSlides = [
    {
        id: 1,
        content: (
            <h1 className="text-center font-bold font-[Stack_Sans_Text] ">
                Bahagia dengan Membahagiakan Orang Lain
            </h1>
        ),
    },
    {
        id: 2,
        content: (
            <h4 className="text-center italic font-bold mt-10 ">
                “Dan barang apa saja yang kamu nafkahkan, maka Allah akan
                menggantinya dan Dia-lah Pemberi rezki yang sebaik-baiknya.”
                (QS. Saba’: 39)
            </h4>
        ),
    },
];

export default function TextSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % textSlides.length);
        }, 5000); // 3 detik sekali ganti

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-3xl  mt-6 ">
            <AnimatePresence mode="wait">
                <motion.div
                    key={textSlides[index].id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.8 }}
                    className="text-amber-400 text-shadow-lg text-base leading-relaxed"
                >
                    {textSlides[index].content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
