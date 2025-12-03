import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@inertiajs/react";
import {
    getAllProvinces,
    getProvinceByCode,
    getProvinceByName,
    getAllRegencies,
    getRegenciesOfProvinceCode,
    getAllDistricts,
    getDistrictsOfCityCode,
    getAllVillages,
    getVillagesOfDistrictCode,
} from "indonesia-nodejs";
import Layout from "../../Layout/layout";
import Region from "../../components/Region";
import SlideNotification from "../../components/SlideNotification";

const Formulir = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        birth_place: "",
        birth_date: "",
        gender: "",
        religion: "",
        nik: "",
        phone: "",
        email: "",

        father_name: "",
        father_job: "",
        mother_name: "",
        mother_job: "",
        parent_phone: "",
        parent_email: "",

        province: "",
        province_name: "",
        city: "",
        city_name: "",
        district: "",
        district_name: "",
        village: "",
        village_name: "",

        rt: "",
        rw: "",
        street: "",
        postal_code: "",

        jenjang: "",
        jenis_siswa: "",

        acknowledge1: false,
        acknowledge2: false,
        acknowledge3: false,

        payment_file: null,
        kk_file: null,
        akte_file: null,
        ijazah_file: null,
    });
    const [error, setError] = useState({});
    const [notifications, setNotifications] = useState([]);

    // State wilayah
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    // Ambil semua provinsi saat component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const prov = await getAllProvinces();
                setProvinces(prov);
                console.log("Provinsi:", prov);
            } catch (err) {
                console.error("Gagal ambil provinsi:", err);
            }
        };

        fetchProvinces();
    }, []);

    // Ketika memilih provinsi → ambil kabupaten/kota di provinsi itu
    useEffect(() => {
        if (!data.province) {
            setCities([]);
            setDistricts([]);
            setVillages([]);
            return;
        }

        const fetchCities = async () => {
            try {
                const reg = await getRegenciesOfProvinceCode(data.province); // <-- pakai data.province
                setCities(reg);
                console.log("Kota/Kabupaten di provinsi:", reg);
            } catch (err) {
                console.error("Gagal ambil kota/kabupaten:", err);
                setCities([]);
            }
        };

        fetchCities();
    }, [data.province]);

    // Ketika memilih kota → ambil kecamatan
    useEffect(() => {
        if (!data.city) {
            setDistricts([]);
            setVillages([]);
            return;
        }

        const fetchDistricts = async () => {
            try {
                const dist = await getDistrictsOfCityCode(data.city);
                setDistricts(dist);
                console.log("Kecamatan di kota:", dist);
            } catch (err) {
                console.error("Gagal ambil kecamatan:", err);
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [data.city]);

    // Ketika memilih kecamatan → ambil kelurahan/desa
    useEffect(() => {
        if (!data.district) {
            setVillages([]);
            return;
        }

        const fetchVillages = async () => {
            try {
                const vills = await getVillagesOfDistrictCode(data.district);
                setVillages(vills);
                console.log("Desa/Kelurahan di kecamatan:", vills);
            } catch (err) {
                console.error("Gagal ambil desa/kelurahan:", err);
                setVillages([]);
            }
        };

        fetchVillages();
    }, [data.district]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            // convert province, city, district, village ke number
            const val = ["province", "city", "district", "village"].includes(
                name
            )
                ? Number(value)
                : value;
            setData((prev) => ({ ...prev, [name]: val }));
        }
    };

    const gender = ["Laki-laki", "Perempuan"];
    const jenis = ["Siswa Baru", "Siswa Pindahan"];
    const jenjang = ["Daycare", "PAUD-TK", "SD", "SMP", "SMA"];
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const submit = (e) => {
        console.log("Data sebelum submit:", data);
        e.preventDefault();
        const newErrors = {};

        Object.keys(data).forEach((key) => {
            if (
                data[key] === "" &&
                !["parent_email", "street", "postal_code"].includes(key)
            ) {
                newErrors[key] = "Field ini wajib diisi!";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        // Contoh submit
        // console.log("Data dikirim:", data);
        post("/formulir/store", {
            forceFormData: true,
            onSuccess: () => {
                reset(); // reset state form
                if (paymentFileRef.current) paymentFileRef.current.value = "";
                if (kkFileRef.current) kkFileRef.current.value = "";
                if (ijazahFileRef.current) ijazahFileRef.current.value = "";
                if (akteFileRef.current) akteFileRef.current.value = "";
                // alert("Formulir berhasil dikirim!"); // <-- pemberitahuan sukses
                // console.log("Formulir berhasil dikirim!");
            },
            onError: (err) => {
                console.error("Gagal kirim formulir:", err);
            },
        });

        // Tambahkan notification berhasil
        setNotifications((prev) => [
            { id: Math.random(), text: "Pendaftaran berhasil!" },
            ...prev,
        ]);
    };

    const paymentFileRef = useRef(null);
    const kkFileRef = useRef(null);
    const ijazahFileRef = useRef(null);
    const akteFileRef = useRef(null);

    return (
        <Layout>
            <section className="py-32 pb-50 px-[7%] md:px-[10%] w-full min-h-screen text-theme font-medium">
                <form onSubmit={submit} className="flex flex-col gap-5 w-full">
                    <div className="flex py-5 items-center justify-center w-full">
                        <h4 className=" text-neutral-800 font-bold">
                            Formulir Online Pengajuan Perihal Bantuan
                        </h4>
                    </div>
                    {/* Field teks */}
                    <div className="flex flex-col gap-5 w-full border-2 border-stone-100 p-4">
                        <h6 className="font-semibold">Data Diri</h6>
                        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 ">
                            <div className="flex flex-col">
                                <input
                                    name="full_name"
                                    value={data.full_name}
                                    onChange={handleChange}
                                    placeholder="Nama Lengkap"
                                    className={`border-2 border-stone-200  p-2 rounded placeholder-stone-300 `}
                                />
                                {!data.full_name && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="birth_place"
                                    value={data.birth_place}
                                    onChange={handleChange}
                                    placeholder="Tempat Lahir"
                                    className={`border-2 border-stone-200 p-2 rounded placeholder-stone-300 `}
                                />
                                {!data.birth_place && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={handleChange}
                                    className={`border-2 border-stone-200 p-2 rounded placeholder-stone-300 `}
                                />
                                {!data.birth_date && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <select
                                        required
                                        name="gender"
                                        value={data.gender || ""}
                                        onChange={handleChange}
                                        className={`border-2 border-stone-200 p-2 rounded placeholder-stone-300  `}
                                    >
                                        <option value="" disabled>
                                            Pilih Jenis Kelamin
                                        </option>
                                        {gender.map((g) => (
                                            <option key={g} value={g}>
                                                {g}
                                            </option>
                                        ))}
                                    </select>
                                    {!data.gender && (
                                        <p className="text-red-600 text-sm py-1">
                                            wajib dipilih
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="religion"
                                    value={data.religion}
                                    placeholder="Agama"
                                    onChange={handleChange}
                                    className={`border-2 p-2 border-stone-200  rounded text-stone-300 placeholder-stone-300 `}
                                />
                                {!data.religion && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="nik"
                                    value={data.nik}
                                    placeholder="Nomor Induk Keluarga"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.nik && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib dipilih
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="phone"
                                    value={data.phone}
                                    placeholder="Nomor Telepon"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.phone && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="email"
                                    value={data.email}
                                    placeholder="Alamat Email"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.email && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="father_name"
                                    value={data.father_name}
                                    placeholder="Nama Ayah"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.father_name && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="father_job"
                                    value={data.father_job}
                                    placeholder="Pekerjaan Ayah"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.father_job && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="mother_name"
                                    value={data.mother_name}
                                    onChange={handleChange}
                                    placeholder="Nama Ibu"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.mother_name && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="mother_job"
                                    value={data.mother_job}
                                    placeholder="Pekerjaan Ibu"
                                    onChange={handleChange}
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.mother_job && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="parent_phone"
                                    value={data.parent_phone}
                                    onChange={handleChange}
                                    placeholder="Nomor Telepon Orang Tua"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.parent_phone && (
                                    <p className="text-red-600 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    name="parent_email"
                                    value={data.parent_email}
                                    onChange={handleChange}
                                    placeholder="Alamat Email Orang Tua"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.parent_email && (
                                    <p className="text-green-600 text-sm py-1">
                                        opsional
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* alamat */}
                    <div className=" flex flex-col gap-5 mt-5 border-2 border-slate-100 p-4 ">
                        <h6 className="font-semibold">Alamat</h6>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* provinsi */}
                            <div>
                                <Region
                                    required
                                    options={provinces}
                                    value={data.province}
                                    onChange={(code) => {
                                        const selected = provinces.find(
                                            (p) => p.code === code
                                        );
                                        setData((prev) => ({
                                            ...prev,
                                            province: code,
                                            province_name: selected?.name || "",
                                            city: "",
                                            city_name: "",
                                            district: "",
                                            district_name: "",
                                            village: "",
                                            village_name: "",
                                        }));
                                        setCities([]);
                                        setDistricts([]);
                                        setVillages([]);
                                    }}
                                    placeholder="Pilih Provinsi"
                                />
                                {!data.province && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>

                            {/* kabupaten/kota */}
                            <div>
                                <Region
                                    required
                                    options={cities}
                                    value={data.city}
                                    onChange={(code) => {
                                        const selected = cities.find(
                                            (c) => c.code === code
                                        );
                                        setData((prev) => ({
                                            ...prev,
                                            city: code,
                                            city_name: selected?.name || "",
                                            district: "",
                                            district_name: "",
                                            village: "",
                                            village_name: "",
                                        }));
                                        setDistricts([]);
                                        setVillages([]);
                                    }}
                                    placeholder="Pilih Kabupaten/Kota"
                                />
                                {!data.city && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>

                            {/* kecamatan */}
                            <div>
                                <Region
                                    required
                                    options={districts}
                                    value={data.district}
                                    onChange={(code) => {
                                        const selected = districts.find(
                                            (d) => d.code === code
                                        );
                                        setData((prev) => ({
                                            ...prev,
                                            district: code,
                                            district_name: selected?.name || "",
                                            village: "",
                                            village_name: "",
                                        }));
                                        setVillages([]);
                                    }}
                                    placeholder="Pilih Kecamatan"
                                />
                                {!data.district && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>

                            {/* desa */}
                            <div>
                                <Region
                                    required
                                    options={villages}
                                    value={data.village}
                                    onChange={(code) => {
                                        const selected = villages.find(
                                            (v) => v.code === code
                                        );
                                        setData((prev) => ({
                                            ...prev,
                                            village: code,
                                            village_name: selected?.name || "",
                                        }));
                                    }}
                                    placeholder="Pilih Desa"
                                />
                                {!data.village && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="rt"
                                    value={data.rt}
                                    onChange={handleChange}
                                    placeholder="RT"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.rt && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    required
                                    name="rw"
                                    value={data.rw}
                                    onChange={handleChange}
                                    placeholder="RW"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                {!data.rw && (
                                    <p className="text-red-500 text-sm py-1">
                                        wajib diisi
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <input
                                    name="street"
                                    value={data.street}
                                    onChange={handleChange}
                                    placeholder="Jalan/Gang"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />

                                <p className="text-green-600 text-sm py-1">
                                    opsional
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <input
                                    name="postal_code"
                                    value={data.postal_code}
                                    onChange={handleChange}
                                    placeholder="Kode Pos"
                                    className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                                />
                                <p className="text-green-600 text-sm py-1">
                                    opsional
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upload file */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 border-2 border-slate-100 p-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">
                                Upload Bukti Pembayaran
                            </p>
                            <input
                                required
                                type="file"
                                name="payment_file"
                                ref={paymentFileRef}
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                            />
                            {/* {!data.payment_file && (
                                <p className="text-red-500 text-sm ">
                                    wajib upload
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">Upload Foto/Doc KK</p>
                            <input
                                required
                                type="file"
                                name="kk_file"
                                ref={kkFileRef} // <-- ini
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                            />
                            {/* {!data.kk_file && (
                                <p className="text-red-500 text-sm ">
                                    wajib upload
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">
                                Upload Foto/Doc Ijazah
                            </p>
                            <input
                                required
                                type="file"
                                name="ijazah_file"
                                ref={ijazahFileRef} // <-- ini
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                            />
                            {/* {!data.ijazah_file && (
                                <p className="text-red-500 text-sm ">
                                    wajib upload
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">
                                Upload Foto/Doc Akte Lahir
                            </p>
                            <input
                                required
                                type="file"
                                name="akte_file"
                                ref={akteFileRef} // <-- ini
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 placeholder-stone-300"
                            />
                            {/* {!data.akte_file && (
                                <p className="text-red-500 text-sm ">
                                    wajib upload
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">Silahkan Pilih</p>
                            <select
                                required
                                name="jenjang"
                                value={data.jenjang || ""}
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 text-stone-300 placeholder-stone-300"
                            >
                                <option value="" disabled>
                                    Pilih Jenjang Pendidikan
                                </option>
                                {jenjang.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                            {!data.jenjang && (
                                <p className="text-red-500 text-sm ">
                                    wajib dipilih
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px]">Silahkan Pilih</p>
                            <select
                                required
                                name="jenis_siswa"
                                value={data.jenis_siswa || ""}
                                onChange={handleChange}
                                className="border-2 p-2 rounded border-slate-200 text-stone-300 placeholder-stone-300"
                            >
                                <option value="" disabled>
                                    Status Siswa
                                </option>
                                {jenis.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                            {!data.jenis_siswa && (
                                <p className="text-red-500 text-sm ">
                                    wajib dipilih
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-5">
                        <label className="flex items-start gap-2">
                            <input
                                required
                                type="checkbox"
                                checked={data.acknowledge1 || false}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        acknowledge1: e.target.checked,
                                    }))
                                }
                                className="mt-1"
                            />
                            <span>
                                Saya menyatakan bahwa memberikan informasi yang
                                salah atau menyembunyikan informasi yang relevan
                                dapat membatalkan pendaftaran.
                            </span>
                            {!data.acknowledge1 && (
                                <p className="text-red-500 text-xl ">*</p>
                            )}
                        </label>

                        <label className="flex items-start gap-2">
                            <input
                                required
                                type="checkbox"
                                checked={data.acknowledge2 || false}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        acknowledge2: e.target.checked,
                                    }))
                                }
                                className="mt-1"
                            />
                            <span>
                                Saya menjamin bahwa semua informasi dalam
                                formulir ini dan yang diberikan untuk mendukung
                                pendaftaran anak saya adalah benar dan lengkap.
                            </span>
                            {!data.acknowledge2 && (
                                <p className="text-red-500 text-xl ">*</p>
                            )}
                        </label>

                        <label className="flex items-start gap-2">
                            <input
                                required
                                type="checkbox"
                                checked={data.acknowledge3 || false}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        acknowledge3: e.target.checked,
                                    }))
                                }
                                className="mt-1"
                            />
                            <span>
                                Saya telah membaca dan memahami syarat
                                pendaftaran dan penerimaan, serta menyetujuinya
                                sepenuhnya.
                            </span>
                            {!data.acknowledge3 && (
                                <p className="text-red-500 text-xl ">*</p>
                            )}
                        </label>
                    </div>
                    <div className="flex items-center justify-center ">
                        <button
                            type="submit"
                            className="bg-green-800 text-white p-2 rounded w-fit px-15 py-3 cursor-pointer"
                        >
                            <p className="font-semibold">Ajukan</p>
                        </button>
                    </div>
                </form>
                <SlideNotification
                    notifications={notifications}
                    setNotifications={setNotifications}
                />
            </section>
        </Layout>
    );
};

export default Formulir;
