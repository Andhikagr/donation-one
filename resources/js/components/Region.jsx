import React, { useState } from "react";

const Region = ({ options, value, onChange, placeholder }) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((o) => o.code === value)?.name || "";

    return (
        <div className="relative">
            <button
                type="button"
                className={`w-full border-2 p-2 rounded border-slate-200 text-slate-400 text-left ${
                    selectedOption
                        ? "bg-slate-200 text-slate-800"
                        : "text-slate-600"
                } `}
                onClick={() => setOpen(!open)}
            >
                {selectedOption || placeholder}
            </button>

            {open && (
                <ul className="absolute w-full max-h-72 overflow-y-auto border rounded bg-white z-10">
                    {options.map((option) => (
                        <li
                            key={option.code}
                            className="p-2 cursor-pointer hover:bg-blue-100 "
                            onClick={() => {
                                onChange(option.code); // panggil callback onChange
                                setOpen(false);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Region;
