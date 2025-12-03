import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import indonesia from "../../data/indonesia.json";
import { motion, animate } from "motion/react";
import AnimateIn from "./AnimateIn";

const defaultStyle = {
    fillColor: "#2b5709",
    color: "#2b5709",
    weight: 1,
    fillOpacity: 1,
};

const highlightStyle = {
    fillColor: "#f7c44d",
    weight: 2,
    fillOpacity: 1,
};

const ResponsiveZoom = ({ zoom }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return; // cek instance map ada
        map.setZoom(zoom);
    }, [zoom, map]);

    return null;
};

const CustomMap = ({ provinces }) => {
    // console.log("DATA PROVINCES :", provinces);
    const [geoData, setGeoData] = useState(null);

    const dataTotal = provinces.reduce((sum, p) => sum + p.data, 0);
    const [count, setCount] = useState(0);
    const [counted, setCounted] = useState(false);

    // perbaiki data json
    useEffect(() => {
        const data = { ...indonesia };
        data.features.forEach((f) => {
            f.properties.NAME_1 = f.properties.NAME_1.replace(
                /([a-z])([A-Z])/g,
                "$1 $2"
            ).trim();
        });
        setGeoData(data);
    }, []);

    // atur zoom responsif
    const [zoom, setZoom] = useState(4.5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setZoom(3);
            else if (window.innerWidth < 992) setZoom(4);
            else if (window.innerWidth < 1024) setZoom(4.5);
            else setZoom(5);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // bind tooltip + style
    const onEachFeature = (feature, layer) => {
        const provName = feature.properties.NAME_1;
        // console.log("Nama Provinsi JSON:", provName);

        const data = provinces.find((p) => p.province === provName);
        const dataTotal = data ? data.data : 0;

        layer.on({
            mouseover: (e) => e.target.setStyle(highlightStyle),
            mouseout: (e) => e.target.setStyle(defaultStyle),
        });

        layer.bindTooltip(`${provName}: ${dataTotal} total penerima manfaat`, {
            sticky: true,
        });
    };

    return (
        <div className="flex flex-col items-center gap-y-2 relative cursor-default py-10 rounded-2xl">
            {/* Angka total alumni */}
            <div className="absolute bottom-0 right-10 md:right-25 flex flex-col items-center z-50">
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    onViewportEnter={() => {
                        if (!counted) {
                            animate(0, dataTotal, {
                                duration: 2,
                                onUpdate: (v) => setCount(Math.floor(v)),
                            });
                            setCounted(true);
                        }
                    }}
                    className=" text-amber-400"
                >
                    {count}
                </motion.h3>
                <span className="text-neutral-800 font-semibold">
                    Total Penerima Manfaat
                </span>
            </div>

            {/* MAP */}
            <AnimateIn className="w-full h-[300px] md:h-[450px] relative">
                <MapContainer
                    center={[-2.548926, 118.0148634]}
                    zoom={4.5} // gunakan default tetap
                    zoomControl={false}
                    scrollWheelZoom={false}
                    attributionControl={false}
                    dragging={false}
                    boxZoom={false}
                    touchZoom={false}
                    doubleClickZoom={false}
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent",
                    }}
                >
                    <ResponsiveZoom zoom={zoom} />

                    {geoData && (
                        <GeoJSON
                            data={geoData}
                            style={defaultStyle}
                            onEachFeature={onEachFeature}
                        />
                    )}
                </MapContainer>
            </AnimateIn>
        </div>
    );
};

export default CustomMap;
