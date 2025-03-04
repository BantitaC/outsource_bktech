"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavbarAdmin() {
    const [screenWidth, setScreenWidth] = useState(0);
    const router = useRouter();
    const [logoutData, setLogoutData] = useState(null); // ตั้งชื่อ state ให้ไม่ชนกับฟังก์ชัน

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

    const logoutUser = async () => {
        const res = await fetch('http://localhost:5000/admin/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        setLogoutData(data); // ✅ บันทึกผลการล็อกเอาท์
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginAdmin");


        router.replace("/");
    };


    return (
        <div>
            {screenWidth > 900 ? (
                <div className="bg-[#BEDBFF] flex justify-between ps-8 py-2">
                    <div className="flex items-center ml-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRGNVxWsAQ7OBkqeOzjm_N7V4mP7BhYATk_Q&s" className="rounded-full w-20 h-20" />
                        <Link href="/ManageAnnounce">
                            <p className="ms-8 text-[#162456] duration-300 hover:text-slate-500">จัดการข่าวประชาสัมพันธ์</p>
                        </Link>
                        <Link href="/ManageActvity">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">จัดการภาพกิจกรรม</p>
                        </Link>
                        <Link href="/ManageBoard">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">จัดการกระดานถามตอบ</p>
                        </Link>
                        <Link href="/ManageMember">
                            <p className="ms-4 text-[#162456] hover:text-slate-500">จัดการสมาชิก</p>
                        </Link>
                    </div>
                    <div className="me-12 flex items-center">
                        <Link href="/AdminPage">
                            <p className="text-[#162456] hover:text-slate-500">หน้าหลักผู้ใช้</p>
                        </Link>
                        <Link href="/">
                            <p onClick={logoutUser} className="ms-4 text-[#162456] hover:text-slate-500">ออกจากระบบ</p>
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
                        <option value="/ManageAnnounce">จัดการข่าวประชาสัมพันธ์</option>
                        <option value="/ManageActvity">จัดการภาพกิจกรรม</option>
                        <option value="/ManageBoard">จัดการกระดานถามตอบ</option>
                        <option value="/ManageMember">จัดการสมาชิก</option>
                        <option value="/AdminPage">หน้าหลักผู้ใช้</option>
                        <option value="/">ออกจากระบบ</option>
                    </select>



                </div>

            ) : (
                <p>Data loaded!</p>
            )}



        </div>
    );
}
