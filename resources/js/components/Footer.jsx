import React from "react";
import logo from "../../assets/logo.png";
import { BiPhoneCall } from "react-icons/bi";

const Footer = () => {
    return (
        <div>
            <section className="py-10 px-[10%] relative z-10  bg-[#0d1c02] text-neutral-100">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center justify-center">
                        <h6>Investasi untuk selamanya</h6>
                        <p className="text-center max-w-[800px]">
                            Nabi shallallahu ‘alaihi wa sallam bersabda,
                            “Barangsiapa meringankan sebuah kesusahan seorang
                            mukmin di dunia, Allah akan meringankan kesusahannya
                            pada hari kiamat…. “
                        </p>
                        <p>(HR. Muslim)</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 items-center">
                        <div className="flex gap-10 items-center">
                            <img
                                src={logo}
                                alt=""
                                className="h-32 bg-neutral-100 p-1 rounded-full"
                            />
                            <div className="font-semibold flex flex-col gap-2">
                                <h5>Pusat Informasi SIP</h5>
                                <p>
                                    Rumah Bahagia SIP Komplek Cibubur Mansion
                                    Blok A2 no.15, kec. Cileungsi, kab. Bogor,
                                    16820
                                </p>
                                <div className="flex gap-1 items-center">
                                    <BiPhoneCall />
                                    <p>+62 811 1186 626</p>
                                </div>
                            </div>
                        </div>
                        <div className=" h-40">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9493956791016!2d106.9615091!3d-6.4005222999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69948a9e1bb89f%3A0x420d65a296b4cc06!2sYayasan%20Solidaritas%20Insan%20Peduli!5e0!3m2!1sen!2sid!4v1763881866527!5m2!1sen!2sid"
                                className="w-full h-full border-0 rounded-xl"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
