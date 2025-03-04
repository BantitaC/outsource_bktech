"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [screenWidth, setScreenWidth] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // อัปเดตขนาดหน้าจอเมื่อโหลดหน้า
        setScreenWidth(window.innerWidth);

        // Event listener สำหรับตรวจจับการเปลี่ยนขนาดหน้าจอ
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            router.push(selectedValue);
        }
    };

    return (
        <div>
            {screenWidth > 900 ? (
                <div className="bg-[#BEDBFF] flex justify-between ps-8 py-2">
                    <div className="flex items-center ml-6">
                        <Link href="/">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRGNVxWsAQ7OBkqeOzjm_N7V4mP7BhYATk_Q&s" className="rounded-full w-20 h-20" />
                        </Link>
                        <Link href="/">
                            <p className="ms-8 text-[#162456] duration-300 hover:text-slate-500">หน้าแรก</p>
                        </Link>
                        <Link href="/Announcement">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">ประชาสัมพันธ์</p>
                        </Link>
                        <Link href="/Board">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">กระดานถามตอบ</p>
                        </Link>
                        <Link href="/MapSchool">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">แผนที่วิทยาลัย</p>
                        </Link>
                        <Link href="/Actvity">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">ภาพกิจกรรม</p>
                        </Link>
                        <Link href="/AllMember">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">สมาชิกแผนก</p>
                        </Link>
                    </div>
                    <div className="me-12 flex items-center">
                        <Link href="/AdminLogin">
                            <p className="text-[#162456] hover:text-slate-500">เจ้าหน้าที่</p>
                        </Link>
                    </div>
                </div>
            ) : screenWidth <= 900 ? (
                <div className="bg-[#BEDBFF] flex justify-between ps-8 py-1">
                    <div className="flex items-center ml-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRGNVxWsAQ7OBkqeOzjm_N7V4mP7BhYATk_Q&s" className="rounded-full w-20 h-20" />
                        {/* <Link href="/">
                            <p className="ms-8 text-[#162456] duration-300 hover:text-slate-500">หน้าแรก</p>
                        </Link> */}
                        {/* <Link href="/">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">ประชาสัมพันธ์</p>
                        </Link>
                        <Link href="/">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">กระดานถามตอบ</p>
                        </Link>
                        <Link href="/">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">แผนที่วิทยาลัย</p>
                        </Link>
                        <Link href="/">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">ภาพกิจกรรม</p>
                        </Link>
                        <Link href="/">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">สมาชิกแผนก</p>
                        </Link> */}

                    </div>
                    <select onChange={handleChange} defaultValue='' className="mt-5 mr-8 bg-gray-50 border w-26 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='' disabled>MENU</option>
                        <option value="/">หน้าแรก</option>
                        <option value="/Announcement">ประชาสัมพันธ์</option>
                        <option value="/Board">กระดานถามตอบ</option>
                        <option value="/MapSchool">ภาพกิจกรรม</option>
                        <option value="/Member">สมาชิกแผนก</option>
                    </select>



                </div>

            ) : (
                <p>Data loaded!</p>
            )}



        </div>
    );
}
