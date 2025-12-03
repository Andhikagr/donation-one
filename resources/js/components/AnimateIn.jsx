import { motion } from "motion/react";

const variants = {
    up: {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    },
    down: {
        hidden: { opacity: 0, y: -20 },
        show: { opacity: 1, y: 0 },
    },
    left: {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
    },
    right: {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0 },
    },
};

export default function AnimateIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.9,
    className = "",
    scale = false,
    scaleFrom = "",
    viewport = { once: true, amount: 0.1 },
}) {
    const baseVariant = variants[direction];

    // tambahkan efek scale jika diaktifkan
    const finalVariant = scale
        ? {
              hidden: { ...baseVariant.hidden, scale: scaleFrom },
              show: { ...baseVariant.show, scale: 1 },
          }
        : baseVariant;

    return (
        <motion.div
            className={`${className} motion-smooth`}
            style={{ position: "relative" }} // penting agar tidak ubah layout
            variants={finalVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // cubic-bezier untuk transisi lembut
            }}
        >
            {children}
        </motion.div>
    );
}
