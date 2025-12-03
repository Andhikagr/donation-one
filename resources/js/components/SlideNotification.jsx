import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckSquare, FiX } from "react-icons/fi";

const NOTIFICATION_TTL = 5000;

export const Notification = ({ text, id, removeNotif }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => removeNotif(id), NOTIFICATION_TTL);
        return () => clearTimeout(timeoutRef);
    }, []);

    return (
        <motion.div
            layout
            initial={{ y: -15, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="p-3 flex items-start rounded gap-2 text-xl font-medium shadow-lg text-white bg-blue-600 pointer-events-auto"
        >
            <span>{text}</span>
            <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
                <FiX />
            </button>
        </motion.div>
    );
};

const SlideInNotification = ({ notifications, setNotifications }) => {
    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="flex flex-col gap-1 w-96 fixed top-30 right-10 z-1000 pointer-events-none">
            <AnimatePresence>
                {notifications.map((n) => (
                    <Notification key={n.id} {...n} removeNotif={removeNotif} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default SlideInNotification;
