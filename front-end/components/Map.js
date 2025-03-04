"use client";
import React, { useState, useEffect } from "react";

export default function Map() {
    const [isOpen, setIsOpen] = useState(false); // ควบคุมการเปิด/ปิด Accordion
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        // อัปเดตขนาดหน้าจอเมื่อโหลดหน้า
        setScreenWidth(window.innerWidth);

        // Event listener สำหรับตรวจจับการเปลี่ยนขนาดหน้าจอ
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {screenWidth > 1023 ? (
                <div className="w-full h-[320px] rounded-lg shadow-lg">
                    <div className="h-1/6 bg-[#BEDBFF] rounded-t-lg flex items-center px-4 font-bold text-[#162456] text-[30px]">
                        แผนที่วิทยาลัย
                    </div>

                    <div className="h-5/6 bg-white text-[#162456] text-xl rounded-b-lg">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1945.1563432283283!2d101.21586072187664!3d12.823059747837144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102e43749dc9fa3%3A0xac48aad048f7a72d!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LiZ4Li04LiE4Lia4LmJ4Liy4LiZ4LiE4LmI4Liy4Lii!5e0!3m2!1sth!2sth!4v1739348287272!5m2!1sth!2sth" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            ) : screenWidth <= 1023 ? (
                <div className="w-full  mx-auto mt-10">
                    {/* Header Accordion */}
                    <button
                        className="w-full bg-[#BEDBFF] text-[#162456] font-bold text-2xl py-3 px-4 rounded-t-lg flex justify-between items-center"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        แผนที่วิทยาลัย
                        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                        <div className="h-[320px] bg-white text-[#162456] text-xl rounded-b-lg shadow-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1945.1563432283283!2d101.21586072187664!3d12.823059747837144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102e43749dc9fa3%3A0xac48aad048f7a72d!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LiZ4Li04LiE4Lia4LmJ4Liy4LiZ4LiE4LmI4Liy4Lii!5e0!3m2!1sth!2sth!4v1739348287272!5m2!1sth!2sth"
                                className="w-full h-full"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    )}
                </div>

            ) : (
                <p>Data loaded!</p>
            )}

        </div>
    );
}
